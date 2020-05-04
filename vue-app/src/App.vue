<template>
  <div id="app">
    <Slide noOverlay class="nav">
      <span>
        <font-awesome-icon class="icons" icon="circle-notch"/>
        <router-link class="nav" to="/about"> About</router-link>
      </span>
      <span>
        <font-awesome-icon class="icons" icon="circle-notch"/>
        <router-link class="nav" to="/canvas"> Canvas</router-link>
      </span>
      <span>
        <font-awesome-icon class="icons" icon="circle-notch"/>
        <router-link class="nav" to="/converter"> Converter</router-link>
      </span>
    </Slide>
    <!-- <img src="./assets/logo.png"> -->
    <!-- <Login></Login> -->
    <router-view/>
  </div>
</template>

<script>
import { Slide } from 'vue-burger-menu'
import Login from '../src/views/Login'

export default {
  components: {
    Slide, Login
  }
}
</script>

<style>
#app {
  /* font-family: 'Cinzel Decorative', cursive; */
  /* font-family: 'Poppins', sans-serif; */
  /* font-family: 'Comfortaa', cursive; */
  font-family: 'Lora', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  margin-left: 10%;
  margin-right: 10%;
  /* background-repeat: no-repeat; */
  /* background-image: url("https://image.freepik.com/free-vector/black-background-with-gradient-neon-glitter-geometric-shape_8306-301.jpg"); */
  /* background-image: url("https://wallpapersmug.com/download/3840x2400/95afc8/dark-night-river-forest-minimal-art.jpg"); */
  /* background-position: cover; */
}
.nav {
  text-align: center;
  padding: 7px;
  font-size: 25px;
  font-weight: bold;
  color: #36648B;
  /* text-shadow: 1px 1px white; */
}
.icons{
  color: #36648B;
  padding-top: 12px;
  font-size: 20px;
  text-shadow: 2px 2px white;
}
a {
    font-weight: bold;
    text-decoration:  none;
  }
.bm-menu {
  height: 100%;
  width: 0;
  position: fixed; /* Stay in place */
  z-index: 1000; /* Stay on top */
  top: 0;
  left: 0;
  background-color: white; /* Black*/
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 60px; /* Place content 60px from the top */
  transition: 0.5s; /*0.5 second transition effect to slide in the sidenav*/
}
.bm-burger-bars {
  /* background-color: #9FB6CD; */
  background-color: #36648B;
}
</style>
