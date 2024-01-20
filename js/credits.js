import * as spreadsheet from './spreadsheet.js'

async function downloadCredits() {
  const sheetName = 'credits';
  const query = 'Select B,C';
  return spreadsheet.fetchTable(sheetName, query)
}

const credits = await downloadCredits()

L.Control.Credits = L.Control.extend({
  options: {
    position: 'bottomleft',
    iconUrl: 'images/icon-credits.png',
    header: 'Credits',
  },

  onAdd: function (map) {
    const container = L.DomUtil.create('div', 'leaflet-control-credits')

    const button = L.DomUtil.create('button', 'leaflet-control-credits-button', container)
    const icon = L.DomUtil.create('img', 'leaflet-control-credits-icon', button)
    icon.src = this.options.iconUrl

    const modal = L.DomUtil.create('div', 'leaflet-modal leaflet-control-credits-modal', container)
    modal.style.display = 'none'
    let innerHTML = `<h3 class="credits-header">${this.options.header}</h3><hr class="credits-hr" />`
    credits.forEach((credit) => {
      innerHTML = `${innerHTML}
				<div class="credits-spacer"></div>
				<span class="credits-nickname">${credit.nickname}</span>
				<span class="credits-contribution text-muted">${credit.contribution}</span>
			`
    })
    modal.innerHTML = innerHTML

    container.addEventListener('mouseover', function () {
      modal.style.display = 'block'
      button.style.display = 'none'
    })

    container.addEventListener('mouseout', function () {
      modal.style.display = 'none'
      button.style.display = 'block'
    })

    return container
  }
})

export function getControl() {
  return new L.Control.Credits()
}
