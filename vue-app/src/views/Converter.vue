<template>
    <div>
        <h1> Cayenne Converter </h1>
        <div>
            <input type="text" v-model="regex">
            <p>Message is: {{ regex }}</p>
            <div>
                <button v-on:click="simple()"> Simple Display </button>
                <button v-on:click="convert()"> Convert to DotScript </button>
                <button onclick="tester();"> Tester d3 from index</button>
                <!-- <button onclick="basic();"> Draw Default</button>
                <button onclick="drawInput();"> Draw Input</button>
                <button onclick="transitions();"> Transitions</button>
                <button onclick="singletransitions();"> One by one</button> -->
            </div>
        </div>
        <div id="graph" style="text-align: center;"></div>
    </div>
</template>
<script>
import * as d3 from 'd3'
export default {
  data: function () {
    return {
      regex: 'empty regex',
      fsm: 'empty fsm',
      dotscriptcode: 'empty ds',
      test: 'test'
    }
  },
  methods: {
    simple: function () {
      console.log('DISPLAY FUCNTION')
      console.log(this.regex + this.dotscript)
    },
    convert: function () {
      console.log('CONVERT TO DOTSCRIPT FUNCTION>>>>>>>>>>>>')
      let regParser = require('automata.js')
      let parser = new regParser.RegParser(this.regex)
      this.fsm = parser.parseToDFA()
      this.dotscript = this.fsm.toDotScript()
      console.log(this.regex)
      console.log(this.fsm)
      console.log(this.dotscript)
      //   let d3 = require('d3')
      d3.select('#graph').graphviz()
        .renderDot(this.dotscript)
    }
  }
}
</script>
