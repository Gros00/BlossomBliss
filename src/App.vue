<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'App',
  data(){
    return{
      cards:[],
    }
  },
  created() {

  },
  computed: {
    getUser(){

    }
  },
  methods:{

  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 3s ease-in-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
