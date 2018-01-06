// 引用模板
import Vue from 'vue';
import Router from 'vue-router';
import App from './components/VueApp.vue';
import ShareApp from './components/VueShareApp.vue';
Vue.use(Router);
export default new Router({
    routes:[
        {
            path:'/',
            component:ShareApp
        },
        {
            path:'/about',
            component:App
        }
    ]
})