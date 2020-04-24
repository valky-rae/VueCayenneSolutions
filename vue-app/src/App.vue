<template>
  <div id="app">
    <Slide noOverlay class="nav">
    <font-awesome-icon class="nav" icon="home" />
    <span>
      <font-awesome-icon class="nav" icon="info-circle"/>
      <router-link class="nav" to="/about"> About</router-link>
    </span>
    <span>
      <font-awesome-icon class="nav" icon="pencil-alt" />
      <router-link class="nav" to="/canvas"> Canvas</router-link>
    </span>
    <span>
      <font-awesome-icon class="nav" icon="arrow-alt-circle-right" />
      <router-link class="nav" to="/converter"> Converter</router-link>
    </span>
    </Slide>
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
import { Slide } from 'vue-burger-menu'

export default {
  components: {
    Slide
  }
}
</script>

<style>
#app {
  font-family: 'PT Mono', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  margin-left: 5%;
  margin-right: 5%;
}
.nav {
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  color: white;
}
a {
    font-weight: bold;
    text-decoration:  none;
    padding-top: 50px;
    text-align: bottom;
  }
svg{
  padding-bottom: 100px;
}
.bm-menu {
  height: 100%; /* 100% Full-height */
  width: 0; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  z-index: 1000; /* Stay on top */
  top: 0;
  left: 0;
  background-color: black; /* Black*/
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 60px; /* Place content 60px from the top */
  transition: 0.5s; /*0.5 second transition effect to slide in the sidenav*/
}
.bm-burger-bars {
  background-color: white;
}
</style>
