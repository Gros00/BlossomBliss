<script>
export default {
  props:{
    Slide:{
      type: Object,
      required:true,
    }
  }
}
</script>

<template>
  <img :src="slide.image" :alt="slide.title" />
  <div class="slide-caption">
    <h2>{{ slide.title }}</h2>
    <p>{{ slide.subtitle }}</p>
  </div>
</template>

<style scoped>

</style>