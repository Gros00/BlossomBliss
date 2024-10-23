<template>
    <div class="wrapper">
      <Header :nav-class="'black'"></Header>
    </div>
  <main>
    <div class="wrapper">
      <div class="Title">Избранное</div>
      <div class="catalog" v-if="paginatedCards.length > 0">
        <div class="catalog-cards" :style="catalogCardsStyle">
          <Card
              v-for="card in paginatedCards"
              :key="card.id"
              :card="card"
              @card-clicked="openModal"
              @favorite-toggled="toggleFavorite"
          />
          <Modal
              v-if="selectedCard"
              :card="selectedCard"
              @close="closeModal"
          />
        </div>
      </div>
      <div class="isEmpty" v-else> Вы ничего еще не добавили</div>
      <div class="pagination" :hidden="currentPage<totalPages">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
      <div class="btn" style=" margin-top: 100px;">
        <router-link to="/catalog" class="toPage">В каталог</router-link>
      </div>
    </div>
  </main>
  <Footer></Footer>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Card from "@/components/Card.vue";
import Modal from "@/components/Modal.vue";

export default {
  components: { Header, Footer, Card, Modal },
  data() {
    return {
      favoriteCards: [],
      selectedCard: null,
      currentPage: 1,
      itemsPerPage: 8,
    };
  },
  created() {
    const storedFavorites = localStorage.getItem('favoriteCards');
    if (storedFavorites) {
      this.favoriteCards = JSON.parse(storedFavorites);
    }
  },
  computed: {
    paginatedCards() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = this.currentPage * this.itemsPerPage;
      return this.favoriteCards.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.favoriteCards.length / this.itemsPerPage);
    },
    catalogCardsStyle() {
      const rows = Math.ceil(this.paginatedCards.length / 4);
      return {
        gridTemplateRows: `repeat(${rows}, 400px)`,
      };
    },
  },
  methods: {
    openModal(card) {
      this.selectedCard = card;
    },
    closeModal() {
      this.selectedCard = null;
    },
    toggleFavorite(card) {
      const cardIndex = this.favoriteCards.findIndex(fav => fav.id === card.id);
      if (cardIndex > -1) {
        this.favoriteCards.splice(cardIndex, 1);
      } else {
        this.favoriteCards.push(card);
      }
      localStorage.setItem('favoriteCards', JSON.stringify(this.favoriteCards));
      if (this.paginatedCards.length === 0 && this.currentPage > 1) {
        this.currentPage--;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },

  },
};
</script>

<style scoped>

main {
  .catalog {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    gap: 33px;
    margin-bottom: 65px;

    .catalog-cards {
      width: 100%;
      padding: 25px;
      border-radius: 10px;
      display: grid;
      grid-template-columns: repeat(4, 228px);
      grid-column-gap: 66px;
      grid-row-gap: 50px;
    }
  }
}





.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;

  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    background-color: #cacaca;
    border: none;
    border-radius: 5px;
  }

  button:disabled {
    cursor: not-allowed;
  }
}

.isEmpty {
  font-size: 24px;
  color: #999;
  text-align: center;
  margin-top: 20px;
}
.btn{
  margin-bottom: 0;
}
.toPage{
  padding: 20px 45px;
  font-size: 24px;
  background-color: #292B57;
  color: white;
  margin-bottom: 0;
}
</style>
