<template>
  <div class="catalog__card" @click="handleClick()">
    <div class="upper-info">
      <img
          :src="'http://127.0.0.1:8000/storage/'+`${card.image}`"
          alt="" class="card__image">
      <div class="card__title">{{card.title}}</div>
      <div class="card__cost">{{card.cost}} ₽</div>
    </div>
    <div class="card__add-information">
      <div class="card-fav" @click.stop="toggleFavorite">
        <img
            :src='isFavorite ? "/src/assets/images/heart-red.png" : "/src/assets/images/heart-empty.png"'
            alt="favorite icon"
            class="heart-icon"
            style="height: 50px; width: 50px;"
        >
      </div>
      <div class="card-rating">
        <svg class="image-rating" width="27" height="24" viewBox="0 0 13 12" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path
              d="M10.4513 11.9658C9.98879 12.2851 7.0212 10.2612 6.45284 10.2568C5.88448 10.2524 2.88349 12.2297 2.42639 11.9033C1.96928 11.5768 3.04391 8.22379 2.87265 7.70004C2.7014 7.1763 -0.171872 5.02898 0.00811114 4.50796C0.188134 3.98694 3.81987 3.93855 4.28237 3.61927C4.74487 3.30003 5.97011 -0.00440549 6.53851 4.40988e-06C7.10683 0.00445266 8.27672 3.32757 8.73382 3.65401C9.19093 3.98042 12.8214 4.08549 12.9927 4.60924C13.164 5.13298 10.2553 7.2352 10.0753 7.75622C9.89527 8.27724 10.9138 11.6466 10.4513 11.9658Z"
              fill="url(#paint0_linear_88_603)"/>
          <defs>
            <linearGradient id="paint0_linear_88_603" x1="1.664e-05" y1="6.00001" x2="13"
                            y2="6.00001" gradientUnits="userSpaceOnUse">
              <stop stop-color="#FCD635"/>
              <stop offset="1" stop-color="#F7A928"/>
            </linearGradient>
          </defs>
        </svg>
        <div class="title-rating">{{ card.rating }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'card',
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  data(){
    return{
      isFavorite: false
    }
  },
  created() {
    this.checkIfFavorite();
  },
  methods: {
    handleClick() {
      this.$emit('card-clicked', this.card);
    },
    toggleFavorite() {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        alert('Авторизуйтесь, прежде чем добавлять в избранное');
        return;
      }

      const storedFavorites = JSON.parse(localStorage.getItem('favoriteCards')) || [];
      const cardIndex = storedFavorites.findIndex(fav => fav.id === this.card.id);
      if (cardIndex > -1) {
        storedFavorites.splice(cardIndex, 1);
        this.isFavorite = false;
      } else {
        storedFavorites.push(this.card);
        this.isFavorite = true;
      }
      localStorage.setItem('favoriteCards', JSON.stringify(storedFavorites));
      this.$emit('favorite-toggled', this.card);
    },
    checkIfFavorite() {
      const storedFavorites = JSON.parse(localStorage.getItem('favoriteCards')) || [];
      this.isFavorite = storedFavorites.some(fav => fav.id === this.card.id);
    }
  }
}
</script>

<style scoped>

.catalog__card{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
}
</style>