import * as spreadsheet from './spreadsheet.js'
import * as language from './language.js'
import * as markdown from './markdown.js'

const fallbackLanguage = language.getFallbackLanguage()

async function downloadMarkers() {
  const sheetName = 'markers';
  const query = 'Select B,C,D,E,F,G,H,I,J,K,L,M';
  return spreadsheet.fetchTable(sheetName, query)
}

async function downloadCoordinates() {
  const sheetName = 'coordinates';
  const query = 'Select A,D,E,F,G';
  return spreadsheet.fetchTable(sheetName, query)
}

const getMeta = (url) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = url;
  });

function arraysFromString(text) {
  const arrays = []
  let txt = text.replace(/\s/g, '')  // Remove white characters
  const prefix = txt.substring(0, 2)
  txt = txt.slice(1, -1)  // Remove outer brackets

  if (prefix == '[[') {
    txt = txt.slice(1, -1)
    // when it's array of arrays
    const subStrings = txt.split('],[')
    subStrings.forEach((arrText) => {
      arrays.push([
        parseInt(arrText.split(',')[0]),
        parseInt(arrText.split(',')[1])
      ])
    })
  } else {
    // when it's flat array
    return [
      parseInt(txt.split(',')[0]),
      parseInt(txt.split(',')[1])
    ]
  }
  return arrays
}

export async function getTree(defaultCategoryName, language) {
  let sheetMarkers = []
  let sheetCoordinates = []
  const sheetMarkersPromise = downloadMarkers().then(
    (value) => { sheetMarkers = value }
  )
  const sheetCoordinatesPromise = downloadCoordinates().then(
    (value) => { sheetCoordinates = value }
  )
  await Promise.allSettled([sheetMarkersPromise, sheetCoordinatesPromise])
  // console.log(sheetMarkers)
  // console.log(sheetCoordinates)


  // Prepare all marker types
  const markerTypes = {}
  sheetMarkers.forEach((sheetMarker) => {
    markerTypes[sheetMarker['uniqueidentifier']] = {
      'type': sheetMarker['type'],
      'color': sheetMarker['color'],
      'imageUrl': sheetMarker['imageurl']
    }
    
    let translatedCategoryName = sheetMarker[`categoryname(${language})`]
    let translatedGroupName = sheetMarker[`groupname(${language})`]
    let translatedName = sheetMarker[`name(${language})`]
    let translatedDetails = sheetMarker[`details(${language})`]
    if (translatedCategoryName == '') {
      translatedCategoryName = sheetMarker[`categoryname(${fallbackLanguage})`]
    }
    if (translatedGroupName == '') {
      translatedGroupName = sheetMarker[`groupname(${fallbackLanguage})`]
    }
    if (translatedName == '') {
      translatedName = sheetMarker[`name(${fallbackLanguage})`]
    }
    if (translatedDetails == '') {
      translatedDetails = sheetMarker[`details(${fallbackLanguage})`]
    }

    markerTypes[sheetMarker['uniqueidentifier']]['categoryName'] = translatedCategoryName
    markerTypes[sheetMarker['uniqueidentifier']]['groupName'] = translatedGroupName
    markerTypes[sheetMarker['uniqueidentifier']]['name'] = translatedName
    markerTypes[sheetMarker['uniqueidentifier']]['details'] = translatedDetails
  })
  // console.log(markerTypes)

  // Check size of all of the images in parallel
  const imageRequests = []
  Object.keys(markerTypes).forEach((key) => {
    if (markerTypes[key]['imageUrl'] != null) {
      imageRequests.push(
        getMeta(markerTypes[key]['imageUrl'])
          .then((img) => markerTypes[key]['imageSize'] = [img.naturalWidth, img.naturalHeight])
      )
    }
  })
  await Promise.allSettled(imageRequests)
  // .then(console.log(markerTypes))

  // Prepare all markers (coordinates) details
  const markers = {}
  sheetCoordinates.forEach((sheetCoordinates) => {
    const markerType = markerTypes[sheetCoordinates['markeridentifier']]
    const markerTypeName = markerType['name']
    let categoryName = defaultCategoryName
    if (markerType['categoryName'] != '') {
      categoryName = markerType['categoryName']
    }
    const groupName = markerType['groupName']

    if (!(categoryName in markers)) { markers[categoryName] = {} }
    if (!(groupName in markers[categoryName])) {
      markers[categoryName][groupName] = {}
    }
    if (!(markerTypeName in markers[categoryName][groupName])) {
      markers[categoryName][groupName][markerTypeName] = {
        'markerType': markerType['type'],
        'details': markerType['details'],
        'iconUrl': markerType['imageUrl'],
        'iconSize': markerType['imageSize'],
        'color': markerType['color'],
        'markers': [],
      }
    }

    let details = sheetCoordinates[`details(${language})`]
    if (details == '') {
      details = sheetCoordinates[`details(${fallbackLanguage})`]
    }
    markers[categoryName][groupName][markerTypeName]['markers'].push({
      'id': sheetCoordinates['id'],
      'coordinates': arraysFromString(sheetCoordinates['coordinates']),
      'details': details
    })
  })
  // console.log(markers)

  // Map marker details to Leaflet markers
  const leafletMarkers = {}
  Object.keys(markers).forEach((category) => {
    leafletMarkers[category] = {}
    Object.keys(markers[category]).forEach((group) => {
      leafletMarkers[category][group] = {}
      Object.keys(markers[category][group]).forEach((type) => {
        leafletMarkers[category][group][type] = {
          'markerType': markers[category][group][type]['markerType'],
          'iconUrl': markers[category][group][type]['iconUrl'],
          'iconSize': markers[category][group][type]['iconSize'],
          'color': markers[category][group][type]['color'],
          'markers': [],
        }
        markers[category][group][type]['markers'].forEach((marker) => {
          const theType = markers[category][group][type]
          switch (theType['markerType']) {
            case 'point':
              leafletMarkers[category][group][type]['markers'].push(L.marker(
                marker['coordinates'],
                {
                  icon: L.icon({
                    iconUrl: theType['iconUrl'],
                    iconSize: theType['iconSize'],
                    tooltipAnchor: [theType['iconSize'][0] / 2, 0]
                  })
                }
              ).bindTooltip(`${marker['id']}. ${type}`))
              break
            case 'line':
              leafletMarkers[category][group][type]['markers'].push(L.polyline(
                marker['coordinates'],
                { color: theType['color'] }
              ).bindTooltip(`${marker['id']}. ${type}`))
              break
            case 'area':
              leafletMarkers[category][group][type]['markers'].push(L.polygon(
                [].concat(marker['coordinates'], marker['coordinates'].slice(-1)),
                { color: theType['color'], weight: 4, fillOpacity: 0.4 }
              ).bindTooltip(`${marker['id']}. ${type}`))
              break
            default:
              console.error(`[${marker['id']}. ${type}]: Marker type "${theType['type']}" is not supported!`)
          }
          const lastMarkerId = leafletMarkers[category][group][type]['markers'].length -1
          const lastLeafletMarker = leafletMarkers[category][group][type]['markers'][lastMarkerId]

          // Add popup details
          let details = `
          <div>
            <div class="coordinates">
              [${String(marker['coordinates']).replaceAll(',', ', ')}]
            </div>
            <div class="name">
              ${marker['id']}. ${type}
            </div>
          </div>
          `
          // Add marker type details
          if (markers[category][group][type]['details'] != '') {
            details = `${details}
            <hr>
            ${markers[category][group][type]['details']}`
          }
          // Add specific marker details
          if (marker['details'] != '') {
            details = `${details}
            <hr>
            ${marker['details']}`
          }
          // Create popup
          let popupOffset = [0, 0]
          if (markers[category][group][type]['markerType'] == 'point') {
            popupOffset = [0, markers[category][group][type]['iconSize'][1] / -4]
          }
          lastLeafletMarker.bindPopup(
            markdown.parse(details),
            {
              offset: popupOffset,
              closeButton: false,
              autoPanPadding: L.point(70, 70),
              maxHeight: window.innerHeight * 0.7,
            }
          )
        })
      })
    })
  })
  // console.log(leafletMarkers)
  return leafletMarkers
}

