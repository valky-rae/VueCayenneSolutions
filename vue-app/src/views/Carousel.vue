<template>
    <div>
        <h1> THIS IS THE CAROUSEL COMPOMNET </h1>
        <button @click="addSlide">Add Slide</button>
        <button @click="removeSlide">Remove Slide</button>
        <carousel-3d :count="slides.length" :controls-visible="true" :clickable="false">
            <slide class="nfa" v-for="(slide, i) in slides" :index="i" v-bind:key="i">
            <h1>{{slide.name}}</h1>
            </slide>
        </carousel-3d>
    </div>
</template>

<script>
import { Carousel3d, Slide } from 'vue-carousel-3d'
export default {
  data: function () {
    return {
      regex: '101',
      fsm: 'empty fsm',
      dotscript: 'empty ds',
      slides: [{name: 'Slide name 1'}, {name: 'Slide name 2'}, {name: 'Slide name 7'}]
    }
  },
  components: {
    Carousel3d,
    Slide
  },
  methods: {
    simple: function () {
      alert('simple')
    },
    addSlide () {
      this.slides.push({
        name: 'Slide name X'
      })
    },
    removeSlide () {
      this.slides.pop()
    }
  }
}
</script>

<style scoped>
.nfa{
    background-color: pink;
}
</style>
