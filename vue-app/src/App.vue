<template>
  <div id="app">
    <Slide class="nav">
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.nav {
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  color: white;
}
a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration:  none;
    padding-top: 50px;
    text-align: bottom;
  }
svg{
  padding-bottom: 100px;
}
</style>
