<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal">
      <div class="information">
        <button class="close-button" @click="closeModal">x</button>
        <div class="left">
          <img :src="'http://127.0.0.1:8000/storage/' + card.image" alt="">
        </div>
        <div class="right">
          <div class="title">{{ card.title }}</div>
          <div class="cost">{{ card.cost }} ₽</div>
          <div class="counter">
            <div class="minus" @click="counterMinus"><p>-</p></div>
            <input type="text" @input="validateCounter" v-model="counter" class="count">
            <div class="plus" @click="counterPlus"><p>+</p></div>
          </div>
          <div @click="addToCart(card)" class="btn" style="margin-top: 50px">
            <p class="toPage">Добавить в корзину</p>
          </div>
          <transition name="fade">
            <div v-if="isAddedToCart" class="confirmation-message">
              Товар успешно добавлен в корзину!
            </div>
          </transition>
        </div>
      </div>
      <div class="feedbacks">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  data() {
    return {
      counter: 1,
      cardElement: {},
      CartCards: [],
      isAddedToCart: false
    }
  },
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    counterPlus() {
      this.counter++;
    },
    counterMinus() {
      if (this.counter > 1) {
        this.counter--;
      }
    },
    validateCounter(event) {
      const inputValue = event.target.value.replace(/[^0-9]/g, '');
      this.counter = parseInt(inputValue, 10);

      if (isNaN(this.counter) || this.counter < 1) {
        this.counter = 1;
      } else if (this.counter > 999) {
        this.counter = 999;
      }
    },
    addToCart(card) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        alert('Авторизуйтесь, прежде чем добавлять в корзину');
        return;
      }
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      let existingItem = cart.find(item => item.id === card.id);

      if (existingItem) {
        existingItem.counter = this.counter;
      } else {
        this.cardElement = {...card, counter: this.counter};
        cart.push(this.cardElement);
      }

      localStorage.setItem('cart', JSON.stringify(cart));

      this.isAddedToCart = true;

      setTimeout(() => {
        this.isAddedToCart = false;
      }, 3000);
    }
  },
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  min-width: 50vw;
  min-height: 50vh;
  background: white;
  padding: 58px;
  border-radius: 4px;
  position: relative;
}

.information {
  max-width: 50vw;
  display: flex;
}

.left {
  margin-right: 95px;
}

.left img {
  border-radius: 25px;
  width: 396px;
  height: 497px;
}

.right {
  .title {
    overflow-wrap: anywhere;
    font-size: 36px;
    font-family: Ubuntu;
    font-weight: 400;
  }

  .cost {
    font-weight: 500;
    font-family: Ubuntu;
    font-size: 24px;
    margin-top: 25px;
  }

  .counter {
    margin-top: 180px;
    display: flex;
    width: 160px;
    align-items: center;
  }

  .counter input[type="number"] {
    -moz-appearance: textfield;
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
  }

  .counter .count {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
  }

  .counter div, .counter input {
    border: none;
    font-size: 36px;
    font-family: Ubuntu;
    font-weight: 400;
    align-self: center;
  }

  .counter .plus, .counter .minus {
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}

.toPage {
  color: white;
  background-color: #292B57;
  padding: 20px 30px;
  font-weight: 500;
  border-radius: 20px;
  font-size: 24px;
  margin-bottom: 0 !important;
  text-align: center;
  display: block;
  white-space: nowrap;
}

.btn {
  cursor: pointer;
  display: inline-block;
}

.close-button {
  position: absolute;
  top: -13px;
  right: -27px;
  background: none;
  border: none;
  font-size: 40px;
  cursor: pointer;
  font-family: Montserrat;
}

.confirmation-message {
  margin-top: 20px;
  font-size: 18px;
  color: green;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
