<script lang="ts" setup>
import MapView from '@/components/MapView.vue'
console.log('index')
</script>

<template>
    <a-layout>
    <a-layout-header type="primary">页头区</a-layout-header>
    <a-layout>
      <a-layout-sider>侧边区
        <a-button type="primary">dd </a-button>
      </a-layout-sider>
      <a-layout-content>
        <MapView/>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style>

@import '@/style/common.css';
.ant-layout-header,
.ant-layout-footer {
  color: #fff;
  background: #3ba0e9;
}
.ant-layout-sider {
  color: #fff;
  line-height: 120px;
  background: rgba(16, 142, 233, 1);
}
</style>
