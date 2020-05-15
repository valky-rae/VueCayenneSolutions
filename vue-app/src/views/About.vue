<template>
  <transition name="component-fade" mce="out-in" appear>
    <div>
      <div class="typewriter">
        <h1>About Us</h1>
      </div>
      <br />
      <h2>Meet the Team</h2>
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
                  <h2>Samantha Blanc</h2>
                  <p>Project Lead</p>
                  <p>She mothers us.</p>
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
                  <h2>Kyle</h2>
                  <p>Documenter Lead</p>
                  <p>He keeps us laughing and motivated.</p>
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
                  <h2>Rae Anne</h2>
                  <p>Development Lead</p>
                  <p>She's always doing the most and the best.</p>
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
