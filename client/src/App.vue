<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="column column-50 column-offset-25">
          <div class="inner padding-left">
            <img class="logo" src="./assets/logo.png">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="column column-50 column-offset-25">
          <p class="inner padding-bottom">
            <a v-link="{ path: '/index' }">Go to Home</a>
            <a v-link="{ path: '/messages' }">Go to Messages</a>
          </p>
        </div>
      </div>
      <div class="row">
        <div class="column column-50 column-offset-25">
          <router-view></router-view>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import store from './vuex/store'
  export default {
    replace: false,
    store
  }
</script>

<style>

/*Override milligram colors to Vue green : ) */
a {
  color: #41B883;
}
button {
  background-color: #41B883;
  border: 0.1rem solid #41B883;
}
input[type='email']:focus, input[type='number']:focus, input[type='password']:focus, input[type='search']:focus, input[type='tel']:focus, input[type='text']:focus, input[type='url']:focus, textarea:focus, select:focus {
  border: 0.1rem solid #41B883;
}


body {
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  margin-top: 100px;
}
.inner {
    width: 50%;
    margin: 0 auto;
}
.padding-bottom {
  padding-bottom: 20px;
}
.padding-left {
  padding-left: 50px;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
