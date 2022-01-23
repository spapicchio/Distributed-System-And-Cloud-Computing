<template>
  <router-view></router-view>
</template>

<script>


export default {
  name: "App",
  components: {

  },

  data() {
    return {
      movies: []
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: block;
  align-items:center;
  max-width: 70%;
  margin: 0% auto 5% auto;
}

</style>
