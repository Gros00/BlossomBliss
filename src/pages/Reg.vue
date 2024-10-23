<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
import router from "@/router/index.js";

export default {
  components: {Header, Footer},
  data() {
    return {
      formData: {
        name: '',
        phone: '',
        password: '',
      },
      passwordError: '',
      phoneError: '',
      RegError: '',
    };
  },
  methods: {
    async registration() {
      if (this.validatePhone() && this.validatePassword()) {
        try {
          let res = await axios.post('http://127.0.0.1:8000/api/create', this.formData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          if (res.status === 200) {
            this.$router.push('/Auth');
          }else if(res.status===500){
          }
        }catch (e) {
          console.log('Пользователь с таким телефоном уже существует')
          this.RegError = 'Пользователь с таким телефоном уже существует';
        }

      }
    },
    validatePassword() {
      const password = this.formData.password;
      const minLength = 8;
      const hasUppercase = /[A-Z]/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      const hasNumber = /[0-9]/.test(password);

      if (password.length < minLength) {
        this.passwordError = `Пароль должен быть не менее ${minLength} символов.`;
        return false;
      }
      if (!hasUppercase) {
        this.passwordError = 'Пароль должен содержать хотя бы одну заглавную букву.';
        return false;
      }
      if (!hasLowercase) {
        this.passwordError = 'Пароль должен содержать хотя бы одну строчную букву.';
        return false;
      }
      if (!hasNumber) {
        this.passwordError = 'Пароль должен содержать хотя бы одну цифру.';
        return false;
      }


      this.passwordError = '';
      return true;
    },
    validatePhone() {
      const phone = this.formData.phone;
      const phoneRegex = /^[0-9]{11}$/;

      if (!phoneRegex.test(phone)) {
        this.phoneError = 'Телефон должен содержать только цифры и быть длиной 11 символов.';
        return false;
      }

      this.phoneError = '';
      return true;
    },
  },
};
</script>

<template>
  <div class="wrapper">
    <Header nav-class="black"></Header>
  </div>
  <main>
    <div class="wrapper">
      <div class="Title">Регистрация</div>
      <form @submit.prevent="registration" class="default-form">
        <label for="name" class="name">Имя</label>
        <input type="text" v-model="formData.name" id="name">
        <label for="phone" class="phone">Телефон</label>
        <input type="text" maxlength="11" v-model="formData.phone" id="phone">
        <div v-if="phoneError" class="error">{{ phoneError }}</div>
        <label for="password" class="phone">Пароль</label>
        <input type="password" v-model="formData.password" id="password">
        <div v-if="passwordError" class="error">{{ passwordError }}</div>
        <button type="submit">Регистрация</button>

        <div v-if="RegError" class="error">{{ RegError }}</div>
      </form>
      <div class="links">
        <router-link to="/Auth">Есть аккаунт?</router-link>
      </div>
    </div>
  </main>
  <Footer></Footer>
</template>

<style scoped>
@import "@/assets/style.css";

.error {
  color: red;
  font-size: 0.9em;
}
</style>
