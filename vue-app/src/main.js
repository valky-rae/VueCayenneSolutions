// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import GoogleSignInButton from 'vue-google-signin-button-directive'

import Carousel3d from 'vue-carousel-3d'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faHome, faPencilAlt, faInfoCircle, faDotCircle, faArrowAltCircleRight, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)
library.add(faHome)
library.add(faPencilAlt)
library.add(faInfoCircle)
library.add(faArrowAltCircleRight)
library.add(faCircleNotch)
library.add(faDotCircle)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Carousel3d)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App, GoogleSignInButton },
  template: '<App/>'
})
