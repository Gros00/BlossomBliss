<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: { Header, Footer },
  data() {
    return {
      cart: [],
      totalCost:null,
    };
  },
  computed:{
    totalSum() {
      return this.cart.reduce((sum, item) => sum + item.cost * item.counter, 0);
    },
  },
  created() {
    this.loadCart();
  },
  methods: {
    loadCart() {
      try {
        const cart = localStorage.getItem('cart');
        if (cart) {
          this.cart = JSON.parse(cart);
        } else {
          this.cart = [];
        }
      } catch (error) {
        console.error('Error loading cart from localStorage', error);
        this.cart = [];
      }
    },
    saveCart() {
      try {
        localStorage.setItem('cart', JSON.stringify(this.cart));
      } catch (error) {
        console.error('Error saving cart to localStorage', error);
      }
    },
    counterPlus(index) {
      this.cart[index].counter = Number(this.cart[index].counter) + 1;
      this.saveCart();
    },
    counterMinus(index) {
      if (this.cart[index].counter > 1) {
        this.cart[index].counter = Number(this.cart[index].counter) - 1;
      }
      this.saveCart();
    },
    validateCounter(event, index) {
      const inputValue = event.target.value.replace(/[^0-9]/g, '');
      let counter = parseInt(inputValue, 10);

      if (isNaN(counter) || counter < 1) {
        counter = 1;
      } else if (counter > 999) {
        counter = 999;
      }
      this.cart[index].counter = counter;
      this.saveCart();
    },
    removeCard(index) {
      this.cart.splice(index, 1);
      this.saveCart();
    }
  }
}
</script>

<template>
  <div class="wrapper">
    <Header nav-class="black"></Header>
  </div>
  <div class="main">
    <div class="wrapper">
      <div class="pageTitle">Корзина</div>
      <div class="card-container">
        <div
            class="cart-card"
            v-for="(card, index) in cart"
            :key="card.id"
        >
          <div class="left-block">
            <div class="image">
              <img :src="'http://127.0.0.1:8000/storage/'+card.image" alt="">
            </div>
            <div class="title">{{ card.title }}</div>
          </div>
          <div class="right-block">
            <div class="cost">{{ card.cost * card.counter }} ₽</div>
            <div class="counter">
              <div class="minus" @click="counterMinus(index)"><p>-</p></div>
              <input type="text" @input="validateCounter($event, index)" :value="card.counter" class="count">
              <div class="plus" @click="counterPlus(index)"><p>+</p></div>
            </div>
            <div class="btnDel" @click="removeCard(index)">
              <p class="textBtn">Удалить</p>
            </div>
          </div>
        </div>
        <div v-if="!cart.length">Пока пусто</div>
        <div v-if="cart.length" class="total-sum">
          <p>Итоговая сумма: {{ totalSum }} ₽</p>
        </div>
        <div class="option">
          <router-link to="" v-if="cart.length" class="checkout-btn">Перейти к оформлению</router-link>
          <router-link to="/Catalog" v-else class="checkout-btn">В каталог</router-link>
        </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<style scoped>
.main {
  min-height: calc(1080px - (412px + 132px));
}

.pageTitle {
  margin-bottom: 50px;
  font-family: Ubuntu;
  font-weight: 300;
  font-size: 48px;
}

.option {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-bottom: 50px;
}

.cart-card {
  .left-block {
    display: flex;
    gap: 20px;
    align-items: center;

    .image {
      img {
        border-radius: 10px;
        height: 187px;
        width: 145px;
      }
    }

    .title {
      max-width: 350px;
      overflow-wrap: anywhere;
      font-size: 36px;
    }
  }

  .right-block {
    display: flex;
    align-items: center;
    gap: 20px;

    .cost {
      font-size: 32px;
    }
  }

  display: flex;
  gap: 30px;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
}

.counter {
  display: flex;
  width: 160px;
  align-items: center;

  input[type="number"] {
    -moz-appearance: textfield; /* Убирает стрелки в Firefox */
    -webkit-appearance: none; /* Убирает стрелки в Chrome и Safari */
    appearance: none; /* Убирает стрелки в современных браузерах */
    margin: 0;
  }

  .count {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
  }

  div, input {
    font-size: 36px;
    font-family: Ubuntu;
    font-weight: 400;
    align-self: center;
    border: none;

    p {
      -moz-user-select: none;
      user-select: none;
    }
  }

  .plus, .minus {
    cursor: pointer;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.textBtn {
  cursor: pointer;
  padding: 10px 15px;
  background-color: red;
  color: white;
  border-radius: 5px;
  font-size: 16px;
}

.checkout-btn {
  padding: 10px 15px;
  background-color: #292B57;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
}
.total-sum{
  font-size: 24px;
  display: flex;
}
</style>
