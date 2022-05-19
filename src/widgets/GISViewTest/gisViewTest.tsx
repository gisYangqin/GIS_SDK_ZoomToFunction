/* eslint-disable */
import './style.css'
import { subclass, property } from "@arcgis/core/core/accessorSupport/decorators"
import { init } from "@arcgis/core/core/watchUtils"
import Widget from "@arcgis/core/widgets/Widget"
import { tsx } from "@arcgis/core/widgets/support/widget"
import Graphic from "@arcgis/core/Graphic"
import MapView from "@arcgis/core/views/MapView"
import Extent from "@arcgis/core/geometry/Extent"

import { GeometryType, getRandomGeometryType } from '@/utils/gis/geometryType'
import geometryEngineEx from '@/utils/gis/geometryEngineEx'
import { getZoomtoObject } from '@/utils/gis/gisUtility'

import * as projection from "@arcgis/core/geometry/projection"
import Point from '@arcgis/core/geometry/Point'
import { getRandomFeatureLayer } from './testUtily'


const CSS = {
    base: 'widget-gisViweUtilityTest'
}

interface gisViewTestParameters extends __esri.WidgetProperties {
    view: MapView
}

@subclass('esri.widgets.gisViewTest')
class gisViewtest extends Widget {
    constructor(params?: gisViewTestParameters) {
        super(params)
    }

    postInitialize() {
        this.own(init(this, "view.center, view.zoom", () =>
            this._onViewChange()
        ))
    }

    @property()
    gacphic: Graphic

    @property()
    info: string

    @property()
    view!: MapView


    render() {

        // JSX
        return (
            <div class={CSS.base}>
                <div>测试1:随机单个要素图层<br></br>
                    <button bind={this} onclick={this._ZoomToRandomFeatureLayer} class='ant-btn ant-btn-primary'>执行</button>
                </div>
                <div>测试2:随机多个要素图层<br></br>
                    <button bind={this} onclick={this._ZoomToRandomMutilFeatureLayer} class='ant-btn ant-btn-primary'>执行</button>
                </div>
                <div>测试3:随机从单个要素图层获取多个图形<br></br>
                    <button>执行</button>
                </div>
                <div>测试4:随机从多个要素图层获取多个图形<br></br>
                    <button>执行</button>
                </div>
                <div>测试5:随机生成一个图形并缩放至<br></br>
                    <button bind={this} onclick={this._creatRandomeGraphic} class='ant-btn ant-btn-primary'>执行</button>
                </div>
                <br></br>
                <div>
                    信息:
                    <p>{this.info}</p>
                </div>
            </div>
        )
    }

    // 清空目前所有的图层和图形
    private _clearAllLayerandGraphic(){
        this.view.map.layers.removeAll()
        this.view.graphics.removeAll()
    }

    // 随机获取一个要素图层，并缩放至
    private async _ZoomToRandomFeatureLayer(){
        this._clearAllLayerandGraphic()
        const featLayer=await getRandomFeatureLayer()
        this.view.map.layers.add(featLayer)
        this.view.goTo(getZoomtoObject(this.view, [{
            mapLayerURL:featLayer.url
        }]))
    }


    // 随机获取多个要素图层，并缩放至
    private _ZoomToRandomMutilFeatureLayer(){

    }


    //创建一个随机的图形.并缩放至该图形
    private _creatRandomeGraphic() {
        this._clearAllLayerandGraphic()
        const extent_algeria = new Extent({
            xmin: -10,
            xmax: 11,
            ymin: 26,
            ymax: 38,
            spatialReference: { wkid: 4326 }
        })

        let type = getRandomGeometryType()
        if (type == GeometryType.Point) {
            const markerSymbol = {
                type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
                color: [226, 119, 40],
                outline: {
                    // autocasts as new SimpleLineSymbol()
                    color: [255, 255, 255],
                    width: 2
                }
            }
            const pointGraphic = new Graphic({
                geometry: geometryEngineEx.createRandomPoint(extent_algeria),
                symbol: markerSymbol
            })

            this.view.graphics.add(pointGraphic)
            this.view.goTo(getZoomtoObject(this.view, [], [], [pointGraphic]))
        }
        else if (type == GeometryType.Polyline) {
            const lineSymbol = {
                type: "simple-line", // autocasts as SimpleLineSymbol()
                color: [226, 119, 40],
                width: 2
            }
            const polylineGraphic = new Graphic({
                geometry: geometryEngineEx.expandGeometry(geometryEngineEx.createRandomPolyline(extent_algeria), Math.pow(Math.random() + 0.01, 3)),
                symbol: lineSymbol
            })
            this.view.graphics.add(polylineGraphic)
            this.view.goTo(getZoomtoObject(this.view, [], [], [polylineGraphic]))
        } else if (type == GeometryType.Polygon) {
            const fillSymbol = {
                type: "simple-fill", // autocasts as new SimpleFillSymbol()
                color: [255, 255, 255, 0.6],
                outline: {
                    // autocasts as new SimpleLineSymbol()
                    color: [227, 139, 79],
                    width: 2
                }
            }
            const polygonGraphic = new Graphic({
                geometry: geometryEngineEx.expandGeometry(geometryEngineEx.createRandomPolygon(extent_algeria), Math.pow(Math.random() + 0.01, 3)),
                symbol: fillSymbol
            })
            this.view.graphics.add(polygonGraphic)
            this.view.goTo(getZoomtoObject(this.view, [], [], [polygonGraphic]))
        }
    }

    private _onViewChange() {
        let { center, zoom } = this.view
        let point = projection.project(center, { wkid: 4326 }) as Point
        // console.log('zoom:' + zoom + ', center:' + center.x + ', ' + center.y)
        this.info = 'zoom:' + zoom + ', center:' + point.x + ', ' + point.y
    }
}


export default gisViewtest
