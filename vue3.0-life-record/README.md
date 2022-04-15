### 命令
* Setup -- `yarn install`
* Compiles and hot-reloads for development -- `yarn start`
* Compiles and minifies for production -- `yarn build`
* Lints and fixes files -- `yarn lint`

### Vue2.0 与 Vue3.0对比
>Vue2.0采用`flow`进行编写, 而3.0源码全部采用Typescript进行开发, 对Typescript支持友好

>源码体积优化移除部分api, 使用tree-shaking

>数据劫持优化, Vue3采用Proxy, 性能大大提升

>编译优化: Vue3实现了静态模板分析, 重写diff算法

>CompositionAPI: 整合业务代码的逻辑, 提取公共逻辑 (Vue2采用了mixin - 命名冲突数据来源不清晰)

>自定义渲染器: 可以用来创建自定义的渲染器, 改写Vue底层渲染逻辑

>新增Fragment, Teleport, Suspense组件

### 使用的插件
1. yarn install vant@next
