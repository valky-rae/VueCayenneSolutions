<template>
    <div>
        <h1>Google Authentication Website Application Demo</h1>
        <div class="g-signin2" data-onsuccess="onSignIn"></div>
        <div id="content"></div>
        <p style="line-height: 30px; width: 300px; border: 1px solid black;"></p>
        <button onclick="signOut()">Sign Out</button>
    </div>
</template>
<script>
export default {
  data: function () {
    return {
      regex: '101',
      fsm: 'empty fsm',
      dotscript: 'empty ds'
    }
  },
  methods: {
    onSignIn: function (googleUser) { // automatically sign in
      var profile = googleUser.getBasicProfile()
      console.log('user is' + JSON.stringify(profile))
      var element = document.querySelector('#content')
      element.innerText = profile.getEmail()
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
