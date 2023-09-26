# 本项目为vue3开发的电商平台项目，后台数据和接口来自小兔鲜电商平台项目

## 技术栈

- vue3+pinia+vite+vueuse
- pinia作为全局状态管理,根据接口文档使用axios封装相应的请求。
- vueuse 是一个基于 Vue 3 的 Composition API 的开源库，类似于React Hooks

## 项目文件结构

- apis API接口文件夹
- assets 静态资源
- components 业务非强相关通用组件
- composables 组合函数文件夹
- directives 全局指令文件夹（如自定义懒加载全局指令）
- router 路由
- stores 全局状态管理
- styles 全局样式
- utils 工具函数
- views 页面

## 项目导航结构

- 一级：主页Layout '/'，登录页Login '/login'
- 二级（Layout下属）：
  Home页面 '',
  分类页面 'category/:id',
  二级分类页面 'category/sub/:id',
  详情页面 'detail/:id',
  购物车列表页面：'cartlist'
  结算页面：'checkout'
  支付页面: 'pay'
  支付结果页面：'payback'
  会员中心页面： 'member'
- 三级（Member下属）：
  个人中心:'',
  我的订单:'order'

## 项目页面结构

### 1.Layout 主页

- 包含头部、导航、吸顶导航、尾部、HOME主页内容、头部购物车

### 2.Home页面

- HOME作为二级导航包含：左侧分类和轮播图、新鲜好物、人气推荐、产品列表
- Category作为二级导航跳转至一级分类

### 3.二级分类

- 同属于二级导航,面包屑导航。
- 基础商品列表实现。（实现基础列表封装->添加额外功能实现筛选->无限加载功能实现）
- 关于额外功能实现筛选：点击tab时，切换筛选条件参数sortField，重新发送请求.
- 无限加载功能：使用elementPlus提供的v-infinite-scroll指令监听是否满足触底条件，满足加载条件时，让页面参数+1来获取下一页数据，然后做新老数据拼接渲染。 !

### 4.详情页面

- 创建详细组件->绑定路由关系（参数）
- 热榜模块可封装。 封装->获取渲染基础数据->适配不同标题Title->适配不同列表内容
- 图片预览模板：思路：维护一个图片列表，鼠标划入小图记录其下标，再从数组中取对应图片。
- 放大镜实现：左侧滑块跟随鼠标移动，右侧大图放大效果实现，鼠标移入控制滑块和大图显示隐藏。

### 5.登录页面

- 主要功能：表单验证和登录登出业务
- 配置表单验证功能:el-form(绑定表单对象和规则对象),el-form-item(绑定使用的规则字段)，el-input(双向绑定表单数据)
- 使用token来判断是否已登录，来多模板渲染显示。
- 退出登录业务：清除当前用户信息，跳转至登录页面、

### 6.购物车

- 主要功能：（增删改查加全选）->检查是否登录->分为本地购物车操作（所有操作不走接口直接操作Pinia中的本地购物车列表）与接口购物车操作（操作走接口，操作完毕获取购物车列表更新本地购物车列表）

1. 加入购物车
   封装cartStore（state+action）->判断是否已选规格->添加功能(pinia)->根据id判断是否已添加
2. 购物车列表
   单选的核心思路为：始终将单选框的状态和Pinia中store的状态同步。
   v-model双向绑定指令并不方便进行命令式的操作（如需要调用接口），改为手动双向（：model-value+@change）
3. 在线购物车（需登录）
   调用加入购物车接口。
   调用获取购物车列表接口
   用接口购物车列表覆盖本地购物车列表
4. 退出登录时应清空购物车

### 7.结算

1. 切换弹框交互：点击切换地址，打开弹窗，回显用户可选地址列表
2. 切换地址交互：点击切换地址，点击确定按钮，激活地址替换默认收货地址
   地址切换是常遇见的**tab切换**需求，实现逻辑如下：点击时记录当前激活地址对象；通过动态类名:class控制激活样式类型active是否存在，判断条件是**激活地址对象id===当前项id**
3. 生成订单：调用接口生成订单id，且携带id跳转至支付页面，并更新购物车状态

### 8.支付页面

- 支付业务流程：客户端（前端）--[跳转支付地址(get请求)(订单id+回跳地址url)]-->后端服务--[根据支付宝协议请求支付宝]-->第三方支付宝服务--[响应支付结果]-->后端服务--[跳转到回跳地址url(订单id+支付状态)]-->客户端（前端）
- 封装倒计时函数:将秒数格式转化为倒计时的显示状态

### 9.会员中心

