<template>
  <transition name="component-fade" mce="out-in" appear>
    <div>
      <div class="typewriter">
        <h1>Acknowledgements</h1>
      </div>
      <br />
      <br />
      <div>By highlighting the following aspects which is made public by the cayenne solutions team
         as it relates to the development of the application, it is noted that all tools and software
          used by the project team were accessible to all users via the internet and as such,
           no copyright infringement laws were violated</div>
      <br />
      <br />
      <table style="width:100%">
        <tr>
          <td>
            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <img src="../assets/d3.jpeg" alt="d3Graphviz" style="width:260px;height:260px;" />
                </div>
                <div class="flip-card-back">
                  <h2>D3 Graphviz</h2>
                  <p>A javascript package that renders Dot diagrams.</p>
                  <p>Used on the Converter and Canvas page to show you all those diagram.</p>
                </div>
              </div>
            </div>
          </td>

          <td>
            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <img src="../assets/automata.png" alt="automata.js" style="width:200px;height:200px;" />
                </div>
                <div class="flip-card-back">
                  <h2>Automata.js</h2>
                  <p>A javascript package that converts a regular expression into a Dot diagram.</p>
                  <p>Used on the Converter page to change the regular expressions entered in DFAs and NFAs.</p>
                </div>
              </div>
            </div>
          </td>

          <td>
            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <img src="../assets/vue.png" alt="Vue" style="width:260px;height:260px;" />
                </div>
                <div class="flip-card-back">
                  <h2>Vue.js</h2>
                  <p>A javascript framework</p>
                  <p>Used everywhere.</p>
                </div>
              </div>
            </div>
          </td>

          <td>
            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <img src="../assets/lecturer.png" alt="d3Graphviz" style="width:260px;height:260px;" />
                </div>
                <div class="flip-card-back">
                  <h2>Inzy</h2>
                  <p>Our project team would like to express our deepest gratitude to Mr. Inzamam Rahaman for his valuable and
                    constructive suggestions towards the planning and development of the project website application.
                    His willingness to give his time so generously has been very much appreciated.</p>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </transition>
</template>

<style scoped>
.flip-card {
  background-color: transparent;
  width: 260px;
  height: 260px;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  text-align: center;
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-card-front {
  background-color: aliceblue;
  color: black;
}

.flip-card-back {
  background-color: #2980b9;
  color: white;
  transform: rotateY(180deg);
}
</style>
