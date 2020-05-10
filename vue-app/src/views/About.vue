<template>
  <transition name="component-fade" mce="out-in" appear>
    <div>
      <div class="typewriter">
        <h1>About Us</h1>
      </div>
      <br />
      <br />
      <div>Project goal: </div>
      <br />
      <br />
      <table style="width:100%">
        <tr>
          <td>
            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <img
                    src="../assets/stewardess.png"
                    alt="Avatar"
                    style="width:300px;height:300px;"
                  />
                </div>
                <div class="flip-card-back">
                  <h1>Samantha Blanc</h1>
                  <p>Computer Science (Special)</p>
                  <p>We love that girl</p>
                </div>
              </div>
            </div>
          </td>

          <td>
            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <img
                    src="../assets/businessman.png"
                    alt="Avatar"
                    style="width:300px;height:300px;"
                  />
                </div>
                <div class="flip-card-back">
                  <h1>Kyle</h1>
                  <p>Architect & Engineer</p>
                  <p>We love that guy</p>
                </div>
              </div>
            </div>
          </td>

          <td>
            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <img src="../assets/teacher.png" alt="Avatar" style="width:300px;height:300px;" />
                </div>
                <div class="flip-card-back">
                  <h1>Rae Anne</h1>
                  <p>Architect & Engineer</p>
                  <p>We love that guy</p>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </table>Icons made by
      <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from
      <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
    </div>
  </transition>
</template>

<style scoped>
.flip-card {
  background-color: transparent;
  width: 300px;
  height: 300px;
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
