<script>
import axios from "axios";

export default {
  data() {
    return {
      cards: [],
      searchQuery: '',
      arrow: 'down'
    };
  },
  computed: {
    filteredCards() {
      if (!this.searchQuery) {
        return this.cards;
      }
      return this.cards.filter(card =>
          card.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    async deleteCard(id) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/delete-card/${id}`);
        this.cards = this.cards.filter((card) => card.id !== id);
      } catch (error) {
        console.error("Error deleting card:", error);
      }
    },
    async updateCard(card) {
      try {
        await axios.put(`http://127.0.0.1:8000/api/update-card/${card.id}`, {
          title: card.title,
          rating: card.rating,
          cost: card.cost
        });
      } catch (error) {
        console.error("Error updating card:", error);
      }
    },
    async getCards() {
      let res = await axios.get('http://127.0.0.1:8000/api/get-cards');

      res.data.forEach(card => {
        this.cards.push(card);

        if (typeof card.to === 'string') {
          card.to = card.to.split(' ');
        }
        if (typeof card.type === 'string') {
          card.type = card.type.split(' ');
        }
      });
    },
    sort() {
      if (this.arrow === 'down') {
        this.cards.sort((a, b) => a.cost - b.cost);
        this.arrow = 'up';
      } else {
        this.cards.sort((a, b) => b.cost - a.cost);
        this.arrow = 'down';
      }
    }
  },
  created() {
    this.getCards();
  }
};
</script>

<template>
  <div class="view-cards-window">
    <h2>Список всех карточек: </h2>
    <input v-model="searchQuery" type="text" placeholder="Поиск по названию" class="search-input">
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Название</th>
        <th>Рейтинг</th>
        <th style="cursor: pointer" @click="sort">Цена <span v-if="arrow === 'down'">&darr;</span><span v-else>&uarr;</span></th>
        <th>Изображение</th>
        <th>Действия</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="card in filteredCards" :key="card.id">
        <td>{{ card.id }}</td>
        <td contenteditable="true" @input="card.title = $event.target.innerText">{{ card.title }}</td>
        <td contenteditable="true" @input="card.rating = parseFloat($event.target.innerText)">{{ card.rating }}</td>
        <td contenteditable="true" @input="card.cost = parseFloat($event.target.innerText)">{{ card.cost }}</td>
        <td><img :src="'http://localhost:8000/storage/' + card.image" alt="Card Image" class="card-image"></td>
        <td>
          <button @click="deleteCard(card.id)" class="delete-button">Удалить</button>
          <button @click="updateCard(card)" class="update-button">Обновить</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.view-cards-window {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.view-cards-window h2 {
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
  color: #333;
}

.search-input {
  width: 100%;
  padding: 10px;
  font-size: 18px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #007BFF;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 18px;
  text-align: left;
}

table thead {
  background-color: #007BFF;
  color: white;
}

table th, table td {
  padding: 12px 15px;
  border: 1px solid #ddd;
}

table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

table tbody tr:hover {
  background-color: #e9e9e9;
}

table th {
  background-color: #292B57;
  color: white;
  font-weight: bold;
}

.card-image {
  width: 100px;
  height: auto;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.delete-button, .update-button {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-button {
  background-color: #ff4d4d;
  color: white;
}

.delete-button:hover {
  background-color: #cc0000;
}

.update-button {
  background-color: #4CAF50;
  color: white;
  margin-left: 5px;
}

.update-button:hover {
  background-color: #45a049;
}
</style>
