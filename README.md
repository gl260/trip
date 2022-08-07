# trip
trip-project vue3+vite

当前完成首页, 城市页面, 详情页面

启动项目

1. npm install
2. npm run dev



## 项目开始步骤

#### 一. 初识化项目

##### 项目使用vite

```js
方式一: Vue CLI
	基于webpack工具 --- 命令：vue create 项目名称
方式二: create-vue
	基于vite工具 --- 命令：npm init vue@latest
```

##### 项目配置icon,标题

* 项目的icon --- 在index.html中配置
* 项目的标题 --- 在index.html中配置
* 配置jsconfig.json ---> 让vscode有更好的提示

```json
{
  "compilerOptions": {
    // "target": "es5",
    "module": "esnext",
    "baseUrl": "./",
    "moduleResolution": "node",
    "jsx": "preserve",
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost
    ]
  }
}
```

##### css样式重置

* normalize.css --- `npm install normalize.css`

* reset.css

```css
body,h1,h2,h3,h4,h5,h6,p{
  margin: 0;
  padding: 0;
}

ul,li{
  list-style: none;
}

a{
  text-decoration: none;
  color: #333
}

img{
  vertical-align: top;
}
```

```js
// main.js
import "normalize.css";
import "./assets/css/index.css";
```

##### 路由配置

* npm install vue-router
* 创建router文件夹 --- index.js

```js
import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
    history: createWebHashHistory(),
    router: [
        {
            path: "/",
            redirect: "/home",
        },
        {
            path: "/home",
            component: () => import("@/views/home/home.vue"),
        }
    ]
})
export default router;
```

```js
//main.js
import router from "./router";
createApp(App).use(router).mount("#app");
```

##### 状态管理 --- pinia

* npm install pinia
* 创建stores文件夹
  * modules文件夹
  * index.js

```js
// index.js
import { createPinia } from "pinia"
const pinia = createPinia()
export default pinia
```

* 在modules下创建每个页面需要管理的状态

```js
// home.js
import { defineStore } from "pinia"
import { getHotSuggest } from '@/service
const useHomeStore = defineStore("home", {
    state: () => ({
        hotSuggest: {},
    }),
    actions: {
        async fetchHotSuggest() {
            const res = await getHotSuggest(); // --> getHotSuggest()通过axios分装的函数
            this.hotSuggest = res.data;
        }
    }
})
export default useHomeStore
```

##### axios的封装

* npm install axios
* 创建service文件夹
  * modules文件夹 --- 各模块的网络请求
    * home.js
    * detail.js
    * ...
  * request文件夹 --- 二次分装axios
    * config.js --- BASE_URL 和 TIMEOUT配置
    * index.js --- axios封装真正位置,会将config.js文件导入进来使用
  * index.js --- 统一导出 文件
* axios的二次封装封装

```js
export const BASE_URL = "http://codercba.com:1888/api";
export const TIMEOUT = 10000;
```

```js
import axios from "axios"
import { BASE_URL, TIMEOUT } from "./config";

// loading动画逻辑,在拦截器中拦截网络请求
import useMainStore from "@/stores/modules/main";
const mainStore = useMainStore();

class GlRequest {
    constructor(baseURL, timeout) {
        this.instance = axios.create({
            baseURL,
            timeout
        });
        this.instance.interceptors.request.use(
        	(config) => {
           		mainStore.isLoading = true;
                return config
            },
            (err) => {
                return err
            }
        );
        this.instance.interceptors.response.use(
        	(res) => {
                mainStore.isLoading = false;
                return res
            },
            (err) => {
                mainStore.isLoading = false;
                return err
            }
        )
    }
    request(config){
        return new Promise((resolve, reject) => {
            this.instance.request(config).then( res => {
                resolve(res.data)
            }).catch( err => {
                reject(err)
            });
        });
    }
    get(config){
        return this.request({ ...config, method: "get" });
    }
    post(config){
        return this.request({ ...config, method: "post" });
    }
}
export default new GlRequest(BASE_URL, TIMEOUT)
```



## Loading动画

* 具体逻辑
  * 首先编写好loading动画的组件

  * 在App.vue中注册好loading动画组件,(为什么要在App.vue中注册?) 因为网络请求在所有页面都有可能发生,发生网络请求时,就需要有loading动画

    * 这时需要一个全局状态,在mainStore中有记录一个状态,需要共享给axios的拦截器和loading组件

      `isLoading: false`

    * 并且在loading组件中的根节点上需要这样设置

    ```html
    loading组件中的根节点: 
    <div class="loading" v-if="mainStore.isLoading">Loading的具体实现</div>
    ```

  * 然后通过axios的拦截器中,当发生网络请求时

    * 拦截请求(request) --- 将isLoading设置为true,显示动画
    * 拦截响应(response) --- 网络请求响应后再将isLoading设置回false,关闭动画

* 共享mainSore的状态

  ```js
  import useMainStore from "@/stores/modules/main";
  const mainStore = useMainStore();
  ```



