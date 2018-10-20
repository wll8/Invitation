<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <music :path="$route.name"/>
    <router-view/>
  </div>
</template>

<script>
import music from './components/music.vue';
export default {
  name: 'App',
  components: {
    music
  }
}
</script>

<style>
#app {}
</style>
