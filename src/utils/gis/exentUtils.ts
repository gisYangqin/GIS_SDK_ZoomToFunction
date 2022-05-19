import Point from '@arcgis/core/geometry/Point'
import Polyline from '@arcgis/core/geometry/Polyline'
import Extent from '@arcgis/core/geometry/Extent'
import Geometry from '@arcgis/core/geometry/Geometry'
import { GeometryType } from '@/utils/gis/geometryType'
import Polygon from '@arcgis/core/geometry/Polygon'

function getExtent (geometry:Geometry):Extent {
  const LIMITMINVALUE = 0.00000001

  let coordinateList:number[][][] = [[[]]]
  if (geometry.type === GeometryType.Point) {
    return new Extent({
      xmin: (geometry as Point).x - LIMITMINVALUE,
      xmax: (geometry as Point).x + LIMITMINVALUE,
      ymin: (geometry as Point).y - LIMITMINVALUE,
      ymax: (geometry as Point).y + LIMITMINVALUE,
      spatialReference: geometry.spatialReference
    })
  } else if (geometry.type === GeometryType.Extent) {
    return geometry as Extent
  } else if (geometry.type === GeometryType.Polyline) {
    coordinateList = (geometry as Polyline).paths
  } else if (geometry.type === GeometryType.Polygon) {
    coordinateList = (geometry as Polygon).rings
  } else {
    return geometry.extent
  }

  const xList:number[] = []
  const yList:number[] = []
  coordinateList.forEach((partList) => {
    partList.forEach((value) => {
      xList.push(value[0])
      yList.push(value[1])
    })
  })
  return new Extent({
    xmin: Math.min(...xList),
    xmax: Math.max(...xList),
    ymin: Math.min(...yList),
    ymax: Math.max(...yList),
    spatialReference: geometry.spatialReference
  })
}

export { getExtent }
