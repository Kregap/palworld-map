import * as markers from './js/markers.js'
import * as languageModule from './js/language.js'
import * as search from './js/search.js'
import * as coordinates from './js/coordinates.js'
import * as community from './js/community.js'
import * as credits from './js/credits.js'

/* mousetrap v1.6.5 craig.is/killing/mice */
(function(q,u,c){function v(a,b,g){a.addEventListener?a.addEventListener(b,g,!1):a.attachEvent("on"+b,g)}function z(a){if("keypress"==a.type){var b=String.fromCharCode(a.which);a.shiftKey||(b=b.toLowerCase());return b}return n[a.which]?n[a.which]:r[a.which]?r[a.which]:String.fromCharCode(a.which).toLowerCase()}function F(a){var b=[];a.shiftKey&&b.push("shift");a.altKey&&b.push("alt");a.ctrlKey&&b.push("ctrl");a.metaKey&&b.push("meta");return b}function w(a){return"shift"==a||"ctrl"==a||"alt"==a||
"meta"==a}function A(a,b){var g,d=[];var e=a;"+"===e?e=["+"]:(e=e.replace(/\+{2}/g,"+plus"),e=e.split("+"));for(g=0;g<e.length;++g){var m=e[g];B[m]&&(m=B[m]);b&&"keypress"!=b&&C[m]&&(m=C[m],d.push("shift"));w(m)&&d.push(m)}e=m;g=b;if(!g){if(!p){p={};for(var c in n)95<c&&112>c||n.hasOwnProperty(c)&&(p[n[c]]=c)}g=p[e]?"keydown":"keypress"}"keypress"==g&&d.length&&(g="keydown");return{key:m,modifiers:d,action:g}}function D(a,b){return null===a||a===u?!1:a===b?!0:D(a.parentNode,b)}function d(a){function b(a){a=
a||{};var b=!1,l;for(l in p)a[l]?b=!0:p[l]=0;b||(x=!1)}function g(a,b,t,f,g,d){var l,E=[],h=t.type;if(!k._callbacks[a])return[];"keyup"==h&&w(a)&&(b=[a]);for(l=0;l<k._callbacks[a].length;++l){var c=k._callbacks[a][l];if((f||!c.seq||p[c.seq]==c.level)&&h==c.action){var e;(e="keypress"==h&&!t.metaKey&&!t.ctrlKey)||(e=c.modifiers,e=b.sort().join(",")===e.sort().join(","));e&&(e=f&&c.seq==f&&c.level==d,(!f&&c.combo==g||e)&&k._callbacks[a].splice(l,1),E.push(c))}}return E}function c(a,b,c,f){k.stopCallback(b,
b.target||b.srcElement,c,f)||!1!==a(b,c)||(b.preventDefault?b.preventDefault():b.returnValue=!1,b.stopPropagation?b.stopPropagation():b.cancelBubble=!0)}function e(a){"number"!==typeof a.which&&(a.which=a.keyCode);var b=z(a);b&&("keyup"==a.type&&y===b?y=!1:k.handleKey(b,F(a),a))}function m(a,g,t,f){function h(c){return function(){x=c;++p[a];clearTimeout(q);q=setTimeout(b,1E3)}}function l(g){c(t,g,a);"keyup"!==f&&(y=z(g));setTimeout(b,10)}for(var d=p[a]=0;d<g.length;++d){var e=d+1===g.length?l:h(f||
A(g[d+1]).action);n(g[d],e,f,a,d)}}function n(a,b,c,f,d){k._directMap[a+":"+c]=b;a=a.replace(/\s+/g," ");var e=a.split(" ");1<e.length?m(a,e,b,c):(c=A(a,c),k._callbacks[c.key]=k._callbacks[c.key]||[],g(c.key,c.modifiers,{type:c.action},f,a,d),k._callbacks[c.key][f?"unshift":"push"]({callback:b,modifiers:c.modifiers,action:c.action,seq:f,level:d,combo:a}))}var k=this;a=a||u;if(!(k instanceof d))return new d(a);k.target=a;k._callbacks={};k._directMap={};var p={},q,y=!1,r=!1,x=!1;k._handleKey=function(a,
d,e){var f=g(a,d,e),h;d={};var k=0,l=!1;for(h=0;h<f.length;++h)f[h].seq&&(k=Math.max(k,f[h].level));for(h=0;h<f.length;++h)f[h].seq?f[h].level==k&&(l=!0,d[f[h].seq]=1,c(f[h].callback,e,f[h].combo,f[h].seq)):l||c(f[h].callback,e,f[h].combo);f="keypress"==e.type&&r;e.type!=x||w(a)||f||b(d);r=l&&"keydown"==e.type};k._bindMultiple=function(a,b,c){for(var d=0;d<a.length;++d)n(a[d],b,c)};v(a,"keypress",e);v(a,"keydown",e);v(a,"keyup",e)}if(q){var n={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",
18:"alt",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"ins",46:"del",91:"meta",93:"meta",224:"meta"},r={106:"*",107:"+",109:"-",110:".",111:"/",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},C={"~":"`","!":"1","@":"2","#":"3",$:"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",_:"-","+":"=",":":";",'"':"'","<":",",">":".","?":"/","|":"\\"},B={option:"alt",command:"meta","return":"enter",
escape:"esc",plus:"+",mod:/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"meta":"ctrl"},p;for(c=1;20>c;++c)n[111+c]="f"+c;for(c=0;9>=c;++c)n[c+96]=c.toString();d.prototype.bind=function(a,b,c){a=a instanceof Array?a:[a];this._bindMultiple.call(this,a,b,c);return this};d.prototype.unbind=function(a,b){return this.bind.call(this,a,function(){},b)};d.prototype.trigger=function(a,b){if(this._directMap[a+":"+b])this._directMap[a+":"+b]({},a);return this};d.prototype.reset=function(){this._callbacks={};
this._directMap={};return this};d.prototype.stopCallback=function(a,b){if(-1<(" "+b.className+" ").indexOf(" mousetrap ")||D(b,this.target))return!1;if("composedPath"in a&&"function"===typeof a.composedPath){var c=a.composedPath()[0];c!==a.target&&(b=c)}return"INPUT"==b.tagName||"SELECT"==b.tagName||"TEXTAREA"==b.tagName||b.isContentEditable};d.prototype.handleKey=function(){return this._handleKey.apply(this,arguments)};d.addKeycodes=function(a){for(var b in a)a.hasOwnProperty(b)&&(n[b]=a[b]);p=null};
d.init=function(){var a=d(u),b;for(b in a)"_"!==b.charAt(0)&&(d[b]=function(b){return function(){return a[b].apply(a,arguments)}}(b))};d.init();q.Mousetrap=d;"undefined"!==typeof module&&module.exports&&(module.exports=d);"function"===typeof define&&define.amd&&define(function(){return d})}})("undefined"!==typeof window?window:null,"undefined"!==typeof window?document:null);

