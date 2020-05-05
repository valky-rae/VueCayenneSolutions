<template>
    <div>
        <h1 id="header"> I AM KYLE </h1>
        <button v-on:click="apply()"> APPLY TRANSITIONS PLEASE </button>
    </div>
</template>

<script>
export default {
  methods: {
    apply: function () {
      var d = document.getElementById('header')
      d.className += 'animated infinite bounce'
    }
  }
}
</script>

<style scoped>
.fades{
  animation: fadeInUp;
  animation-duration: 4s;
  /* animation-delay: 2s; */
  animation-iteration-count: 1;
}
</style>
