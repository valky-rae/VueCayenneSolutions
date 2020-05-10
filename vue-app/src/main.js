// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import App from './App'
import router from './router'
import GoogleSignInButton from 'vue-google-signin-button-directive'

import Carousel3d from 'vue-carousel-3d'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCircleNotch)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Carousel3d)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    xChild: 0,
     yChild: 0,
     xParent: 0,
     yParent: 0,
     hover: false,
     hideCursor: true
 },
 computed: {
   cursorCircle() {
     return `transform: translateX(${this.xParent}px) translateY(${this.yParent}px) translateZ(0) translate3d(0, 0, 0);`
   },
   cursorPoint() {
     return `transform: translateX(${this.xChild - 3}px) translateY(${this.yChild - 3}px) translateZ(0) translate3d(0, 0, 0);`
   }
 },
 methods: {
   moveCursor(e) {
     this.xChild = e.clientX;
     this.yChild = e.clientY;
     setTimeout(() => {
       this.xParent = e.clientX - 15;
       this.yParent = e.clientY - 15;
     }, 100);
   }
 },
 mounted() {
   document.addEventListener("mousemove", this.moveCursor);
   document.addEventListener('mouseleave', e => {
     this.hideCursor = true;
   });
   document.addEventListener('mouseenter', e => {
     this.hideCursor = false;
   });
   
 },
  router,
  components: { App, GoogleSignInButton },
  template: '<App/>'
})