let selectedLanguage = languageModule.getSelected()
languageModule.setLanguage(selectedLanguage)

L.Projection.Craftopia = L.extend({}, L.Projection.LonLat, {
  project: function(latlng) {
    return new L.Point(latlng.lat, latlng.lng);
	},
  
	unproject: function(point) {
    return new L.LatLng(point.x, point.y);
	},
})

L.CRS.Craftopia = L.extend({}, L.CRS.Simple, {
  projection: L.Projection.Craftopia,
  transformation: new L.Transformation(1, 0, -1, 0),
  
  // Scale, zoom and distance are entirely unchanged from CRS.Simple
  scale: function(zoom) {
    return Math.pow(2, zoom);
  },
  
  zoom: function(scale) {
    return Math.log(scale) / Math.LN2;
  },
  
  distance: function(latlng1, latlng2) {
    var dx = latlng2.lng - latlng1.lng,
    dy = latlng2.lat - latlng1.lat;
    
    return Math.sqrt(dx * dx + dy * dy);
  },
  infinite: true
});


const map = L.map('map', {
  crs: L.CRS.Craftopia,
  zoomSnap: 0.25,
  zoomDelta: 0.25,
  minZoom: -2,
  maxZoom: -0.4,
  attributionControl: false
});

const mapImageSize = [4096, 3584]
const mapPxOrigin = [1794, 2304]  // game world [0, 0] point (map origin) in map image pixel coordinates
const scale = 2.0045  // map pixel bounds to map unit scale

const mapOrigin = [
  mapPxOrigin[0],
  mapImageSize[1] - mapPxOrigin[1]
]  // origin switched to longitude, latitude which is coordinates system used by Leaflet
const bounds = [
  [scale * -mapOrigin[0], scale * -mapOrigin[1]],
  [scale * (mapImageSize[0] - mapOrigin[0]), scale * (mapImageSize[1] - mapOrigin[1])]
]
L.imageOverlay('images/maps/Map - Blank.webp', bounds).addTo(map);
map.fitBounds(bounds);

