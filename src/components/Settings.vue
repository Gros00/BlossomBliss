<template>
  <div>
    <div class="title">Настройки</div>
    <div class="container">
      <div class="left-block">
        <form @submit.prevent="changePassword">
          <div class="form-title">Изменение пароля</div>
          <input v-model="formData.lastPassword" type="password" placeholder="Старый пароль">
          <input v-model="formData.newPassword" type="password" placeholder="Новый">
          <input v-model="formData.repeatPassword" type="password" placeholder="Повтор">
          <div v-if="formData.repeatPassword !== formData.newPassword? error='Пароли не совпадают':error=''"
               class="error">{{ this.error }}
          </div>
          <input type="submit" value="Изменить" style="cursor: pointer">
        </form>
      </div>
      <div class="right-block">
        <input type="button" @click="output" value="Выйти из аккаунта">
      </div>
      <router-link to="/AdminPanel" v-if="this.user.phone==='admin'">Панель</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Settings',
  data() {
    return {
      user: {},
      error: '',
      formData: {
        lastPassword: '',
        newPassword: '',
        repeatPassword: '',
      }
    }
  },
  created() {
    let profile = JSON.parse(localStorage.getItem('user'))
    this.user = profile
    this.formData['id'] = profile.id
  },
  methods: {
    output(){
      localStorage.removeItem('user')
      localStorage.removeItem('favoriteCards')
      localStorage.removeItem('cart')
      this.$router.push('/')
    },
    async changePassword() {
      if (!this.error) {
        try {
          let res = await axios.post('http://127.0.0.1:8000/api/changePassword', this.formData);
          let data = await res.data;
        } catch (e) {
          console.log(e)
        }
      }
    },
  }
}
</script>

<style scoped>
.container{
  display: flex;
  gap: 20px;
}
.error {
  color: red;
  font-size: 0.9em;
}

.title {
  font-size: 32px;
  margin-top: 50px;
  margin-bottom: 20px;
}

.form-title {
  font-size: 16px;
}
.right-block{
  display: flex;
  flex-direction: column;
  input{
    justify-self: flex-end;
  }
}
form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: auto;

  input {
    padding: 10px 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    font-size: 28px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    outline: none;
    font-family: Inter;
    font-weight: 300;
    margin-bottom: 22px;
  }
}
input[type="submit"] {
  padding: 0.5em 1em;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
input[type="button"]{
  padding: 0.5em 1em;
  font-size: 16px;
  border: none;
  background-color: #2C2C2C;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 2px 2px 4px rgba(0,0,0,0.25);
}
button:hover {
  background-color: #45a049;
}
</style>
