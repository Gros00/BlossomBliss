<script>

import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue"

export default {
  data() {
    return {}
  },
  components: {Header, Footer}
}
</script>

<template>
  <div class="wrapper">
    <Header nav-class="black"></Header>
    <main>
      <div class="title">Наши контакты</div>
      <div class="container">
        <p>Вы можете нас найти в:</p>
        <div class="icon-container">
          <img src="@/assets/images/vk.png" alt="" class="icon">
          <img src="@/assets/images/telegram.png" alt="" class="icon">
        </div>
        <p>Для связи по почте используйте следующий адрес:</p>
        <h3>pochta@mail.ru</h3>
        <p>Также вы можете звонить по телефону в рабочее время:</p>
        <h3>+7 999 999 99 99</h3>
        <p>Наш основной магазин находится по адресу:</p>
        <h3>Энтузиастов 17</h3>
      </div>
    </main>

  </div>
    <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Ab47d563985938689d4d09c4e9e483bd9ef0e24691fd9dde2ebca8a36900c0073&amp;source=constructor" width="100%" height="720" frameborder="0"></iframe>
  <Footer></Footer>
</template>

<style scoped>
.title {
  font-size: 48px;
  font-family: Ubuntu;
  font-weight: 300;
  margin-bottom: 50px;
}
.container{
  p{
    font-size: 16px;
    margin-top: 10px;
  }
  h3{
    margin-top: 10px;
  }
  .icon-container{
    display: flex;
    gap: 50px;
    margin-top: 20px;
    img{
      cursor: pointer;
      width: 50px;
      height: 50px;
    }
  }
}


</style>