## 首页房屋列表上拉刷新实现

房屋列表接口: http://codercba.com:1888/api/home/houselist?page=1

* 在stores中设置当前页面: currentPage: 1

* 当滚到到底部时,请求数据 将 currentPage++

  * 因为是从显示20条数据 --> 显示40条数据 --> 显示60条数据
  * 需要将第一页的数据和第二页的数据合并在一起显示 --- this.houseList.push(...res.data)

  ```js
  state(() => {
      currentPage: 1, //获取下一页数据方式二
      houseList: [],
  }),
  actions: {
      async fetchHouseList() {
        const res = await getHomeHouseList(this.currentPage);
        this.houseList.push(...res.data);
        this.currentPage++;
      },
  }
  ```

* 当然,在home.vue中需要监听滚动到底部(两种滚动方式: window的滚动 和 div的滚动)

  * 滚动到底部后,发送网络请求
  * homeStore.fetchHouseList()



## 点击组件跳转对应页面(动态路由)

* 详情页接口: http://codercba.com:1888/api/detail/infos?houseId=44173741

* 首先设置动态路由 -- router/index.js

  ```js
  {
     path: "/detail/:id",
     component: () => import("@/views/detail/detail.vue"),
  },
  ```

* 首页中热门精选的房屋列表都是循环出来的组件, 点击组件之后,获取到对应的houseId -- views/home

  ```js
  <house-item-v3 click="itemClick(item.data)"/>
  const itemClick = (item) => {
    router.push("/detail/" + item.houseId);
  };
  ```

* 切换到detail页面中

* 在detail页面中发送网络请求

  ```js
  // route: 路线      useRoute: 返回当前路由地址 相当于在模板中使用 $route
  // router: 路由器   useRouter: 返回 router 实例
  const route = useRoute();
  const houseId = route.params.id;
  const DetailStore = useDetailStore();
  DetailStore.fetchdetailData(houseId);
  ```

* stores中接收到houseId

  ```js
  actions: {
      async fetchdetailData(houseId) {
        const res = await getDetailInfos(houseId);
        this.detailInfos = res.data;
      },
  },
  ```

* service中真正请求数据

  ```js
  export function getDetailInfos(houseId) {
    return GlRequest.get({
      url: "/detail/infos",
      params: {
        houseId,
      },
    });
  }
  ```



## 详情页轮播图数据转换并展示(难点)

* 功能说明: 轮播图指示器 -> `卧室1/9` `卫生间` `其他`

* 将数据`[ {}, {}, {}, {}... ] --> { 2: [], 4:[], 9:[] }`

* 其中 2 4 9 是原数据中属性的`enumPictureCategory`值

  ```json
  "housePics": [
      {
          "title": "【卧室】：",
          "url": "",
          "albumUrl": "",
          "orderIndex": 0,
          "pictureExplain": null,
          "enumPictureCategory": 2
      },
      {},
      {
          "title": "【卫生间】：",
          "url": "",
          "albumUrl": "",
          "orderIndex": 9,
          "pictureExplain": null,
          "enumPictureCategory": 4
      },
      ....
  ]
  ```

* 循环housePics这个数组, 将保存的数据存放在swipeGroup中

  ```js
  // 将新的数据结构存放在swipeGroup中
  const swipeGroup = {};
  for (const item of housePics) {
      // 第一次循环 swipeGroup刚开始没有值,比如swipeGroup[2]是取不到的
      let groupArray = swipeGroup[item.enumPictureCategory];
      // groupArray没有值时,给groupArray赋值一个空数组
      if (!groupArray) {
          groupArray = [];
          swipeGroup[item.enumPictureCategory] = groupArray;
      }
      groupArray.push(item); // 吧第一次循环的item push给groupArray
  }
  ```



## 底部tar-bar组件的显示与隐藏

* 方式一: 

  ```js
  // router/index.js
  path: "/city",
  component: () => import("@/views/city/city.vue"),
  meta: {
      currentShow: true, //其它路由currentShow没有设置,为undefined,转为布尔类型是false
  }
  ```

  ```js
  // App.vue
  <tar-bar v-if="!route.meta.currentShow" />
  
  import { useRoute } from "vue-router";
  const route = useRoute();
  ```

* 方式二:

  ```css
  // 组件根节点上添加
  position: relative;
  z-index: 9;
  height: 100vh;
  background-color: #fff;
  
  overflow-y: auto;
  ```

  



## 滚动: window滚动 盒子的滚动 -- useScroll.js

* window滚动

  * 这两种滚动获取

  ```js
  // window
  document.documentElement.clientHeight; // 屏幕可视区高度
  
  // 因为这里可能是有小数,可能取不到对应的值,所以需要+1
  document.documentElement.scrollTop; // 向上滚动的距离
  
  document.documentElement.scrollHeight; // 当前页面可以滚动的高度
  ```

  ```js
  // div(盒子)滚动,需要获取DOM(vue中获取DOM)
  homeRef.clientHeight
  homeRef.scrollTop
  homeRef.scrollHeight
  ```

