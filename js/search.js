import Fuse from 'https://cdn.jsdelivr.net/npm/fuse.js@6.6.2/dist/fuse.esm.js'

const searchResults = L.DomUtil.get('search-results')
const escHint = L.DomUtil.get('reset-hint')
hideResults()
hideHint()

export function type(typesList, searchPattern) {
  const fuseOptions = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    threshold: 0.3,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    keys: [
      "typeName",
    ]
  }
  const fuse = new Fuse(typesList, fuseOptions);
  return fuse.search(searchPattern)
}

export function showResults() {
  searchResults.style.display = 'block'
}

export function hideResults() {
  searchResults.style.display = 'none'
}

export function showHint() {
  escHint.style.display = 'block'
}

export function hideHint() {
  escHint.style.display = 'none'
}

export function getResultElement(type, clickCallback) {
  const el = document.createElement('a')
  el.href = '#'
  el.addEventListener("click", function () {
    clickCallback(type['item']['categoryName'], type['item']['groupName'], type['item']['typeName'])
  })
  const classes = ['list-group-item', 'list-group-item-action', 'search-result', 'container']
  classes.forEach((theClass) => {
    el.classList.add(theClass)
  })
  // console.log(type)
  let iconUrl = type['item']['iconUrl']
  switch (type['item']['typeMarkerType']) {
    case 'line':
      iconUrl = 'images/line-icon.png'
      break
    case 'area':
      iconUrl = 'images/area-icon.png'
      break
    default:
      iconUrl = type['item']['iconUrl']
  }
  el.innerHTML = `
    <div class="row">
      <div class="col text-center">
        <img src="${iconUrl}" class="search-img">
      </div>
      <div class="col-8">
        <div class="result-text">${type['item']['typeName']}</div>
      </div>
    </div>
  `
  return el
}
