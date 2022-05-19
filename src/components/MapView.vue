<script lang="ts" setup>
import ArcGISMap from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
// import BasemapGallery from '@arcgis/core/widgets/BasemapGallery'
import { onMounted } from 'vue'

import GISToolBar from '../widgets/ToolBar/toolbar'

onMounted(() => {
  const map = new ArcGISMap({
    basemap: 'topo'
  })

  const view = new MapView({
    map,
    container: 'viewDiv',
    center: [2.244, 30.052],
    zoom: 5
  })

  view.when(() => {
    console.log('Map is loaded')
  })
  const gisToolBar = new GISToolBar({
    view
  })

  view.ui.add(gisToolBar, {
    position: 'top-right'
  })
})
</script>

<template>
    <div id="viewDiv">
    </div>
    <!-- <div id="toolBar" class="esri-widget">
        <ul>
            <li id="Locate" class="esri-icon-locate" title="实时定位"></li>
            <li id="Compass" class="esri-icon-compass" title="指南针"></li>
            <li id="Full_Extent" class="esri-icon-globe" title="默认地图范围"></li>
            <li id="Coordinate_Conversion" class="esri-icon-rotate" title="坐标转换"></li>
            <li id="Measure" class="esri-icon-measure" title="测量（开发中）"></li>
            <li id="Spatial_Search" class="esri-icon-polygon" title="空间搜索（开发中）"></li>
            <li id="Attribute_Search" class="esri-icon-search" title="属性搜索（开发中）"></li>
            <li id="Table" class="esri-icon-table" title="属性表（开发中）"></li>
            <li id="LayerList" class="esri-icon-layers" title="图层空间"></li>
            <li id="Basemap_Gallery" class="esri-icon-basemap" title="底图切换"></li>
            <li id="Table" class="esri-icon-lasso" title="属性表（开发中）"></li>
            <li id="LayerList" class="esri-icon-erase" title="图层空间"></li>
            <li id="Basemap_Gallery" class="esri-icon-settings2" title="底图切换"></li>
        </ul>
    </div> -->
</template>

<style scoped>
@import "https://js.arcgis.com/4.23/@arcgis/core/assets/esri/themes/light/main.css";
#viewDiv {
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    }
#toolBar {
        padding: 0;
        background-color: white;
        max-width: auto;
    }
.esri-coordinate-conversion__select-row {
    width: 100px;
}

.esri-ui-corner {
    max-width: calc(100% - 46px);
}

ul {
    padding-left: 0px;
    margin: 5px 5px 5px 5px;
    border: 0px 0px 0px 0px;
}

ul li {
    margin: 5px 5px 5px 5px;
    cursor: pointer;
}
</style>
