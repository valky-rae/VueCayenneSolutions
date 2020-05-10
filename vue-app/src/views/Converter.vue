<template>
<transition name="component-fade" mce="in-out" appear>
    <div>
        <div class="typewriter">
            <h1>Cayenne Converter </h1>
        </div>
        <div>
          <span class="form-control">
            <input class="inputs" type="text" v-model="regex">
            <input class="inputs" type="text" v-model="inputStr" v-on:keyup="split2()">
                <button v-on:click="convert()"> CONVERT </button>
                <button v-on:click="buildDigraphArray()"> Build array  </button>
                <button class="buttonGradient" v-on:click="DFATrace4()"> TRACE </button>
            <p class="hint"> Enter Regex Here</p>
            <p>Message is: {{ regex }}</p>
            <span v-for="(char) in splitStr" v-bind:key="char">
              <p id="this" v-bind:class = "{heartBeat: char.isactive}"> {{char.char}} </p>
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
      inputStr: '',
      splitStr: [ ],
      digraphArray: []
    }
  },
  components: {
    Carousel
  },
  methods: {
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
    convert: function () {
      let regParser = require('automata.js')
      let parser = new regParser.RegParser(this.regex)
      this.fsm = parser.parseToDFA()
      this.dotscript = this.fsm.toDotScript()
      this.myDotscript = this.defineMyDotscipt()
      // this.render(this.myDotscript)
      this.buildDigraphArray()
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
      let num = currNode + 1
      let key = 'node' + num.toString()
      console.log('CURRNODE KEY>> ' + currNode + ' is ' + key)
      return key
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
    activateInputStr: function (x) {
      // this.splitStr.forEach(function (item) {
      //   item.isactive = false
      // })
      this.splitStr[x].isactive = true
    },
    startDFATrace: function () {
      console.log('starting trace')
    },
    DFATrace4: function () {
      console.log('DFA TRACE 4')
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
        // activate += 2000
        // setTimeout(this.activateInputStr, activate, x)
        // this.splitStr[x].isactive = true
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
          console.log('this aint it sis')
          return
        }
        // HIHGLIGH ARROW
        arrayDiagraph = this.highlightArrow(arrayDiagraph, str1, str2)
        renderChange = arrayDiagraph.join('\n')
        time += 500
        setTimeout(this.render, time, renderChange)
        // HIGHLIGHT NODE
        // this.highlightNode(z, time, renderChange)
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
        // this.splitStr[x].isactive = false
      }
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
    renderBuild: function (dotIndex) {
      if (dotIndex === this.digraphArray.length) {
        return
      }
      var dot = this.digraphArray[dotIndex]
      // var dot = dotLines.join('')
      d3.select('#graph').graphviz()
        .transition(function () {
          return d3.transition('main')
            .ease(d3.easeLinear)
            .delay(500)
            .duration(1500)
        })
        .logEvents(true)
        .renderDot(dot)
        .on('end', function () {
          dotIndex = dotIndex + 1
          this.renderBuild()
        })
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
