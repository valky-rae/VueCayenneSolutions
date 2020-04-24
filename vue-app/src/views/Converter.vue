<template>
    <div>
        <h1> Cayenne Converter </h1>
        <div>
            <form class="form-group">
                <input class="form-control " type="text" v-model="regex">
                <p class="hint"> Enter Regex Here</p>
            </form>
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
        <div id="graph" class="prettygraph" style="text-align: center;"></div>
    </div>
</template>
<script>
import * as d3Graphviz from 'd3-graphviz'
// import * as d3 from 'd3-graphviz'
export default {
  data: function () {
    return {
      regex: '101',
      fsm: 'empty fsm',
      dotscript: 'empty ds'
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
      d3Graphviz.graphviz('#graph').renderDot(this.dotscript)
    }
  }
}
</script>

<style scoped>

.form-control {
    display: block;
    width: 200px;
    padding: 6px 12px;
    color: white;
    border: 2px solid aliceblue;
    border-radius: 5px;
    background-color: transparent;
    font-size: 1.2em;
    line-height: 1.2em;
    box-shadow: 2px 2px white;
    /* cursor: not-allowed; */
}
.hint{
    font-size: 0.9em;
    text-align: left;
    text-shadow: 2px 2px black;
}
.prettygraph{
    display: block;
    height: 400px;
    width: 100%;
    background-color: pink;
    border: 2px solid aliceblue;
    border-radius: 5px;
    margin-top: 2%;
}
button {
    background-color: black;
    color: white;
    border: 0;
    border-radius: 20px;
    cursor: pointer;
    box-shadow: 2px 2px white;
    padding: 10px 15px 10px 15px;
    font-size: 20px;
    font-family: 'PT Mono';
}
button:hover {
    background-color: white;
    color: black;
}
</style>
