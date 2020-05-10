<template>
<transition name="component-fade" mce="in-out" appear>
    <div>
        <div class="typewriter">
            <h1>Cayenne Converter </h1>
        </div>
        <div>
          <span class="form-control">
            <input class="inputs" type="text" v-model="regex">
            <input class="inputs" type="text" v-model="inputStr" v-on:keyup="split()">
                <button v-on:click="convert()"> CONVERT </button>
                <!-- <button v-on:click="printStuff()"> print Stuff  </button> -->
                <button v-on:click="myTest()"> My Test  </button>
                <button class="buttonGradient" v-on:click="DFATrace()"> TRACE </button>
            <p class="hint"> Enter Regex Here</p>
            <p>Message is: {{ regex }}</p>
            <span v-for="(char, index) in splitStr" v-bind:key="char">
              <p id="this" class="bouncey"> {{char}} </p>
              <p> {{index}} </p>
            </span>
          </span>
        </div>
        <div id="graph" class="prettygraph" style="text-align: center;"></div>
        <Carousel>
        </Carousel>
    </div>
</transition>
</template>
<script>
import * as d3Graphviz from 'd3-graphviz'
import * as d3 from 'd3'
import Carousel from '../views/Carousel'
// import * as d3 from 'd3-graphviz'
export default {
  data: function () {
    return {
      regex: '101',
      fsm: 'empty fsm',
      dotscript: 'empty ds',
      myDotscript: 'I am EMPTY',
      inputStr: '10',
      splitStr: ['1']
    }
  },
  components: {
    Carousel
  },
  methods: {
    myTest: function () {
      // test 1
      d3.select('body').style('color', function (d, i) {
        return 'pink'
      })
      console.log('pink')
      // test 2
      // let t = d3Graphviz.transition()
      //   .duration(750)
      //   .ease(d3.easeLinear)
      // console.log(t)
      // d3Graphviz.graphviz('#graph')
      // .transition(t)
      // .renderDot('digraph {a -> b}')
      // test 3
      d3Graphviz.graphviz('#graph').style('color', function (d, i) {
        return 'pink'
      })
    },
    split: function () {
      let timeout = setTimeout(() => {
        this.splitStr = this.inputStr.split('')
        console.log(this.splitStr)
      }, 1000)
      console.log(timeout)
    },
    printStuff: function () {
      console.log(this.inputStr)
      console.log(this.splitStr)
    },
    render: function (dotscript) {
      d3Graphviz.graphviz('#graph').renderDot(dotscript)
    },
    convert: function () {
      let regParser = require('automata.js')
      let parser = new regParser.RegParser(this.regex)
      this.fsm = parser.parseToDFA()
      this.dotscript = this.fsm.toDotScript()
      this.render(this.defineMyDotscipt())
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
    },
    DFATrace: function () {
      let myDiagraph = this.myDotscript
      let inputstr = '101'
      let arrayDiagraph = myDiagraph.split(/\r?\n/)
      let arrayInput = Array.from(inputstr)
      let currNode = '0'
      let time = 0

      // for each char in the input string
      for (let x = 0; x < arrayInput.length; x++) {
        // define checkers
        let str1 = 'label=' + '"' + arrayInput[x] + '"'
        let str2 = currNode + '->'
        // for each element of the diagraph DO CHECK
        for (let z = 0; z < arrayDiagraph.length; z++) {
          if (arrayDiagraph[z].includes(str1) && arrayDiagraph[z].includes(str2)) {
            let nodeLine = parseInt(currNode) + 2
            arrayDiagraph[nodeLine] = arrayDiagraph[nodeLine].replace('blue', 'black')
            // CHANGE PREV NODE
            console.log('PREV NODE' + arrayDiagraph[nodeLine])
            let renderChange = arrayDiagraph.join('\n')
            time += 0
            setTimeout(this.render, time, renderChange)
            arrayDiagraph[z] = arrayDiagraph[z].replace('black', 'blue')
            // CHANGE ARROW
            console.log('ARROW' + arrayDiagraph[z])
            // timer
            renderChange = arrayDiagraph.join('\n')
            time += 500
            setTimeout(this.render, time, renderChange)
            // render(renderChange)
            let tempSplit = Array.from(arrayDiagraph[z])
            currNode = parseInt(tempSplit[7])
            // update curr node
            nodeLine = currNode + 2
            arrayDiagraph[nodeLine] = arrayDiagraph[nodeLine].replace('black', 'blue')
            // CHANGE THIS NODE
            console.log('THIS NODE' + arrayDiagraph[nodeLine])
            // timer
            renderChange = arrayDiagraph.join('\n')
            time += 500
            setTimeout(this.render, time, renderChange)
            arrayDiagraph[z] = arrayDiagraph[z].replace('blue', 'black')
            // CHANGE ARROW
            console.log('After ARROW' + arrayDiagraph[z])
            renderChange = arrayDiagraph.join('\n')
            time += 1000
            setTimeout(this.render, time, renderChange)
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.bouncey{
  animation: none;
}
.bouncey:nth-child(1){
   animation: bounce;
   animation-duration: 2s;
   animation-iteration-count: infinite;
}
.form-control {
    margin-top: 40px;
    display: inline-block;
    width: 98%;
    padding: 10px;
    color:#75a1d0;
    background-color: transparent;
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
    color: #386890;
}
.prettygraph{
    display: block;
    height: 400px;
    width: 100%;
    background-color: white ;
    border: 2px solid aliceblue;
    border-radius: 5px;
    margin-top: 2%;
}
.prev{
  color: white;
  background: white
}
</style>
