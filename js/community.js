L.Control.Community = L.Control.extend({
  options: {
    position: 'bottomleft',
    url: 'discord://https://discord.com/channels/505994577942151180/1149478735913959444',
    iconUrl: 'https://static-00.iconduck.com/assets.00/discord-icon-256x256-mihmpmuj.png',
  },

  onAdd: function (map) {
    const container = L.DomUtil.create('div', 'leaflet-control-community');
    const link = L.DomUtil.create('a', 'leaflet-control-community-link', container)
    const button = L.DomUtil.create('button', 'leaflet-control-community-button', link);
    const icon = L.DomUtil.create('img', 'leaflet-control-community-icon', button)
    link.href = this.options.url
    icon.src = this.options.iconUrl
    icon.style = "width: 100%"

    return container;
  },
})

export function getControl() {
  return new L.Control.Community()
}
