<template>
  <transition name="fade" mce="in-out" appear>
    <div class="typewriter">
      <div id="overlay" v-on:click="off()">
        <h1 id="text">Welcome</h1>
      </div>
      <h1>Welome</h1>
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
  </transition>
</template>

<script>
export default {
  methods: {
    apply: function () {
      var d = document.getElementById('header')
      d.className += 'animated infinite bounce'
    },
    off () {
      document.getElementById('overlay').style.display = 'none'
    }
  }
}
</script>

<style scoped>
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

.prettygraph {
  display: block;
  background-color: white;
  border: 2px solid aliceblue;
  border-radius: 5px;
  text-align: left;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
