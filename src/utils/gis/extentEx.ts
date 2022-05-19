import Extent from '@arcgis/core/geometry/Extent'
import Geometry from '@arcgis/core/geometry/Geometry'
import Point from '@arcgis/core/geometry/Point'
import * as projection from '@arcgis/core/geometry/projection'
import { GeometryType } from './geometryType'

// 传入两个数，获取最大值，数可能时undefine
function max (n1:number|undefined, n2:number|undefined):number|undefined {
  if (typeof n1 === 'number') {
    if (typeof n2 === 'number') {
      return Math.max(n1, n2)
    } else {
      return n1
    }
  } else {
    if (typeof n2 === 'number') {
      return n2
    } else {
      return undefined
    }
  }
}
// 传入两个数，获取最大值，数可能时undefine
function min (n1:number|undefined, n2:number|undefined):number|undefined {
  if (typeof n1 === 'number') {
    if (typeof n2 === 'number') {
      return Math.min(n1, n2)
    } else {
      return n1
    }
  } else {
    if (typeof n2 === 'number') {
      return n2
    } else {
      return undefined
    }
  }
}

class ExtentEx extends Extent {
  // eslint-disable-next-line no-useless-constructor
  constructor (params?:any) {
    super(params)
  }

  static createDefaultExtent () {
    return new Extent({
      xmin: -180,
      xmax: 180,
      ymin: -90,
      ymax: 90,
      spatialReference: { wkid: 4326 }
    })
  }

  // 获取一个形状的Extent
  static getExtent (geometry:Geometry):Extent {
    if (geometry.type === GeometryType.Point) {
      const point = geometry as Point
      return new Extent({
        xmin: point.x,
        xmax: point.x,
        ymin: point.y,
        ymax: point.y,
        spatialReference: point.spatialReference
      })
    } else {
      return geometry.extent.clone()
    }
  }

  // 合并多个个Extent
  static unionExtent (extent1:Extent, extent2:Extent):Extent {
    // eslint-disable-next-line eqeqeq
    if (extent1.spatialReference != extent2.spatialReference) {
      extent2 = projection.project(extent2, extent1.spatialReference) as Extent
    }

    return new Extent({
      xmin: min(extent1.xmin, extent2.xmin),
      xmax: max(extent1.xmax, extent2.xmax),
      ymin: min(extent1.ymin, extent2.ymin),
      ymax: max(extent1.ymax, extent2.ymax)
    })
  }

  // 合并多个Extent
  static unionMutilExtent (extents:Extent[]):Extent|null {
    let extent:Extent
    if (extents.length === 0) {
      return null
    } else if (extents.length === 1) {
      extent = extents[0]
    }

    for (let i = 1; i < extents.length; ++i) {
      extent = this.unionExtent(extent!, extents[i])
    }
    return extent!
  }
}

export default ExtentEx