- 个人中心：个人信息以及猜你喜欢模块数据渲染
- 我的订单：各种状态下的订单列表展示

## 项目难点+解决

- 对相似模块进行组件封装。解决：把可能发生变化的部分抽象成组件参数（props/插槽）。主标题和副标题是纯文本，抽象为prop传入；主体内容是复杂的模板，抽象成插槽传入。

- 使用懒加载进行性能优化。解决：判断图片是否进入视口区域,如果图片进入视口，发送图片资源请求.通过 app.directive 创建了一个名为 img-lazy 的自定义指令。在 mounted 内部使用useIntersectionObserver API，isIntersecting来检测元素是否出现在视口中。一旦元素出现在视口中，并将其 src 属性设置为指令中传递的值（binding.value）。当图片加载完成后，它将替换原始元素的 src 属性。其中存在重复监听的问题。解决思路：在监听的图片第一次完成加载之后就停止监听。

- Token失效的问题
  如果用户一段时间不做任何操作，Token会失效，使用失效的Token去请求接口，会报401状态码错误（客户端为授权）
  现在需要思考两个问题：

  1. 能确定用户到底在访问哪个接口出现401错误？在什么位置去拦截401 （还是统一拦截，失败回调中拦截401）
  2. 检测到401后该做什么 （1.清除过期的用户信息，2.跳转至登录页）

- 合并本地购物车到服务器
  我希望未登录时操作的购物车，能够在登录后合并到在线购物车。
  登录时调用合并购物车接口->获取最新购物车列表并覆盖(已封装)

  - SKU（货存单位）组件。
    首先如果遇到别人写好的组件，应该先看什么。props和emit，props决定了当前组件接受什么数据;emit则决定会产出什么数据。
    1. 认识：为了让用户能够选择商品的规格，从而提交购物车，在选择过程中，组件的**选中状态要进行更新**，组件还要**提示用户当前规格是否禁用**，每次选择都要**产出对应的SKu数据**

## 性能优化

- 解决路由缓存问题：用户从/category/id1 导航到/category/id2时，相同的组件实例会被重复使用。这是因为两个路由都渲染同一个组件，比起销毁再创建，复用更高效。但这也意味着组件的生命周期函数不会被调用，又因为之前获取数据的方法写在onMounted钩子里，导致更换路由时数据并没有更新渲染。(只有参数变化时，会发生组件复用)
- 解决方法：使用beforeRouteUpdate导航钩子（路由守卫），在每次路由更新之前执行，在回调中执行需要数据更新的业务逻辑

- 做了许多业务代码封装，提高可维护性。

- 定制路由滚动行为 scrollBehavio（） { return { top:0 } }

- 持久化用户数据Pinia
  目的：保持token不丢失，保持登录状态。
  解决：使用Pinia-plugin-persistedstate持久化存储插件。
  运行机制：操作state是会自动把数据同步给localStorage，获取state时会优先从localStorage中取

1. 用户数据中有一个关键的数据叫Token（标识当前用户是否登录），而Token持续一段时间才会过期。
2. Pinia的存储是基于内存的，刷新就会丢失，为了保证登录状态就要做到刷新不丢失，需要配合持久化进行存储。

## 关于登录

- 为何要在请求拦截器中携带Token
  Token作为**用户标识**，在很多接口中都需要携带Token来进行鉴权，有Token后端才能把数据给到前端，所以需要在接口调用时携带Token。另外，这是为了统一控制采取请求拦截器携带的方案。
  在本项目中，Token会注入到请求header中。格式是与后端商量要求的格式进行拼接处理。

  ## 组合式API

- 均需要先导入
- reactive，传入对象类型的参数，响应式数据更新。 const state=reactive（{count：0}） 在脚本区直接使用state。
- ref，传入简单类型或对象类型 const count=ref（0） 在脚本区使用的话count.value。这就是区别。
- computed，在回调参数中return基于响应式数据（ref、reactive）做计算的值
  const computedList = computed（（）=> {
  return list.value.fliter(item=>item>2)
  }
  不应包含副作用如异步请求，计算属性只读
- watch，1.侦听一个或多个数据的变化，数据变化时执行回调函数，两个额外参数（immediate立即执行，deep深度侦听）watch(count,(newVal,oldVal)=>{console.log(newVal,oldVal)}) 2.若监听多个则为数组形式，其中一个改变就会触发回调。 3.深度监听针对使用对象类型的响应式数据，直接修改时，不会触发回调函数，需要递归性能损耗大。4.精确侦听，回调函数变为两个，第一个（）=> state.value.age指定要侦听的属性。
