<template>
  <div id="app" class="typewriter">
    <transition name="slide-fade" mce="in-out" appear>
    <div id="overlay" @click="show = !show" v-if="show">
      <h1 id="text">Welcome</h1>
    </div>
    </transition>
    <Login></Login>
    <Slide noOverlay class="nav">
      <span @click="show1 = true" style="text-align:center">
        <router-link class="nav" to="/app"><img src="./assets/logo.png" alt="logo" style="width:70px;height:70px;"/></router-link>
      </span>
      <span @click="show1 = false">
        <font-awesome-icon class="icons" icon="circle-notch" />
        <router-link class="nav" to="/about">About</router-link>
      </span>
      <span @click="show1 = false">
        <font-awesome-icon class="icons" icon="circle-notch" />
        <router-link class="nav" to="/canvas">Canvas</router-link>
      </span>
      <span @click="show1 = false">
        <font-awesome-icon class="icons" icon="circle-notch" />
        <router-link class="nav" to="/converter">Converter</router-link>
      </span>
      <span @click="show1 = false">
        <font-awesome-icon class="icons" icon="circle-notch" />
        <router-link class="nav" to="/Ack">Acknowledgements</router-link>
      </span>
    </Slide>
    <router-view />
    <div v-if="show1">
      <h1>Welcome</h1>
      <br />
      <h2>How to Use</h2>
      <br />
      <div class="prettygraph">
        The Cayenne Converter aims to create a calm and productive atmosphere to promote a better understanding of Finite State Machines.
        The two learning features are the Canvas and the Converter. The canvas page allows you to create your own Finite State Machine using
        the button menu on the left-hand side. The buttons in order from top to bottom:
        <ol>
          <li>Start - press this to draw a simple base diagram on to the screen.</li>
          <li>
            Add State - select the state on the screen you wish to add the new state on to and then click this button.
            A state is selected when it's colour changes to blue.
          </li>
          <li>
            Add Accept State - select the state on the screen you wish to add the new accept state on to and then click this button.
            A state is selected when it's colour changes to blue.
          </li>
          <li>Add arrow - press this button then select the two states you wish to join via arrow.</li>
          <li>Delete - select either a state or arrow you no longer need then press this button.</li>
          <li>Save - press this button to save the diagram as an image.</li>
        </ol>
        The converter page allows you to enter a regular expression and an optimal diagram will be produced after this
        you can enter a string to trace through the diagram and see if it will be accepted.
        The navigation in order from top to bottom:
        <ol>
          <li>Regular Expression Input box - input the regular expression to create a diagram.</li>
          <li>Convert to DFA button - will produce a Deterministic Finite Automaton based on the entered regular expression.</li>
          <li>Convert to NFA button - will produce a Non-Deterministic Finite Automaton based on the entered regular expression.</li>
          <li>String Input box - input a string to determine if it is accepted by the machine.</li>
          <li>Trace Through DFA - Use this button if you chose to make a DFA diagram to determine if the string is accepted by the DFA and shows a tracing animation.</li>
          <li>Trace Through NFA - Use this button if you chose to make a NFA diagram to determine if the string is accepted by the NFA and shows a tracing animation.</li>
        </ol>
        </div>
      </div>
  </div>
</template>

<script>
import { Slide } from 'vue-burger-menu'
import Login from '../src/views/Login'

export default {
  components: {
    Slide,
    Login
  },
  data () {
    return {
      show: true,
      show1: true
    }
  },
  methods: {
    off () {
      document.getElementById('overlay').style.display = 'none'
    }
  }
}
</script>

<style>
#app {
  font-family: "K2D", sans-serif;
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
  color: #36648b;
}
.icons {
  color: #36648b;
  padding-top: 14px;
  font-size: 20px;
  text-shadow: 2px 2px white;
}
a {
  font-weight: bold;
  text-decoration: none;
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
  background-color: #36648b;
}
.bm-item-list span:hover {
  animation: pulse;
  animation-duration: 2s;
}
/* TYPEWRITER ANIMATION */
.typewriter h1 {
  font-family: "Chonburi", cursive;
  color: #75a1d0;
  font-size: 70px;
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: 0.1em solid #36648b; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: 0.1em; /* Adjust as needed */
  animation: typing 3.5s steps(30, end), blink-caret 0.5s step-end;
}
/* The typing effect */
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
/* BUTTON ANIMATIONS */
*:focus {
  outline: none;
}
button {
  font-family: "K2D", sans-serif;
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
.component-fade-enter-active {
  animation: fadeInUp;
  animation-duration: 4s;
  /* animation-delay: 2s; */
  animation-iteration-count: 1;
}

#overlay {
  position: fixed;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("https://images.hdqwalls.com/download/minimalist-blue-mountains-8k-2x-1920x1080.jpg");
  background-color: rgba(29, 80, 119, 0.9);
  z-index: 2;
  cursor: pointer;
}

#text {
  background-color: white;
  color: black;
  font-size: 8vw;
  font-weight: bold;
  margin: 0 auto;
  padding: 10px;
  width: 50%;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  mix-blend-mode: screen;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.prettygraph {
  display: block;
  background-color: white;
  border: 2px solid aliceblue;
  border-radius: 5px;
  text-align: left;
}
</style>
