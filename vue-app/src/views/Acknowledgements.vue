<template>
  <transition name="component-fade" mce="out-in" appear>
    <div>
      <div class="typewriter">
        <h1>Acknowledgements</h1>
      </div>
      <br />
      <br />
      <div>These made the Cayenne Converter Possible: </div>
      <br />
      <br />
      <table style="width:100%">
        <tr>
          <td>
            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front"></div>
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
                <div class="flip-card-front"></div>
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
                <div class="flip-card-front"></div>
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
                <div class="flip-card-front"></div>
                <div class="flip-card-back">
                  <h2>Inzy</h2>
                  <p>Not javascript but just as important to this project.</p>
                  <p>The literal inspiration for this project.</p>
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
  width: 250px;
  height: 250px;
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
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-card-front {
  background-color: #add8e6;
  color: black;
}

.flip-card-back {
  background-color: #2980b9;
  color: white;
  transform: rotateY(180deg);
}
</style>
