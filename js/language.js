import * as cookies from './cookies.js'

const flags = []
const fallbackLanguage = 'en'
const languageCookie = 'lang'

L.Control.Language = L.Control.extend({
  options: {
    id: 'id',
    language: 'en',
    position: 'topleft',
    selected: false,
    iconUrl: '/images/flag-icons/united-kingdom.webp',
    selectionCallback: function () { console.log('Click callback triggererd on a flag!') }
  },

  initialize: function (options) {
    L.setOptions(this, options);
  },

  onAdd: function (map) {
    const container = this.container = L.DomUtil.create('div', 'leaflet-control-language');
    const icon = this.icon = L.DomUtil.create('img', 'leaflet-control-language-icon', container)
    container.id = this.options.id
    icon.src = this.options.iconUrl

    this._setup()

    flags.push(this)
    return container;
  },

  _setup: function () {
    this.container.addEventListener('click', () => {
      this._clickHandler()
    })
    this._update()
  },

  _update: function () {
    if (this.options.selected) {
      this.icon.classList.add('selected')
    } else {
      this.icon.classList.remove('selected')
    }
  },

  _clickHandler: function () {
    flags.forEach(flag => {
      if (flag == this) {
        if (!flag.options.selected) {
          this.options.selectionCallback(this.options.language)
        }
        flag.options.selected = true
      } else {
        flag.options.selected = false
      }
      flag._update()
    })
  }
})

export function getControl(options) {
  return new L.Control.Language(options)
}

export function getFallbackLanguage() {
  return fallbackLanguage
}

export function setLanguage(language) {
  cookies.setCookie(languageCookie, language)
}

export function getSelected() {
  const lang = cookies.getCookie(languageCookie)
  if (lang == '') {
    return fallbackLanguage
  } else {
    return lang
  }
}
