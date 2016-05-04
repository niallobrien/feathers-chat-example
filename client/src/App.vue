<template>
  <div id="app">
    <div class="container">
      <div class="grid">
        <div class="gird__col grid__col--s-12-of-12 grid__col--4-of-5 grid__col--centered">
          <div class="">
            <img class="logo" src="./assets/logo.png">
          </div>
        </div>
        <div class="gird__col grid__col--s-12-of-12 grid__col--4-of-5 grid__col--centered">
            <p class="padding-bottom text-align">
              <a v-link="{ path: '/index' }">Go to Home</a>
              <a v-link="{ path: '/messages' }">Go to Messages</a>
            </p>
        </div>
        <div class="gird__col grid__col--s-12-of-12 grid__col--4-of-5 grid__col--centered">
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
@import url("../node_modules/normalize.css/normalize.css");
@import url("../node_modules/milligram/dist/milligram.css");
@import url("./assets/css/toast.css");


.center-div{
  margin: 0 auto;
  width: 100px;
}

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
.text-align {
  text-align: center;
}
.inner {
  display:block;
  margin:auto;
}
.padding-bottom {
  padding-bottom: 20px;
}
.padding-left {
  padding-left: 50px;
}

.logo {
  width: 100px;
  height: 100px;
  display:block;
  margin:auto;
}
</style>
