
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import Extent from '@arcgis/core/geometry/Extent'
import { getRandomByRange } from '@/utils/math/random'
const mapServicesURL = [
  'http://localhost:6080/arcgis/rest/services/Algeria_Administive/MapServer',
  'http://localhost:6080/arcgis/rest/services/EP_data/MapServer',
  'http://localhost:6080/arcgis/rest/services/LRP_Arzew/MapServer'
]

async function getLayerCount (url:string):Promise<number> {
  let n = 0
  await fetch(url + '?f=pjson').then((res) => {
    const json:any = res.json()
    console.log('getLayerCount->json', json)
    // eslint-disable-next-line no-prototype-builtins
    n = json.layers.length
    console.log('if n ', n)
  })
  console.log('getLayerCount->n', n)
  return n
}

function getExtentByFeatureLayer (featureLayer:FeatureLayer):Extent {
  return featureLayer.fullExtent
}

async function getRandomFeatureLayer ():Promise<FeatureLayer> {
  const url = mapServicesURL[getRandomByRange(0, 3)]
  const layerid = getRandomByRange(0, await getLayerCount(url))
  return new FeatureLayer({
    // URL to the service
    url: url + '/' + layerid
  })
}

export { getRandomFeatureLayer, getExtentByFeatureLayer }
