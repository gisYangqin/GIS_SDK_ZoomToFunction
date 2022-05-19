import MapView from '@arcgis/core/views/MapView'
import Geometry from '@arcgis/core/geometry/Geometry'
import Graphic from '@arcgis/core/Graphic'
import Extent from '@arcgis/core/geometry/Extent'

import * as query from '@arcgis/core/rest/query'
import Query from '@arcgis/core/rest/support/Query'
import Point from '@arcgis/core/geometry/Point'
import * as projection from '@arcgis/core/geometry/projection'
import ExtentEx from './extentEx'

// import { GeometryType } from './gis/geometryType'
// 计算自定义的缩放返回的对象
// 当获取到该对象时，直接调用view.goTo(ZoomtoObject)即可

interface ZoomtoObject{
    zoom:number,
    center:Point
}

interface QueryLayer{
    mapLayerURL:string,
    filterClause?:string
}

function getZoomtoObject (mapView:MapView, queryLayers?:QueryLayer[], geometries?:Geometry[], graphices?:Graphic[]):ZoomtoObject {
  // 地图有效区域要根据修正量修正，确保缩放后要素仅出现于有效区域内
  // 以下4个常量分别为地图视窗在左右上下的裁剪距离（像素）
  const MAP_PADDING_LEFT = 20
  const MAP_PADDING_RIGHT = 285
  const MAP_PADDING_TOP = 60
  const MAP_PADDING_BOTTOM = 55

  const WIDTH_FIX = -(MAP_PADDING_LEFT + MAP_PADDING_RIGHT)
  const HEIGHT_FIX = -(MAP_PADDING_TOP + MAP_PADDING_BOTTOM)

  // 页面占比范围
  const PAGEEPRCENT_MIN = 0.1
  const PAGEEPRCENT_MAX = 0.6

  const mapWidthPiexl = mapView.width + WIDTH_FIX
  const mapHeightPiexl = mapView.height + HEIGHT_FIX

  const extents:Extent[] = []

  // 核心逻辑
  // 图层查询如果是空或单点时需要测试
  if (queryLayers && queryLayers.length > 0) {
    queryLayers.forEach((value) => {
      query.executeForExtent(value.mapLayerURL, new Query({ where: value.filterClause ? value.filterClause : '1=1' }))
        .then(function (PromiseObject) {
          extents.push(ExtentEx.getExtent(PromiseObject))
        }, function (error) {
          console.log(error)
        })
    })
  }

  if (geometries && geometries.length > 0) {
    geometries.forEach((value) => {
      extents.push(ExtentEx.getExtent(value))
    })
  }

  if (graphices && graphices.length > 0) {
    graphices.forEach((graphic) => {
      const e = ExtentEx.getExtent(graphic.geometry)
      extents.push(e)
    })
  }
  // 通过之前获取的四至范围列表，获取一个联合后的四至
  const extent = projection.project(ExtentEx.unionMutilExtent(extents)!, mapView.spatialReference) as Extent

  // 当没有几何形状时，四至对象为空
  if (extent === null) {
    return {
      zoom: mapView.zoom,
      center: mapView.center
    }
  }

  // 当几何仅有一个点，四至对象的宽高都无限接近于0
  const LIMITMINVALUE = 0.00000001
  // if (extent.width < LIMITMINVALUE && extent.height < LIMITMINVALUE) {
  //   console.log('LimitMinValue')
  //   return {
  //     zoom: mapView.zoom,
  //     center: extent.center
  //   }
  // }

  const mapWorkAreaWidth = mapWidthPiexl * mapView.resolution
  const mapWorkAreaHeight = mapHeightPiexl * mapView.resolution
  const scale = Math.max(extent.width / mapWorkAreaWidth, extent.height / mapWorkAreaHeight)

  let zoom = mapView.zoom
  if (extent.width > LIMITMINVALUE || extent.height > LIMITMINVALUE) {
    if (scale < PAGEEPRCENT_MIN) {
      zoom = zoom + Math.ceil(Math.log2(PAGEEPRCENT_MIN / scale))
    }
    if (scale > PAGEEPRCENT_MAX) {
      zoom = zoom - Math.ceil(Math.log2(scale / PAGEEPRCENT_MAX))
    }
  }

  const piexlPerTile = 256
  const minZoom = Math.ceil(Math.log2(Math.max(mapView.width, mapView.height) / piexlPerTile))
  if (zoom < minZoom) {
    zoom = minZoom
  }
  if (zoom > 17) {
    zoom = 17
  }

  // const leftDx1 = (mapView.width * mapView.resolution * Math.pow(2, mapView.zoom - zoom) - extent.width) / 2
  // const leftDx2 = ((mapWidthPiexl + MAP_PADDING_LEFT * 2) * mapView.resolution * Math.pow(2, mapView.zoom - zoom) - extent.width) / 2
  // const offsetDx =leftDx1 - leftDx2
  const offsetDx = (MAP_PADDING_RIGHT - MAP_PADDING_LEFT) / 2 * mapView.resolution * Math.pow(2, mapView.zoom - zoom)
  const offsetDy = (MAP_PADDING_TOP - MAP_PADDING_BOTTOM) / 2 * mapView.resolution * Math.pow(2, mapView.zoom - zoom)

  extent.offset(offsetDx, offsetDy, 0)

  // 断点测试
  if (graphices === undefined) {
    console.log('breakpoint')
  }

  return {
    zoom,
    center: extent.center
  }
}

export { getZoomtoObject }
