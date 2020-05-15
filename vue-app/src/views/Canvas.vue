<template>
<transition name="component-fade" mce="in-out" appear>
  <div>
    <div class="typewriter">
      <h1>Canvas </h1>
    </div>
    <span style="display:flex">
      <div class="icon-bar">
        <button v-on:click="convert()">
          <img src="../assets/start.png" alt="start" />
        </button>
        <button v-on:click="addState()">
          <img src="../assets/state.png" alt="add state" />
        </button>
        <button v-on:click="addAcceptState()">
          <img src="../assets/accept_state.png" alt="add accept state" />
        </button>
        <button v-on:click="addEdge()">
          <img src="../assets/arrow.png" alt="add arrow" />
        </button>
        <button v-on:click="deleteG()">
          <img src="../assets/delete.png" alt="delete" />
        </button>
        <button id="saveme" v-on:click="save()">
          <img src="../assets/save.png" alt="save" />
        </button>
        <a href="#" class="button" id="btn-download" v-on:click.capture="save()">
          <img src="../assets/save.png" alt="save" />
        </a>
      </div>
      <div id="graph" class="prettygraph" style="text-align: center;" v-on:click.capture="onNodeClick()"></div>
      <image id="theImage" />
    </span>=
    <div class="animated infinite bounce" id="myForm" style="background-color:aliceblue" v-on:click.capture="stopJump()" v-if="show">
      <br>
      <form class="form-container" id="labelForm">
        <label><b>New Label</b></label>
        <input type="text" placeholder="Enter New Label" name="new_label" required>
        <button v-on:click="newLabel()"> Change </button>
        <button v-on:click="closeForm()">Close</button>
      </form>
      <br>
    </div>
  </div>
</transition>
</template>
<script>
import * as d3Graphviz from 'd3-graphviz'

export default {
  data () {
    return {
      editDot: ['digraph  {', ' node [shape=circle style="filled"]', ' a [fillcolor="white"]', ' b [fillcolor="white"]', ' ',
        'a -> b [label=a]', '}'],
      selectedNode: null,
      nodeName: 'b',
      accent: ' [color=navyblue fillcolor=aliceblue] ',
      node1: null,
      node2: null,
      addingEdge: false,
      accentDot: ['', ''],
      selectedEdge: null,
      show: false
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
      this.editDot[nName] = arr1[0] + '[color="navyblue" fillcolor="navyblue"' + arr1[1]
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
        var state = ' ' + this.nodeName + ' [fillcolor="white"]'
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
        var state = ' ' + this.nodeName + ' [shape=doublecircle fillcolor="white"]'
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
        this.deleteNode()
      } else if (this.selectedEdge != null) {
        this.deleteEdge()
      }
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
            var editable = this.editDot[i].split(' ')
            for (var x = 0; x < editable.length; x++) {
              if (editable[x] === nodeName) {
                this.editDot.splice(i, 1)
              }
            }
          }
        }
      }
      this.convert()
    },
    stopJump () {
      var d = document.getElementById('myForm')
      d.className = ''
    },
    openForm () {
      this.show = true
      var d = document.getElementById('myForm')
      d.className = 'animated infinite bounce'
      this.show = true
    },
    closeForm () {
      this.show = false
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
    },
    save () {
      var canvas = document.getElementById('graph')
      // var button = document.getElementById('saveme')
      var button = document.getElementById('btn-download')
      var dataURL = canvas.toDataURL('image/png')
      document.getElementById('theImage').src = dataURL
      window.location.href = dataURL
      button.href = dataURL
    }
  }
}
</script>
<style scoped>
/* The popup form - hidden by default */
.form-popup {
  display: block;
  position: fixed;
  bottom: 0;
  right: 15px;
  border: 3px solid #f1f1f1;
  z-index: 9;
  background-color: aliceblue ;
}

.icon-bar {
  width: 90px; /* Set a specific width */
  background-color: white ;
  border: 2px solid aliceblue;
  border-radius: 5px;
}

.icon-bar a {
  display: block; /* Make the links appear below each other instead of side-by-side */
  text-align: center; /* Center-align text */
  padding: 16px; /* Add some padding */
  transition: all 0.3s ease; /* Add transition for hover effects */
  color: white; /* White text color */
  font-size: 36px; /* Increased font-size */
}

.icon-bar a:hover {
  background-color: #000; /* Add a hover color */
}

.active {
  background-color: #4CAF50; /* Add an active/current color */
}
.prettygraph{
    display: block;
    height: 400px;
    width: 100%;
    background-color: white ;
    border: 2px solid aliceblue;
    border-radius: 5px;
}
</style>
