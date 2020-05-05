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
      <span>
        <font-awesome-icon class="icons" icon="circle-notch"/>
        <router-link class="nav" to="/kyle"> Kyle</router-link>
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
  font-family: 'K2D', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  margin-left: 10%;
  margin-right: 10%;
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
  padding-top: 14px;
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
  background-color: #36648B;
}

/* TYPEWRITER ANIMATION */
.typewriter h1 {
  font-family: 'Chonburi', cursive;
  color: #75A1D0;
  font-size: 70px;
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: .1em solid #36648B; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: .1em; /* Adjust as needed */
  animation:
    typing 3.5s steps(30, end),
    blink-caret .5s step-end;
}
/* The typing effect */
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}
/* BUTTON ANIMATIONS */
*:focus {
    outline: none;
}
button {
  font-family: 'K2D', sans-serif;
  background-color: transparent;
  color: black;
  border: 0;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 3px 3px white;
  padding: 10px 15px 10px 15px;
  font-size: 18px;
}
button:hover {
background: linear-gradient(-90deg, #ffffff, #bad0e7);
/* 90b4d2 */
background-size: 400% 400%;
animation: gradient 5s ease infinite;
}
@keyframes gradient {
0% {
background-position: 0% 50%;
}
50% {
background-position: 100% 50%;
}
100% {
background-position: 0% 50%;
}
}
</style>
