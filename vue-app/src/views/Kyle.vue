<template>
<transition name="component-fade" mce="in-out" appear>
    <div>
        <h1 id="header"> I AM KYLE </h1>
        <button v-on:click="apply()"> APPLY TRANSITIONS PLEASE </button>
    </div>
</transition>
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
</style>
