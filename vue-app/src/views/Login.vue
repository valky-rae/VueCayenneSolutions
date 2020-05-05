<template>
    <div id="happy">
        <h1 class="mouse" >Google Authentication Website Application Demo</h1>
        <div class="g-signin2" data-onsuccess="onSignIn" v-on:click="onSignIn()"></div>
        <div id="content">
          <p>Message is: {{ profileName }}</p>
        </div>
        <p style="line-height: 30px; width: 300px; border: 1px solid black;"></p>
        <button v-on:click="signOut()">Sign Out</button>
    </div>
</template>
<script>
export default {
  data: function () {
    return {
      profileName: 'My name',
      profileImg: ''
    }
  },
  methods: {
    onSignIn: function (googleUser) { // automatically sign in
      // add timer 10 sec
      var profile = googleUser.getBasicProfile()
      console.log('user is' + JSON.stringify(profile))
      var element = document.querySelector('#content')
      element.innerText = profile.getEmail()
      this.profileName = profile.getName()
      console.log('profile name is' + this.profileName)
      var image = document.createElement('img')
      image.setAttribute('src', profile.getImageUrl())
      element.append(image)
    },
    signOut: function () {
      gapi.auth2.getAuthInstance().signOut().then(function () { // eslint-disable-line
        console.log('user signed out')
        var element = document.querySelector('#content')
        element.innerText = 'User signed out'
      })
    }
  }
}
</script>

<style scoped>
.mouse {
  /* cursor: wait; */
  /* cursor: url('http://i.stack.imgur.com/qdR8p.png'), auto; */
  cursor: url('')
}
 #happy {
  cursor: url("/uploads/media/default/0001/02/ee4486d1b3fc998e444c3b0100c73db282760eb5.png"), auto;
}
</style>