const maxBoundsOffset = 0.3
const maxBounds = L.latLngBounds(bounds).pad(maxBoundsOffset)
map.setMaxBounds([maxBounds])

const attributionControl =  L.control.attribution()
attributionControl.addAttribution('<a href="https://github.com/Kregap/craftopia-map">Code</a>')
attributionControl.addAttribution('<a href="https://docs.google.com/spreadsheets/d/1m_MW0M2kCiKJtVJ6anJQOqbHOILGh10Q6TtNCQK_KCw">Markers</a>')
attributionControl.addTo(map)

let defaultCategoryName = 'Default'
let markersTree
let types
let markersInLayers
let layerControl

async function reloadMarkers() {
  // Clear old
  if (!(markersTree === undefined)) {
    resetMap()
    markers.remove(markersInLayers)
    map.removeControl(layerControl)
  }

  // Load new
  markersTree = await markers.getTree(defaultCategoryName, selectedLanguage)
  types = markers.getTypes(markersTree)
  markersInLayers = _.cloneDeep(markersTree)
  layerControl = markers.addTo(markersInLayers, map, '', '', '', true)
}

reloadMarkers()

// Search
function resetMap() {
  searchInput.value = ''
  search.hideHint()
  search.hideResults()
  markers.remove(markersTree)
}

Mousetrap.bind('esc', resetMap)
const escHint = L.DomUtil.get('reset-hint')
escHint.addEventListener('click', resetMap)

Mousetrap.bind('/', function (ev) {
  searchInput.focus()
})

function filterMarkers(category, group, type) {
  searchInput.value = type
  search.showHint()
  markers.remove(markersTree)
  markers.addTo(markersTree, map, category, group, type)
  search.hideResults()
}

const searchInput = L.DomUtil.get('marker-search-input')
searchInput.addEventListener('focus', function () {
  resetMap()
})
searchInput.addEventListener('input', function () {
  if (searchInput.value == '/') {
    searchInput.value = ''
  }
  const searchText = searchInput.value
  if (searchText.length >= 3) {
    const results = search.type(types, searchText)
    const searchResultsList = L.DomUtil.get('search-results-list')
    searchResultsList.innerHTML = ''
    results.forEach((result) => {
      searchResultsList.appendChild(search.getResultElement(result, filterMarkers))
    })
    search.showResults()
  } else {
    search.hideResults()
    markers.remove(markersTree)
  }
})

// Additional controls
// Localisation / translation / flags
function translate(selectedLang) {
  selectedLanguage = selectedLang
  languageModule.setLanguage(selectedLang)
  reloadMarkers()
}
const languages = ['en', 'jp']
const flags = []
languages.forEach(lang => {
  flags.push(
    languageModule.getControl({
      id: `${lang}-flag`,
      language: lang,
      iconUrl: `images/flag-icons/${lang}.webp`,
      selected: (lang == selectedLanguage) ? true : false,
      selectionCallback: translate,
    }),
  )
})

flags.forEach(flag => {
  flag.addTo(map)
})


// Coordinates
const coordinatesLabel = coordinates.getControl()
coordinatesLabel.addTo(map)
let mouseCoordinates = L.point(0, 0)

function onMapClick(e) {
  const coordinates = `[${mouseCoordinates.x}, ${mouseCoordinates.y}]`
  navigator.clipboard.writeText(coordinates);
  console.log(`copied coordinates: ${coordinates} to clipboard`)
  const coordinatesText = L.DomUtil.get('coordinates')
  coordinatesText.classList.remove('flash')
  requestAnimationFrame((time) => {
    requestAnimationFrame((time) => {
      coordinatesText.classList.add('flash')
    })
  })
}

const copySwitch = L.DomUtil.get('copySwitch')
copySwitch.addEventListener('click', function (ev) {
  if (copySwitch.checked) {
    map.on('click', onMapClick)
  } else {
    map.off('click', onMapClick)
  }
})

map.on('mousemove', (ev) => {
  mouseCoordinates = L.point(ev.latlng.lat.toFixed(1), ev.latlng.lng.toFixed(1))
  coordinatesLabel.updateCoordinates(mouseCoordinates)
})

// Other controls
const communityButton = community.getControl()
const creditsButton = credits.getControl()
communityButton.addTo(map)
creditsButton.addTo(map)
