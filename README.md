# Vue 3 + TypeScript + Vite 框架下GIS公共函数开发

基于ArcGIS开发公共的SDK

## 下一步计划
定位缩放：  
两种方式：  
第一种方式：  
1.　单个feturelayer 查询extent ，根据不同比例尺expand extent 进行定位缩放  
2.　多个featureLayer 获取到多个extent 合并，根据不同比例尺expand extent 进行定位缩放

第二种方式：
获取到实体空间数据
对多点，单线，多线，单面，多面，以及点面，点线，线面等 获取到空间数据的extent，根据不同比例尺expand extent 进行定位缩放
对单点，根据不同的比例尺进行定位缩放

上次主要是 做的  设定一个规则，根据不同比例尺expand extent 进行定位缩放