* 当div(盒子)滚动时, 需要设置css

  ```js
  .home{
      height: 100vh;
  	overflow-y: auto;
  }
  ```

  

## tab-control使用vantUI库

* detail-vant.vue中
* 缺点: van-tabs无法隐藏, 隐藏会将它包裹的都隐藏掉 



## tab-control组件-不用UI库(难点)

* tab-Control

  ```html
  <tab-Control
    class="tab-control"
    :tab="names"              -- tab标题
    v-if="showtabControl()"   -- 下拉300px显示tab-control
    @clickTabBtn="tabClick"   -- 点击tab,滚动到对应位置
    ref="conteolRef"			-- 滚动到对应位置,tab标题高亮时需要用到
  ></tab-Control>
  ```

* tab-control 下拉300px显示出来
  ```js
  const detailRef = ref();
  const { scrollTop } = useScroll(detailRef);
  const showtabControl = () => {
    return scrollTop.value >= 300;
  };
  ```

* 动态tab标题

  ```js
  当我们传递给一个组件某个属性,但是该属性并没有定义对应的props或者emits时,就称之为非Prop的Attribute
  这里的name属性: -> 非Prop的Attribute :当组件有跟节点时,非Prop的Attribute将自动添加到根节点的Attribute中
  然后通过getSectionRef.value.$el获取到组件的根元素
  :ref="" 动态绑定时可以将 ref 定义为回调函数，显式地传递元素或组件实例
  ```

  ```js
  <detail-info name="描述" :ref="getSectionRef" />
  <detail-facility name="设施" :ref="getSectionRef" />
  <detail-landlord name="房东" :ref="getSectionRef" />
  ...
  ```

  ```js
  const sectionEls = ref({}); // { "描述": el, "设施": el, .. }
  const names = computed(() => {
    return Object.keys(sectionEls.value); //获取sectionEls.value这个对象的key
  });
  const getSectionRef = (value) => {
      //getAttribute() 返回元素上一个指定的属性值
      const name = value.$el.getAttribute("name");
      sectionEls.value[name] = value.$el; // name作为key,元素作为值
  }
  ```

* 点击tab,滚动到对应位置

  * 点击tab,想办法获取对应DOM对象
  * 然后通过const distance = el.offsetTop --> 获取当前元素相对于其顶部的距离

  ```js
  // Element.scrollTop:获取或设置一个元素的内容垂直滚动的像素数
  detailRef.value.scrollTo({
    top: distance,
    behavior: "smooth", //让滚动有平滑的效果
  });
  ```

  

* 滚动到对应位置,tab标题高亮

  * 监听滚动的位置scrollTop
  * 利用scrollTop匹配正确的位置

  ```js
  [描述300,设施400,房东600,评论900,须知1100,周边1400]
  [300,400,600,900,1100,1400]
  滚动到500时,在400和600之间,tab显示到400处
  ```

  

## keep-alive

* 在进行路由切换时,会将原来的页面删除掉,然后显示切换后的页面

* 再切换回来后,原来页面的所有代码都要全部重新执行,网络请求也会重新发送一次

  ```js
  homeStore.fetchHotSugger();
  homeStore.fetchCategories();
  homeStore.fetchHouseList();
  ```

* 又因为store是全局的对象,是有保留下来的,里面的currentPage记录的是第几页,到时候网络请求的时候会将其+1 `this.currentPage++`

* **将首页keep-alive** (一般首页是需要设置keep-alive的)

  ```vue
  //App.vue 写法一: Vue Router warn,不建议这样写了
  <template>
  <div class="app">
     <keep-alive include="home">
       <router-view></router-view>
     </keep-alive>
     <tar-bar v-if="!route.meta.currentShow" />
  </div>
  </tamplate>
  
  //App.vue 写法二:
  <tamplate>
     <router-view v-slot="props">
       <keep-alive include="home">
         <component :is="props.Component" />
       </keep-alive>
     </router-view>
     <tar-bar v-if="!route.meta.currentShow" />
  </tamplate>
  
  
  //home.vue
  <script>
  export default {
    name: "home",
  };
  </script>
  ```

* 但是当home切换到favor是,会多一次houselist的网络请求

  * 这是因为在滚动时有判断,滚动到底部时,发送一次homeStore.fetchHouseList()的网络请求
  * home是window滚动,favor都没有折磨长,window默认触发到了底部
  * 所以home不要使用window滚动,改使用div盒子滚动



## 跳转回home页面时,保留scrollTop的位置

* 具体代码

  ```js
  onActivated(() => {
    homeRef.value?.scrollTo({
      top: scrollTop.value, //scrollTop是之前保存到的值
    });
  });
  ```

  

## 视口设置px-->vw

* 具体操作 --> **vantUI有说明**

  ```js
  // npm install postcss-px-to-viewport -D
  // 新建一个postcss.config.js文件
  module.exports = {
    plugins: {
      "postcss-px-to-viewport": {
        viewportWidth: 375,
      },
    },
  };
  ```

  