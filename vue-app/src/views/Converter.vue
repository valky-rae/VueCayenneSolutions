<template>
<transition name="component-fade" mce="in-out" appear>
    <div>
        <div class="typewriter">
            <h1>Cayenne Converter </h1>
        </div>
        <div>
        <span style="display:flex">
          <div class="icon-bar">
            <input placeholder="Enter REGEX" class="inputs" type="text" v-model="regex" v-on:keyup="clearPath()">
              <button v-on:click="convertDFA()"> DFA </button>
              <button v-on:click="convertNFA()"> NFA </button>
            <input placeholder="Enter String" class="inputs" type="text" v-model="inputStr" v-on:keyup="split2(), clearPath()">
              <button class="buttonGradient" v-on:click="trace(), clearPath()"> TRACE </button>
              <button class="buttonGradient" v-on:click="print(), clearPath()"> print </button>
          </div>
          <div id="graph" class="prettygraph" style="text-align: center;" v-on:click.capture="onNodeClick()"></div>
         </span>
        </div>
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
      inputStr: '',
      splitStr: [ ],
      digraphArray: [],
      allPaths: [],
      yesPaths: []
    }
  },
  components: {
    Carousel
  },
  methods: {
    clearPath: function () {
      while (this.allPaths.length > 0) {
        this.allPaths.pop()
      }
      while (this.yesPaths.length > 0) {
        this.yesPaths.pop()
      }
      this.allPaths.push('0')
    },
    print: function () {
      console.log(this.fsm)
      console.log(this.myDotscript)
      this.allPaths.forEach(function (item) {
        console.log(item)
      })
      console.log('YES PATHS')
      this.yesPaths.forEach(function (item) {
        console.log(item)
      })
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
    render: function (dotscript) {
      d3Graphviz.graphviz('#graph')
        // .transition(t)
        .attributer(function (d) {

        })
        .renderDot(dotscript)
    },
    renderT: function (dotscript) {
      let t = d3.transition()
        .duration(1500)
        .ease(d3.easeLinear)
      d3Graphviz.graphviz('#graph')
        .transition(t)
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
    convertDFA: function () {
      let regParser = require('automata.js')
      let parser = new regParser.RegParser(this.regex)
      this.fsm = parser.parseToDFA()
      this.dotscript = this.fsm.toDotScript()
      this.myDotscript = this.defineMyDotscipt()
      this.render(this.myDotscript)
      // this.buildDigraphArray()
    },
    convertNFA: function () {
      let regParser = require('automata.js')
      let parser = new regParser.RegParser(this.regex)
      this.fsm = parser.parseToNFA()
      this.dotscript = this.fsm.toDotScript()
      this.myDotscript = this.defineMyDotscipt()
      this.render(this.myDotscript)
      // this.buildDigraphArray()
    },
    buildDigraphArray: function () {
      let digraphArray = []
      let endStr = '\n}'
      let transitions = this.defineTransitions()
      transitions = transitions.split(/\r?\n/)
      let dots = this.defineNodes() + '\n' + transitions[1] + endStr
      transitions.shift()
      transitions.shift()
      digraphArray.push(dots)
      dots = dots.split(/\r?\n/)
      for (let x = 0; x < this.fsm.numOfStates; x++) {
        dots.pop()
        let str1 = x + '->'
        let tempTransitions = transitions.filter(item => item.includes(str1))
        transitions = transitions.filter(item => !item.includes(str1))
        for (let y = 0; y < tempTransitions.length; y++) {
          dots.push(tempTransitions[y])
        }
        dots.push('}')
        let tempDigraph = dots.join('\n')
        digraphArray.push(tempDigraph)
      }
      this.digraphArray = digraphArray
      let time = 1000
      for (let z = 0; z < this.digraphArray.length; z++) {
        setTimeout(this.renderT, time, digraphArray[z])
        time += 2000
      }
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
    pulseUp: function (key, dotscript) {
      console.log('in pulse up key is' + key)
      let t = d3.transition()
        .duration(500)
        .ease(d3.easeLinear)
      d3.select('#graph').graphviz()
        .transition(t)
        .attributer(function (d) {
          if (d.tag === 'ellipse') {
            d3.select(this)
            if (d.parent.attributes.id === key) {
              console.log('FOUND KEY NODE')
              d.attributes.fill = 'dodgerblue'
              d.attributes.rx = 23
              d.attributes.ry = 23
            } else if (d.attributes.rx !== '22') {
              d.attributes.fill = 'white'
              d.attributes.rx = '18'
              d.attributes.ry = '18'
            }
          }
          if (d.tag === 'text') {
            d3.select(this)
            if (d.parent.attributes.id === key) {
              d.attributes.fill = 'white'
            }
          }
        })
        .renderDot(dotscript)
    },
    pulseDown: function (key, dotscript) {
      console.log('in pulse down')
      let t = d3.transition()
        .duration(500)
        .ease(d3.easeLinear)
      d3Graphviz.graphviz('#graph')
        .transition(t)
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
      let num = parseInt(currNode) + 1
      let key = 'node' + num.toString()
      console.log('CURRNODE KEY>> ' + currNode + ' is ' + key)
      return key
    },
    activateInputStr: function (x) {
      // this.splitStr.forEach(function (item) {
      //   item.isactive = false
      // })
      this.splitStr[x].isactive = true
    },
    DFATrace4: function () {
      let arrayDiagraph = this.myDotscript.split(/\r?\n/)
      let currNode = 0
      let nextNode = 0
      let time = 0
      // let activate = 0
      arrayDiagraph = this.highlightArrow(arrayDiagraph, 'start', '->')
      let renderChange = arrayDiagraph.join('\n')
      this.render(renderChange)
      // this.startDFATrace()
      this.pulseUp('node1', renderChange)
      arrayDiagraph = this.unhighlightArrow(arrayDiagraph, 'start', '->')
      renderChange = arrayDiagraph.join('\n')
      time += 1500
      setTimeout(this.render, time, renderChange)
      setTimeout(this.pulseDown, 1000, 'node1', renderChange)
      // for each char in the input string
      for (let x = 0; x < this.splitStr.length; x++) {
        let str1 = 'label=' + '"' + this.splitStr[x].char + '"'
        let str2 = currNode + '->'
        console.log('CHECKING' + str1 + str2)
        // for each element of the diagraph DO CHECK
        for (let z = 0; z < this.fsm.numOfStates; z++) {
          if (this.fsm.transitions[currNode][z] === this.splitStr[x].char) {
            nextNode = z
            break
          } else {
            nextNode = null
          }
        }
        if (nextNode === null && x < this.splitStr.length) {
          this.failTrace()
          return
        }
        // HIHGLIGH ARROW
        arrayDiagraph = this.highlightArrow(arrayDiagraph, str1, str2)
        renderChange = arrayDiagraph.join('\n')
        time += 500
        setTimeout(this.render, time, renderChange)
        // HIGHLIGHT NODE
        let key = this.getKey(nextNode)
        time += 250
        setTimeout(this.pulseUp, time, key, renderChange)
        // transition fucntion that pulses node
        currNode = nextNode
        // UNHIGHLIGHT ARROW
        arrayDiagraph = this.unhighlightArrow(arrayDiagraph, str1, str2)
        renderChange = arrayDiagraph.join('\n')
        time += 1000
        setTimeout(this.render, time, renderChange)
        setTimeout(this.pulseDown, time, key, renderChange)
      }
      this.successTrace()
    },
    highlightArrow: function (array, str1, str2) {
      let x = 0
      while (x < array.length) {
        if (array[x].includes(str1) && array[x].includes(str2)) {
          array[x] = array[x].replace('black', 'dodgerblue')
        }
        x++
      }
      return array
    },
    unhighlightArrow: function (array, str1, str2) {
      let x = 0
      while (x < array.length) {
        if (array[x].includes(str1) && array[x].includes(str2)) {
          array[x] = array[x].replace('dodgerblue', 'black')
        }
        x++
      }
      return array
    },
    failTrace: function () {
      // alert('YOU FAILED')
    },
    successTrace: function () {
      // alert('YOU PASSED')
    },
    findPaths: function (currNode, location, path) {
      console.log('FIND PATHS FUNCTION')
      if (this.inputStr.length === location || this.fsm.transitions[currNode] === undefined) {
        this.allPaths.push(path)
        let end = path.split('').reverse()[0]
        if (this.fsm.acceptStates.includes(end) && path.length >= this.inputStr.length && location >= this.inputStr.length) {
          this.yesPaths.push(path)
        }
      }
      if (this.fsm.transitions[currNode] !== undefined) {
        for (let x = 0; x < this.fsm.numOfStates; x++) {
          let newpath = path + x.toString()
          // IF REGULAR TRANSITION
          if (this.fsm.transitions[currNode][x] === this.inputStr[location] && this.fsm.transitions[currNode][x] !== undefined) {
            this.findPaths(x, location + 1, newpath)
          }
          // IF EPSALOM LABAL
          if (this.fsm.transitions[currNode][x] === 'ε' && this.fsm.transitions[currNode][x] !== undefined) {
            this.findPaths(x, location, newpath)
          }
        }
      }
    },
    trace: function () {
      if (this.inputStr.length === 0) {
        alert('Please enter an input string')
      } else if (this.fsm.type === 'NFA') {
        this.NFATrace()
      } else {
        this.DFATrace4()
      }
    },
    NFATrace: function () {
      console.log('NFA TRACING')
      this.findPaths(0, 0, 0)
      setTimeout(this.print(), 5000)
      if (this.yesPaths.length !== 0) {
        this.renderNFATrace(this.yesPaths[0])
      } else {
        this.renderNFATrace(this.allPaths[0])
      }
    },
    renderNFATrace: function (mypath) {
      let path = mypath.split('')
      let arrayDiagraph = this.myDotscript.split(/\r?\n/)
      let currNode = 0
      let nextNode = 0
      let time = 0
      // START TRACE
      arrayDiagraph = this.highlightArrow(arrayDiagraph, 'start', '->')
      let renderChange = arrayDiagraph.join('\n')
      this.render(renderChange)
      this.pulseUp('node1', renderChange)
      arrayDiagraph = this.unhighlightArrow(arrayDiagraph, 'start', '->')
      renderChange = arrayDiagraph.join('\n')
      time += 1500
      setTimeout(this.render, time, renderChange)
      setTimeout(this.pulseDown, 1000, 'node1', renderChange)
      // for each char in the path string
      for (let x = 0; x < path.length; x++) {
        currNode = path[x]
        nextNode = path[x + 1]
        let str1 = currNode + '->' + nextNode
        // HIHGLIGH ARROW
        arrayDiagraph = this.highlightArrow(arrayDiagraph, str1, 'label')
        renderChange = arrayDiagraph.join('\n')
        time += 500
        setTimeout(this.render, time, renderChange)
        // HIGHLIGHT NODE
        let key = this.getKey(nextNode)
        time += 250
        setTimeout(this.pulseUp, time, key, renderChange)
        // UNHIGHLIGHT ARROW
        arrayDiagraph = this.unhighlightArrow(arrayDiagraph, str1, 'label')
        renderChange = arrayDiagraph.join('\n')
        time += 1000
        setTimeout(this.render, time, renderChange)
        // PULSE DOWN
        setTimeout(this.pulseDown, time, key, renderChange)
      }
    },
    displayTable: function () {
      console.log('DISPLAYING TABLE')
    }
  }
}
</script>

<style scoped>
button {
  margin: 15px;
}
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
    width: 10%;
    padding: 10px;
    color:#75a1d0;
    background-color: transparent;
    /* cursor: not-allowed; */
}
.inputs{
    /* font-size: 1.2em; */
    line-height: 1.2em;
    border-color: #bad0e7;
    box-shadow: 3px 3px white;
    border-radius: 20px;
    padding:8px;
    width: 125px;
}
.icon-bar {
    margin-top: 2%;
  width: 200px; /* Set a specific width */
  /* background-color: white ; */
  border: 2px solid aliceblue;
  border-radius: 5px;
}
.icon-bar a {
  display: block; /* Make the links appear below each other instead of side-by-side */
  text-align: center; /* Center-align text */
  padding: 20px; /* Add some padding */
  transition: all 0.3s ease; /* Add transition for hover effects */
  color: white; /* White text color */
  font-size: 36px; /* Increased font-size */
  margin-top: 10px;
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
