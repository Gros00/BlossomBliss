<template>
  <div class="container">
    <h2>Профиль</h2>
    <form @submit.prevent="updateProfile">
      <div class="form-group">
        <label for="name">Имя:</label>
        <input type="text" v-model="profile.name" id="name" />
      </div>
      <div class="form-group">
        <label for="email">Электронная почта:</label>
        <input type="email" v-model="profile.email" id="email" />
      </div>
      <div class="form-group">
        <label for="address">Адрес:</label>
        <input type="text" v-model="profile.address" id="address" />
      </div>
      <input type="submit" value="Обновить профиль">
    </form>
    <div v-if="message" class="message">{{ message }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Profile',
  data() {
    return {
      user:{},
      profile:{},
      message: '',
    };
  },

  methods: {

    async updateProfile() {
        let res = await axios.post('http://127.0.0.1:8000/api/user-update', this.profile)

        localStorage.setItem('user', JSON.stringify(res.data.user))
        window.location.reload()

    },

  },
  created() {
    let user = JSON.parse(localStorage.getItem('user'));
    this.profile['id']=user.id
    this.profile['email']=user.email
    this.profile['address']=user.address
    this.profile['name']=user.name
  }
}
</script>

<style scoped>
.container {
  margin-top: 50px;
}

h2 {
  font-size: 32px;
}

.form-group {
  margin-bottom: 1em;
}

.form-group label {
  font-size: 24px;
  display: block;
  margin-bottom: 0.5em;
}

.form-group input {
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

input[type="submit"] {
  padding: 0.5em 1em;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #45a049;
}

.message {
  margin-top: 1em;
  color: red;
}
</style>
