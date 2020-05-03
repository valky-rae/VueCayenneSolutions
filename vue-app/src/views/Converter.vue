<template>
    <div>
        <div class="typewriter">
            <h1>Cayenne Converter </h1>
        </div>
        <div>
          <span class="form-control">
            <input class="inputs" type="text" v-model="regex">
                <button v-on:click="simple()"> Simple Display </button>
                <button v-on:click="convert()"> Convert to DotScript </button>
            <p class="hint"> Enter Regex Here</p>
            <p>Message is: {{ regex }}</p>
          </span>
        </div>
        <div id="graph" class="prettygraph" style="text-align: center;"></div>
        <Carousel>
        </Carousel>
    </div>
</template>
<script>
import * as d3Graphviz from 'd3-graphviz'
import Carousel from '../views/Carousel'
// import * as d3 from 'd3-graphviz'
export default {
  data: function () {
    return {
      regex: '101',
      fsm: 'empty fsm',
      dotscript: 'empty ds',
      myDotscript: ''

    }
  },
  components: {
    Carousel
  },
  methods: {
    convert: function () {
      let regParser = require('automata.js')
      let parser = new regParser.RegParser(this.regex)
      this.fsm = parser.parseToDFA()
      this.dotscript = this.fsm.toDotScript()
      this.myDotscript = this.defineMyDotscipt()
      console.log(this.myDotscript)
      d3Graphviz.graphviz('#graph').renderDot(this.myDotscript)
    },
    defineNodes: function () {
      let nodes = 'digraph finite_state_machine {\n    rankdir = LR;'
      for (var x = 0; x < this.fsm.numOfStates; x++) {
        if (this.fsm.acceptStates.includes(x.toString())) {
          nodes = nodes.concat('\n    node [shape=doublecircle color=black];' + x + ';')
        } else {
          nodes = nodes.concat('\n    node [shape=circle color=black];' + x + ';')
        }
      }
      nodes = nodes.concat('\n    node [shape = plaintext];')
      return nodes
    },
    defineTransitions: function (ds) {
      // Splits dotscipt into array of strings per line
      let transitions = ''
      let result = this.dotscript.split(/\r?\n/)
      result.forEach((element) => {
        if (element.includes('label')) {
          let index = element.indexOf(']')
          let str = element.substring(0, index) + ' color=black' + element.substring(index, element.length)
          transitions = transitions.concat('\n  ' + str)
        }
      })
      return transitions
    },
    defineMyDotscipt: function () {
      this.myDotscript = this.defineNodes() + this.defineTransitions() + '\n}'
      return this.myDotscript
    }
  }
}
</script>

<style scoped>
*:focus {
    outline: none;
}
.form-control {
    margin-top: 40px;
    display: inline-block;
    width: 98%;
    padding: 10px;
    color:#75a1d0;
    background-color: white;
    /* cursor: not-allowed; */
}
.inputs{
    font-size: 1.2em;
    line-height: 1.2em;
    border-color: #36648B;
    box-shadow: 3px 3px white;
    border-radius: 20px;
    padding:5px;
}
.hint{
    font-size: 0.9em;
    text-align: left;
    text-shadow: 2px 2px white;
    font-family: 'PT Mono';
    color: #386890;
}
.prettygraph{
    display: block;
    height: 400px;
    width: 100%;
    background-color: black;
    border: 2px solid aliceblue;
    border-radius: 5px;
    margin-top: 2%;
}
button {
    background-color: #386890;
    color: white;
    border: 0;
    border-radius: 20px;
    cursor: pointer;
    box-shadow: 2px 2px white;
    padding: 10px 15px 10px 15px;
    font-size: 20px;
    font-family: 'PT Mono';
}
/* DEMO-SPECIFIC STYLES */
.typewriter h1 {
  /* color: # */
  color: #75A1D0;
  font-size: 50px;
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: .15em solid #36648B; /* The typwriter cursor */
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
.prev{
  color: white;
  background: white
}
button:hover {
background: linear-gradient(-45deg, #90b4d2, #4682b4,#36648B);
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
