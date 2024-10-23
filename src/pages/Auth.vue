<template>
  <div class="wrapper">
    <Header nav-class="black"></Header>
    <main>
      <div class="wrapper">
        <div class="Title">Авторизация</div>
        <form @submit.prevent="Auth" class="default-form">
          <label for="phone" class="phone">Телефон</label>
          <input type="text" v-model="formData.phone" id="phone">
          <label for="password" class="phone">Пароль</label>
          <input type="password" v-model="formData.password" id="password">
          <button type="submit">Авторизация</button>
          <div class="error" v-if="error">{{ error }}</div>
        </form>
        <div class="links">
          <router-link to="/Recovery">Восстановить</router-link>
          <router-link to="/Reg">Нет аккаунта?</router-link>
        </div>
      </div>
    </main>
  </div>
  <Footer></Footer>

</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";

export default {
  components: { Header, Footer },
  data() {
    return {
      formData: {
        phone: '',
        password: ''
      },
      error: ''
    };
  },
  methods: {
    async Auth() {
      try {
        let res = await axios.post('http://127.0.0.1:8000/api/login', this.formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (res.status === 200) {
          localStorage.setItem('user', JSON.stringify(res.data));
          this.$router.push('/Profile');
        } else if (res.status === 401) {
          this.error = 'Неверный номер телефона или пароль';
        }
      } catch (e) {
        console.log(e);
        this.error = 'Ошибка при авторизации';
      }
    }
  }
};
</script>

<style scoped>
@import "@/assets/style.css";
.error {
  color: red;
  font-size: 0.9em;
}
</style>
