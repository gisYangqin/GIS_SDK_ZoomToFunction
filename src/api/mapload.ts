import ArcGISMap from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'

console.log('Map is initing')
const map = new ArcGISMap({
  basemap: 'streets-vector'
})

const view = new MapView({
  map,
  container: 'viewDiv',
  center: [2.244, 34.052],
  zoom: 6
})

view.when(() => {
  console.log('Map is loaded')
})
