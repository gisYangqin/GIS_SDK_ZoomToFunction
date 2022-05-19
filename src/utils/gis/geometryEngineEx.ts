import Geometry from '@arcgis/core/geometry/Geometry'
import Point from '@arcgis/core/geometry/Point'
import Polygon from '@arcgis/core/geometry/Polygon'
import Polyline from '@arcgis/core/geometry/Polyline'
import Extent from '@arcgis/core/geometry/Extent'
import * as projection from '@arcgis/core/geometry/projection'
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine'
import { GeometryType } from './geometryType'
import { getRandomByRange } from '../math/random'

class geometryEngineEx {
  // 以一个点为基础，缩放一个几何体
  static expandGeometry (geo:Polygon|Polyline, factor:number, point?:Point):Geometry {
    let coordinateLsit:number[][][]
    if (geo.type === GeometryType.Polyline) {
      coordinateLsit = geo.paths
    } else if (geo.type === GeometryType.Polygon) {
      coordinateLsit = geo.rings
    } else {
      //
      return geo
    }
    // 当几何为空时，直接返回
    if (coordinateLsit.length === 0) {
      console.warn('几何为空')
      return geo
    }

    if (!point) {
      try { point = geo.extent.center } catch (error) {
        console.error('error', error)
        console.log('geo', geo)
      }
    }

    // 需要注意传入的点和几何形状坐标系是否一致
    if (point!.spatialReference !== geo.spatialReference) {
      point = projection.project(point!, geo.spatialReference) as Point
    }

    for (let i = 0; i < coordinateLsit.length; ++i) {
      for (let j = 0; j < coordinateLsit[i].length; ++j) {
        coordinateLsit[i][j][0] = (coordinateLsit[i][j][0] as number - point!.x) * factor + point!.x
        coordinateLsit[i][j][1] = (coordinateLsit[i][j][1] as number - point!.y) * factor + point!.y
      }
    }

    if (geo.type === GeometryType.Polyline) {
      return new Polyline({
        paths: coordinateLsit,
        spatialReference: geo.spatialReference
      })
    } else {
      return new Polygon({
        rings: coordinateLsit,
        spatialReference: geo.spatialReference
      })
    }
  }

  // 合并多个多边形
  static union (polygonList:Polygon[]):Polygon {
    let polygon:Polygon

    if (polygonList.length > 0) {
      polygon = polygonList[0].clone()
    } else {
      return new Polygon()
    }

    for (let i = 1; i < polygonList.length; ++i) {
      if (!polygonList[i].spatialReference) {
        console.log('read polygon error!')
        continue
      }
      if (polygonList[i].spatialReference !== polygon.spatialReference) {
        const p = projection.project(polygonList[i], polygon.spatialReference) as Polygon
        p.rings.forEach((ring) => polygon.addRing(ring))
        polygon = geometryEngine.simplify(polygon) as Polygon
      }
    }

    return polygon
  }

  // 获取一个默认的四至范围
  private static _getDefaultExtent (): Extent {
    return new Extent({
      xmin: -180,
      xmax: 180,
      ymin: -90,
      ymax: 90,
      spatialReference: { wkid: 4326 }
    })
  }

  // 随机获取一个点几何对象
  static createRandomPoint (extent?:Extent) {
    if (!extent) {
      extent = this._getDefaultExtent()
    }

    return new Point({
      longitude: getRandomByRange(extent.xmax, extent.xmin),
      latitude: getRandomByRange(extent.ymax, extent.ymin),
      spatialReference: extent.spatialReference
    })
  }

  // 随机获取一个折现几何对象
  static createRandomPolyline (extent?:Extent) {
    if (!extent) {
      extent = this._getDefaultExtent()
    }

    // 随机一个数为折线的顶点数
    let pointCount:number = 0
    do {
      pointCount += Math.floor(Math.random() * 10)
    }
    while (Math.random() > 0.9)

    if (pointCount < 3) {
      pointCount = 3
    }

    const paths:number[][][] = [[]]
    for (let i:number = 0; i < pointCount; i++) {
      const x = getRandomByRange(extent.xmax, extent.xmin)
      const y = getRandomByRange(extent.ymax, extent.ymin)
      paths[0].push([x, y])
    }

    return new Polyline({
      paths,
      spatialReference: extent.spatialReference
    })
  }

  // 随机返回一个多边形
  static createRandomPolygon (extent?:Extent):Polygon {
    if (!extent) {
      extent = this._getDefaultExtent()
    }

    // 随机一个数为,作为三角形数量
    let triangleCount:number = 1
    do {
      triangleCount += Math.floor(Math.random() * 10)
    }
    while (Math.random() > 0.9)

    const triangleList:Polygon[] = []
    for (let i = 0; i < triangleCount; ++i) {
      const rings:number[][][] = [[]]
      for (let j = 0; j < 3; ++j) {
        const x = getRandomByRange(extent.xmax, extent.xmin)
        const y = getRandomByRange(extent.ymax, extent.ymin)
        rings[0].push([x, y])
      }
      rings[0].push(rings[0][0])
      const polygon = new Polygon({
        rings,
        spatialReference: extent.spatialReference
      })

      triangleList.push(geometryEngine.simplify(polygon) as Polygon)
    }

    triangleList.forEach((geo) => {
      if (!geo.spatialReference) {
        console.log('geometry spatialReference undefine')
      }
    })

    // union 函数有比较低的概率，无法识别空间索引
    return this.union(triangleList) as Polygon
  }
}

export default geometryEngineEx
