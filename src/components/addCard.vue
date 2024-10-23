<script>
import axios from "axios";

export default {
  data() {
    return {
      formData: {
        title: '',
        rating: null,
        cost: null,
        to: '',
        type: '',
      },
      answer:''
    };
  },
  methods: {
    async submitForm() {
      let image = this.$refs.image.files[0]
      let formData = new FormData();
      formData.append('title', this.formData.title)
      formData.append('image', image)
      formData.append('rating', this.formData.rating)
      formData.append('cost', this.formData.cost)
      formData.append('to', JSON.stringify(this.formData.to))
      formData.append('type', JSON.stringify(this.formData.type))
      console.log(formData)
      const response = await axios.post('http://127.0.0.1:8000/api/create-card', formData)
      this.answer = response.data.message;
    },
  },
};
</script>

<template>
  <div class="add-card-window">
    <h2>Добавление карточки</h2>
    <form @submit.prevent="submitForm">
      <input v-model="formData.title" type="text" placeholder="Название" required>
      <input v-model="formData.rating" type="number" placeholder="Рейтинг" step=".01" required>
      <input v-model="formData.cost" type="number" placeholder="Цена" step="20" required>
      <input v-model="formData.to" type="text" placeholder="Кому" required>
      <input v-model="formData.type" type="text" placeholder="Тип" required>
      <div class="file-input-wrapper">
        <input type="file" id="file" ref="image" class="file-input">
        <label for="file" class="file-label">Выберите файл</label>
      </div>
      <input type="submit"  value="Создать" class="submit-button">
    </form>
    <div class="ServerAnswer" v-if="answer">{{this.answer}}</div>
  </div>
</template>

<style scoped>
.ServerAnswer{
  font-size: 24px;
  text-align: center;
  margin-top: 20px;
}
.add-card-window {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.add-card-window h2 {
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

input[type="text"],
input[type="number"] {
  width: 80%;
  padding: 10px;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  outline: none;
  transition: border-color 0.3s;
}

input[type="text"]:focus,
input[type="number"]:focus {
  border-color: #007BFF;
}

.file-input-wrapper {
  position: relative;
  width: 80%;
}

.file-input {
  width: 100%;
  padding: 10px;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
}

.file-label {
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 18px;
  color: #777;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}


.file-label:hover {
  background-color: #f1f1f1;
}

.submit-button {
  width: 80%;
  padding: 10px;
  font-size: 18px;
  color: #fff;
  background-color: #292B57;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
