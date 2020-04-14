<template>
  <div id="app">
    <div>
    <router-link to="/about"> About |</router-link>
    <router-link to="/canvas"> Canvas |</router-link>
    <router-link to="/converter"> Converter </router-link>
    </div>
    <!-- <img src="./assets/logo.png"> -->

    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
