<script>

import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue"
export default {
  components:{Header, Footer,}
}
</script>

<template>

  <div class="wrapper">

    <Header nav-class="black"></Header>
  </div>
  <main>
    <div class="wrapper">
      <div class="Title">Авторизация</div>
      <form action="" class="default-form">
        <label for="phone" class="phone">Телефон</label>
        <input type="text" name="phone" id="phone">
        <button type="submit">Восстановить</button>
      </form>
      <div class="links"></div>
    </div>
  </main>
  <Footer></Footer>
</template>

<style scoped>
@import "@/assets/style.css";

</style>