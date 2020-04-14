import Vue from 'vue'
import Router from 'vue-router'
import About from '@/views/About'
import Canvas from '@/views/Canvas'
import Converter from '@/views/Converter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/canvas',
      name: 'Canvas',
      component: Canvas
    },
    {
      path: '/converter',
      name: 'Converter',
      component: Converter
    }
  ]
})