export function getTypes(markersTree) {
  const types = []
  Object.keys(markersTree).forEach((category) => {
    Object.keys(markersTree[category]).forEach((group) => {
      Object.keys(markersTree[category][group]).forEach((type) => {
        types.push({
          'typeName': type,
          'groupName': group,
          'categoryName': category,
          'typeMarkerType': markersTree[category][group][type]['markerType'],
          'iconUrl': markersTree[category][group][type]['iconUrl'],
        })
      })
    })
  })
  return types
}

export function remove(markersTree, categoryName = '', groupName = '', typeName = '') {
  const categories = []
  if (categoryName != '') {
    categories.push(markersTree[categoryName])
  } else {
    Object.keys(markersTree).forEach((category) => {
      categories.push(markersTree[category])
    })
  }
  categories.forEach((category) => {
    const groups = []
    if (groupName != '') {
      groups.push(category[groupName])
    } else {
      Object.keys(category).forEach((group) => {
        groups.push(category[group])
      })
    }
    groups.forEach((group) => {
      const types = []
      if (typeName != '') {
        types.push(group[typeName])
      } else {
        Object.keys(group).forEach((type) => {
          types.push(group[type])
        })
      }
      types.forEach((type) => {
        type['markers'].forEach((marker) => {
          marker.remove()
        })
      })
    })
  })
}

export function addTo(
  markersTree, map, categoryName = '', groupName = '', typeName = '', putToLayers = false,
) {
  if (putToLayers) {
    const defaultGroup = 'Towers'
    const overlay = {}

    Object.keys(markersTree).forEach((category) => {
      Object.keys(markersTree[category]).forEach((group) => {
        overlay[group] = []
        Object.keys(markersTree[category][group]).forEach((type) => {
          overlay[group] = overlay[group].concat(markersTree[category][group][type]['markers'])
        })
      })
    })
    Object.keys(overlay).forEach((leafletGroup) => {
      overlay[leafletGroup] = L.layerGroup(overlay[leafletGroup])
      if (leafletGroup == defaultGroup) {
        overlay[leafletGroup].addTo(map)
      }
    })

    const layerControl = L.control.layers({}, {}).addTo(map);
    Object.keys(overlay).forEach((layerName) => {
      layerControl.addOverlay(overlay[layerName], layerName).addTo(map);
    })
    return layerControl
  } else {
    const markers = []
    const categories = []
    if (categoryName != '') {
      categories.push(markersTree[categoryName])
    } else {
      Object.keys(markersTree).forEach((category) => {
        categories.push(markersTree[category])
      })
    }
    categories.forEach((category) => {
      const groups = []
      if (groupName != '') {
        groups.push(category[groupName])
      } else {
        Object.keys(category).forEach((group) => {
          groups.push(category[group])
        })
      }
      groups.forEach((group) => {
        const types = []
        if (typeName != '') {
          types.push(group[typeName])
        } else {
          Object.keys(group).forEach((type) => {
            types.push(group[type])
          })
        }
        types.forEach((type) => {
          type['markers'].forEach((marker) => {
            marker.addTo(map)
            markers.push(marker)
          })
        })
      })
    })
    let featureGroup = L.featureGroup(markers)
    map.flyToBounds(featureGroup.getBounds(), { 'padding': [100, 100] })
  }
}
