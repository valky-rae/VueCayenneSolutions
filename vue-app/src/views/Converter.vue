<template>
    <div>
        <div class="typewriter">
            <h1>Cayenne Converter </h1>
        </div>
        <div>
          <span class="form-control">
            <input class="inputs" type="text" v-model="regex">
            <input class="inputs" type="text" v-model="inputStr" v-on:keyup="split2()">
                <button v-on:click="convert()"> CONVERT </button>
                <button v-on:click="buildDiagraph()"> Build It  </button>
                <button v-on:click="myTest()"> My Test  </button>
                <button class="buttonGradient" v-on:click="DFATrace3()"> TRACE </button>
            <p class="hint"> Enter Regex Here</p>
            <p>Message is: {{ regex }}</p>
            <span v-for="(char) in splitStr" v-bind:key="char">
              <p id="this" v-bind:class = "{bouncey: char.isactive}"> {{char.char}} </p>
            </span>
          </span>
        </div>
        <div id="graph" class="prettygraph" style="text-align: center;"></div>
        <Carousel>
        </Carousel>
    </div>
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
      inputStr: '',
      splitStr: [ ]
    }
  },
  components: {
    Carousel
  },
  methods: {
    myTest: function () {
      console.log(d3Graphviz.graphviz('#graph'))
    },
    split2: function () {
      let timeout = setTimeout(() => {
        while (this.splitStr.length > 0) {
          this.splitStr.pop()
        }
        for (let z = 0; z < this.inputStr.length; z++) {
          let temp = {
            'isactive': false,
            'char': this.inputStr[z]
          }
          this.splitStr.push(temp)
        }
      }, 1000)
      console.log(timeout)
      console.log(this.inputStr)
      console.log(this.splitStr)
    },
    printStuff: function () {
      let array = this.fsm.transitions[0][1]
      console.log(array)

      // console.log(this.fsm)
      // console.log(this.splitStr)
    },
    render: function (dotscript) {
      // let t = d3.transition()
      //   .duration(4000)
      //   .ease(d3.easeLinear)
      // console.log(t)
      // METHOD 1 RENDER
      d3Graphviz.graphviz('#graph')
        // .transition(t)
        .attributer(function (d) {
        })
        .renderDot(dotscript)
      // METHOD 2 RENDER
      // d3.select('#graph').graphviz()
      //   .attributer(function (d) {
      //     if (d.tag === 'path') {
      //       d3.select(this)
      //       console.log(d)
      //     }
      //   })
      //   .transition(t)
      //   .renderDot(this.myDotscript)
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
    },
    pulseUp: function (key, dotscript) {
      console.log('in pulse up key is' + key)
      // d3Graphviz.graphviz('#graph')
      d3.select('#graph').graphviz()
        .attributer(function (d) {
          if (d.tag === 'ellipse') {
            d3.select(this)
            if (d.parent.attributes.id === key) {
              console.log('FOUND KEY NODE')
              d.attributes.fill = '#75a1d0'
              d.attributes.rx = 23
              d.attributes.ry = 23
            } else if (d.attributes.rx !== '22') {
              d.attributes.fill = 'white'
              d.attributes.rx = '18'
              d.attributes.ry = '18'
            }
          }
        })
        .renderDot(dotscript)
    },
    pulseDown: function (key, dotscript) {
      console.log('in pulse down')
      d3Graphviz.graphviz('#graph')
      // .transition(t)
        .attributer(function (d) {
          if (d.tag === 'ellipse') {
            d3.select(this)
            if (d.attributes.rx !== '22') {
              d.attributes.fill = 'white'
              d.attributes.rx = '18'
              d.attributes.ry = '18'
            }
          }
        })
        .renderDot(dotscript)
    },
    getKey: function (currNode) {
      let num = currNode + 1
      let key = 'node' + num.toString()
      console.log('CURRNODE KEY>> ' + currNode + ' is ' + key)
      return key
    },
    highlightNode: function (node, time, dotscipt) {
      let key = this.getKey(node)
      time += 1000
      setTimeout(this.pulseUp, time, key)
      time += 3000
      setTimeout(this.pulseDown, time, key, dotscipt)
    },
    DFATrace2: function () {
      let arrayDiagraph = this.myDotscript.split(/\r?\n/)
      let currNode = '0'
      let time = 0
      // for each char in the input string
      console.log(this.splitStr.length)
      for (let x = 0; x < this.splitStr.length; x++) {
        // define checkers
        this.splitStr[x].isactive = true
        let str1 = 'label=' + '"' + this.splitStr[x].char + '"'
        let str2 = currNode + '->'
        // for each element of the diagraph DO CHECK
        for (let z = 0; z < this.fsm.numOfStates; z++) {
          if (this.fsm.transitions[currNode][z] === this.splitStr[x].char) {
            // HIHGLIGH ARROW
            arrayDiagraph = this.highlightArrow(arrayDiagraph, str1, str2)
            let renderChange = arrayDiagraph.join('\n')
            time += 1000
            setTimeout(this.render, time, renderChange)
            // HIGHLIGHT NODE
            // this.highlightNode(z, time, renderChange)
            let key = this.getKey(z)
            time += 1000
            setTimeout(this.pulseUp, time, key, renderChange)
            // transition fucntion that pulses node
            currNode = z
            // UNHIGHLIGHT ARROW
            arrayDiagraph = this.unhighlightArrow(arrayDiagraph, str1, str2)
            renderChange = arrayDiagraph.join('\n')
            time += 1000
            setTimeout(this.render, time, renderChange)
            // pulse down
            time += 1000
            setTimeout(this.pulseDown, time, key, renderChange)
          }
        }
        this.splitStr[x].isactive = false
      }
    },
    DFATrace3: function () {
      let arrayDiagraph = this.myDotscript.split(/\r?\n/)
      let currNode = 0
      let nextNode = 0
      let time = 0
      // for each char in the input string
      // console.log(this.splitStr.length)
      for (let x = 0; x < this.splitStr.length; x++) {
        // define checkers
        this.splitStr[x].isactive = true
        let str1 = 'label=' + '"' + this.splitStr[x].char + '"'
        let str2 = currNode + '->'
        console.log('CHECKING' + str1 + str2)
        // for each element of the diagraph DO CHECK
        for (let z = 0; z < this.fsm.numOfStates; z++) {
          if (this.fsm.transitions[currNode][z] === this.splitStr[x].char) {
            nextNode = z
          }
        }
        // HIHGLIGH ARROW
        arrayDiagraph = this.highlightArrow(arrayDiagraph, str1, str2)
        let renderChange = arrayDiagraph.join('\n')
        time += 1000
        setTimeout(this.render, time, renderChange)
        // HIGHLIGHT NODE
        // this.highlightNode(z, time, renderChange)
        let key = this.getKey(nextNode)
        time += 1000
        setTimeout(this.pulseUp, time, key, renderChange)
        // transition fucntion that pulses node
        currNode = nextNode
        // UNHIGHLIGHT ARROW
        arrayDiagraph = this.unhighlightArrow(arrayDiagraph, str1, str2)
        renderChange = arrayDiagraph.join('\n')
        time += 1000
        setTimeout(this.render, time, renderChange)
        // pulse down
        time += 1000
        setTimeout(this.pulseDown, time, key, renderChange)
        this.splitStr[x].isactive = false
      }
    },
    highlightArrow: function (array, str1, str2) {
      let x = 0
      while (x < array.length) {
        if (array[x].includes(str1) && array[x].includes(str2)) {
          array[x] = array[x].replace('black', 'blue')
        }
        x++
      }
      return array
    },
    unhighlightArrow: function (array, str1, str2) {
      let x = 0
      while (x < array.length) {
        if (array[x].includes(str1) && array[x].includes(str2)) {
          array[x] = array[x].replace('blue', 'black')
        }
        x++
      }
      return array
    },
    buildDiagraph: function () {
      let regParser = require('automata.js')
      let parser = new regParser.RegParser(this.regex)
      this.fsm = parser.parseToDFA()
      this.dotscript = this.fsm.toDotScript()
      // this.render(this.defineMyDotscipt())
      // wow
      this.myDotscript = this.defineNodes() + this.defineTransitions() + '\n}'

      let renderChange = this.defineNodes() + '\n}'
      this.render(renderChange)
      // return this.myDotscript
      // wow
      // let arrayDotscript = []
      // wow
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
    /* background-color: transparent; */
    border: 2px solid aliceblue;
    border-radius: 5px;
    margin-top: 2%;
}
.prev{
  color: white;
  background: white
}
</style>
