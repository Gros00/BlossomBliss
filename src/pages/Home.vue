<template>

  <section class="main-block" style="background-image: url('src/assets/images/mainBackGround.png');">

    <div class="wrapper">
      <Header :nav-class="'white'"></Header>
      <main>
        <div class="Title">Откройте для себя нашу коллекцию <br> свежих цветов, выращенных с любовью <br>и заботой.
        </div>
        <div class="btn" style="margin-bottom: 301px; margin-top: 100px;">
          <router-link to="/catalog" class="toPage">В каталог</router-link>
        </div>
      </main>
    </div>

  </section>
  <section class="bouquets">
    <div class="wrapper">
      <div class="Title">Наши букеты</div>
      <div class="catalog-wrapper">
        <Card
            v-for="card in cards"
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
      <div class="bouquet_btnLookMore">
        <router-link to="/Catalog">Смотреть другие</router-link>
      </div>
    </div>
  </section>
  <section class="delivery">
    <div class="wrapper">
      <div class="line"></div>
      <div class="main">
        <div class="Title">Доставка и оплата</div>
        <div class="description">
          <div class="text">Наличными, банковской картой и различными платёжными системами</div>
          <div class="circle"></div>
          <div class="text">Доставка занимает
            до часа <br>
            В праздники до 2
          </div>
        </div>
      </div>
      <div class="line"></div>
    </div>
  </section>
  <section class="relationship">
    <div class="wrapper">
      <div class="main">
        <div class="text">Мы относимся бережно к <br> каждому букету, потому что нам <br> важен каждый клиент</div>
        <img src="@/assets/images/relationship.png" alt="">
      </div>
    </div>
  </section>
  <section class="season-flow">
    <div class="wrapper">
      <div class="Title">Сезонные цветы</div>
      <div class="wrapper">
        <div class="main">
          <img src="@/assets/images/season-flow.png" alt="">
          <div class="text"><i style="font-family: Montserrat; font-weight: 400;">Пион</i> — крупный и пышный <br>
            цветок с пленительно-сладким <br> ароматом. Богатая палитра <br>
            оттенков включает в себя <br>
            пастельные (белые, персиковые <br>
            и розовые) цвета, <br>
            а также насыщенные винные <br> и красные
          </div>
        </div>
      </div>
    </div>
  </section>
  <Footer></Footer>
</template>

<script>
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"
import axios from "axios";
import Modal from "@/components/Modal.vue";
import Card from "@/components/Card.vue";

export default {
  components: {Card, Modal, Header, Footer},
  data() {
    return {
      selectedCard:null,
      cards:[
        {
          id: 1,
          title: 'НеСкромный',
          cost: 5555,
          rating: 4.75,
          image: 'https://clck.ru/3BGxAU',
          type: ['Розы', 'Кактусы'],
          to: ['Маме', 'Любимой', 'Деловому партнёру'],
        },
        {
          id: 2,
          title: 'Скромный',
          cost: 4444,
          rating: 4.8,
          type: ['Розы'],
          to: ['Любимой', 'Деловому партнёру'],
          image: 'https://sun9-75.userapi.com/impg/Sp8Fb1p2VaM8lZvMFdfXQq7_vkWXHkn143UeDg/J6DlnDp3qPk.jpg?size=220x175&quality=95&sign=d2822332ddc65b2fcd7e62b53cad137f&type=album',
        },
        {
          id: 3,
          title: 'Ещё как Скромный',
          cost: 7676,
          rating: 4.75,
          type: ['Тюльпаны'],
          to: ['Маме', 'Деловому партнёру'],
          image: 'https://sun9-75.userapi.com/impg/Sp8Fb1p2VaM8lZvMFdfXQq7_vkWXHkn143UeDg/J6DlnDp3qPk.jpg?size=220x175&quality=95&sign=d2822332ddc65b2fcd7e62b53cad137f&type=album',
        },
        {
          id: 4,
          title: 'Ещё как Скромный',
          cost: 10191,
          type: ['Кактусы'],
          rating: 4.75,
          to: ['Маме'],
          image: 'https://clck.ru/3BKa7s',
        },
      ]
    }
  },
  methods:{
    toggleFavorite(card) {
      const cardIndex = this.favoriteCards.findIndex(favorite => favorite.id === card.id)
      if (cardIndex > -1) {
        this.favoriteCards.splice(cardIndex, 1)
      } else {
        this.favoriteCards.push(card)
      }
      localStorage.setItem('favoriteCards', JSON.stringify(this.favoriteCards))
    },
    openModal(card) {
      this.selectedCard = card;
    },
    closeModal() {
      this.selectedCard = null;
    },
    async getCards(){
      const res = await axios.get('http://127.0.0.1:8000/api/mostValuableCards');

      this.cards = res.data[0]
    }
  },
  created() {
    this.getCards()
  }
}
</script>

<style>

</style>