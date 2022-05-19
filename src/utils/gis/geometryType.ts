/* eslint-disable no-unused-vars */

import { randomEnum } from '../math/random'

// arcGIS Api 中全部的几何类型枚举
enum GeometryType{
    Point='point',
    Multipoint='multipoint',
    Polyline='polyline',
    Polygon='polygon',
    Extent='extent',
    Mesh='mesh'
}

function getRandomGeometryType (mode = 'point|polyline|polygon'):GeometryType {
  if (mode === 'all') {
    return randomEnum(GeometryType)
  } else if (mode === 'point') {
    return GeometryType.Point
  } else {
    return randomEnum([GeometryType.Point, GeometryType.Polyline, GeometryType.Polygon]) as GeometryType
  }
}

export { GeometryType, getRandomGeometryType }
