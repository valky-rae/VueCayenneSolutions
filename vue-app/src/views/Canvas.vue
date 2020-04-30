<template>
  <div>
    <h1>Canvas</h1>
    <button v-on:click="convert()"> Lets get it started </button>
    <button v-on:click="addState()"> Add state </button>
    <button v-on:click="addAcceptState()"> Add accept state </button>
    <button v-on:click="addEdge()"> Add arrow </button>
    <button v-on:click="deleteG()"> Delete </button>

    <div id="graph" style="text-align: center; border-style: solid; width: 100%; height: 50%" v-on:click.capture="onNodeClick()"></div>
    <div class="form-popup" id="myForm">
      <form class="form-container" id="labelForm">
        <label><b>New Label</b></label>
        <input type="text" placeholder="Enter New Label" name="new_label" required>
        <button v-on:click="newLabel()"> Change </button>
        <button v-on:click="closeForm()">Close</button>
      </form>
    </div>
  </div>
</template>
<script>
import * as d3Graphviz from 'd3-graphviz'

export default {
  data () {
    return {
      editDot: ['digraph  {', ' node [shape=circle style="filled"]', ' a [fillcolor="#d62728"]', ' b [fillcolor="#1f77b4"]', ' ',
        'a -> b [label=a]', '}'],
      selectedNode: null,
      nodeName: 'b',
      accent: ' [color=orange fillcolor=white] ',
      node1: null,
      node2: null,
      addingEdge: false,
      accentDot: ['', ''],
      selectedEdge: null
    }
  },
  methods: {
    convert () {
      var ds = ''
      var i
      for (i = 0; i < this.editDot.length; i++) {
        ds = ds + this.editDot[i]
      }
      d3Graphviz.graphviz('#graph').renderDot(ds)
    },
    highlight (node, c) {
      if (!c) {
        var nName = parseInt(node) + 1
        const val = this.editDot[nName]
        var arr1 = this.editDot[nName].split('[')
        this.editDot[nName] = arr1[0] + this.accent
        this.convert()
        for (var i = 0; i < this.editDot.length; i++) {
          this.accentDot[i] = this.editDot[i]
        }
        this.editDot[nName] = val
      } else {
        nName = parseInt(node) + 1
        arr1 = this.accentDot[nName].split('[')
        this.accentDot[nName] = arr1[0] + this.accent
        var ds = ''
        for (i = 0; i < this.accentDot.length; i++) {
          ds = ds + this.accentDot[i]
        }
        d3Graphviz.graphviz('#graph').renderDot(ds)
        this.accentDot = ['', '']
      }
    },
    highlightEdge (edge) {
      for (var i = 0; i < this.editDot.length; i++) {
        if (this.editDot[i] === ' ') {
          var nName = parseInt(edge) + i
        }
      }
      const val = this.editDot[nName]
      var arr1 = this.editDot[nName].split('[')
      this.editDot[nName] = arr1[0] + '[color=orange fillcolor=orange ' + arr1[1]
      this.convert()
      for (i = 0; i < this.editDot.length; i++) {
        this.accentDot[i] = this.editDot[i]
      }
      this.editDot[nName] = val
      this.openForm()
    },
    addState () {
      if (this.selectedNode != null) {
        this.nodeName = String.fromCharCode(this.nodeName.charCodeAt(0) + 1)
        var prevName = String.fromCharCode('a'.charCodeAt(0) + parseInt(this.selectedNode - 1))
        var state = ' ' + this.nodeName + ' [fillcolor="#d62728"]'
        var edge = ' ' + prevName + ' -> ' + this.nodeName + ' [label="' + prevName + '->' + this.nodeName + '"]'
        var i
        for (i = 0; i < this.editDot.length; i++) {
          if (this.editDot[i] === ' ') {
            this.editDot.splice(i, 0, state)
            i = i + 1
          }
          if (this.editDot[i] === '}') {
            this.editDot.splice(i, 0, edge)
            i = i + 1
          }
        }
        this.convert()
      } else {
        alert('Select a state to add a state onto it')
      }
      this.selectedNode = null
    },
    addAcceptState () {
      if (this.selectedNode != null) {
        this.nodeName = String.fromCharCode(this.nodeName.charCodeAt(0) + 1)
        var prevName = String.fromCharCode('a'.charCodeAt(0) + parseInt(this.selectedNode - 1))
        var state = ' ' + this.nodeName + ' [shape=doublecircle fillcolor="#d62728"]'
        var edge = ' ' + prevName + ' -> ' + this.nodeName + ' [label="' + prevName + '->' + this.nodeName + '"]'
        var i
        for (i = 0; i < this.editDot.length; i++) {
          if (this.editDot[i] === ' ') {
            this.editDot.splice(i, 0, state)
            i = i + 1
          }
          if (this.editDot[i] === '}') {
            this.editDot.splice(i, 0, edge)
            i = i + 1
          }
        }
        this.convert()
      } else {
        alert('Select a state to add a state onto it')
      }
      this.selectedNode = null
    },
    onNodeClick () {
      var clicked = event.target.parentElement
      var str = null
      if (!this.addingEdge) {
        if (clicked.nodeName === 'g') {
          str = clicked.id.slice(0, 4)
          if (str === 'node') {
            this.selectedNode = clicked.id.slice(4, clicked.length)
            this.highlight(this.selectedNode, false)
          } else if (str === 'edge') {
            this.selectedEdge = clicked.id.slice(4, clicked.length)
            this.highlightEdge(this.selectedEdge)
          }
        } else {
          this.convert()
          this.selectedNode = null
          this.selectedEdge = null
        }
      } else {
        if (this.node1 === null) {
          if (clicked.nodeName === 'g') {
            str = clicked.id.slice(0, 4)
            if (str === 'node') {
              this.node1 = clicked.id.slice(4, clicked.length)
              this.highlight(this.node1, false)
            }
          } else {
            this.convert()
            this.node1 = null
          }
        } else {
          if (clicked.nodeName === 'g') {
            str = clicked.id.slice(0, 4)
            if (str === 'node') {
              this.node2 = clicked.id.slice(4, clicked.length)
              this.highlight(this.node2, true)
              this.addEdge()
            }
          } else {
            this.convert()
            this.node2 = null
          }
        }
      }
    },
    addEdge () {
      if (this.addingEdge === false) {
        this.addingEdge = true
      } else if (this.addingEdge && this.node1 != null && this.node2 != null) {
        this.addingEdge = false
        var first = String.fromCharCode('a'.charCodeAt(0) + parseInt(this.node1) - 1)
        var second = String.fromCharCode('a'.charCodeAt(0) + parseInt(this.node2) - 1)
        var edge = ' ' + first + ' -> ' + second + ' [label="' + first + '->' + second + '"]'
        var ds = ''
        var i
        for (i = 0; i < this.editDot.length; i++) {
          if (this.editDot[i] === '}') {
            this.editDot.splice(i, 0, edge)
            i = i + 1
          }
        }
        for (i = 0; i < this.editDot.length; i++) {
          ds = ds + this.editDot[i]
        }
        d3Graphviz.graphviz('#graph').renderDot(ds)
        this.node1 = null
        this.node2 = null
      } else {
        this.addingEdge = false
      }
    },
    deleteG () {
      if (this.selectedNode != null) {
        console.log('o')
        this.deleteNode()
      } else if (this.selectedEdge != null) {
        this.deleteEdge()
      }
      console.log(this.editDot)
    },
    deleteEdge () {
      for (var i = 0; i < this.editDot.length; i++) {
        if (this.editDot[i] === ' ') {
          var nName = parseInt(this.selectedEdge) + i
        }
      }
      this.editDot.splice(nName, 0)
      this.convert()
    },
    deleteNode () {
      var nodeName = String.fromCharCode('a'.charCodeAt(0) + parseInt(this.selectedNode - 1))
      var nName = parseInt(this.selectedNode) + 1
      this.editDot.splice(nName, 1)
      for (var i = 0; i < this.editDot.length; i++) {
        if (this.editDot[i] === ' ') {
          i = i + 1
          for (i; i < this.editDot.length; i++) {
            console.log('jj')
            var editable = this.editDot[i].split(' ')
            console.log(editable)
            for (var x = 0; x < editable.length; x++) {
              console.log(x)
              if (editable[x] === nodeName) {
                this.editDot.splice(i, 1)
              }
            }
          }
        }
      }
      this.convert()
    },
    openForm () {
      document.getElementById('myForm').style.display = 'block'
    },
    closeForm () {
      document.getElementById('myForm').style.display = 'none'
    },
    newLabel () {
      var newL = document.getElementById('labelForm').new_label.value
      for (var i = 0; i < this.editDot.length; i++) {
        if (this.editDot[i] === ' ') {
          var nName = parseInt(this.selectedEdge) + i
        }
      }
      var arr1 = this.editDot[nName].split('[')
      this.editDot[nName] = arr1[0] + '[label=' + newL + ']'
      this.convert()
      this.closeForm()
    }
  }
}
</script>
<style scoped>
/* The popup form - hidden by default */
.form-popup {
  display: none;
  position: fixed;
  bottom: 0;
  right: 15px;
  border: 3px solid #f1f1f1;
  z-index: 9;
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
