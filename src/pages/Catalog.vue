<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Card from "@/components/Card.vue";
import Modal from "@/components/Modal.vue";
import Pagination from "@/components/Pagination.vue";
import axios from "axios";

export default {
  components: {Pagination, Header, Footer, Card, Modal},
  props: {},
  data() {
    return {
      filters: [
        {
          title: 'Flower',
          titleRus: 'Цветы',
          isOpen: false,
          options: ['Розы', 'Тюльпаны', 'Кактус', 'Пионы', 'Лилия', 'Гипсофилы'],
        },
        {
          title: 'To',
          titleRus: 'Кому',
          isOpen: false,
          options: ['Маме', 'Девушке', 'Жене', 'Подруге'],
        }
      ],
      selectedFlower: [],
      selectedTo: [],
      cards: [],

      priceMin: 0,
      priceMax: 50000,
      sliderMin: 0,
      sliderMax: 50000,
      selectedCard: null,
      favoriteCards: [],
      activePage: 1,
      cardsPerPage: 9,
      selectedSort: 'рейтингу',
      filteringCard: [],
      Arr: [],
    };
  },
  computed: {
    filteredCards() {
      const filteredByCost = this.cards.filter(card => {
        const priceFilter = card.cost >= this.priceMin && card.cost <= this.priceMax;
        return priceFilter;
      });
      const filteredByFlowers = filteredByCost.filter(card => {

        const length = this.selectedFlower.length;
        switch (length) {
          case(0):
            return true
          case(1):
            return card.type.includes(this.selectedFlower[0])
          case(2):
            return card.type.includes(this.selectedFlower[1]) && card.type.includes(this.selectedFlower[0])
          case(3):
            return card.type.includes(this.selectedFlower[2]) && card.type.includes(this.selectedFlower[1]) && card.type.includes(this.selectedFlower[0])
          case(4):
            return card.type.includes(this.selectedFlower[0]) && card.type.includes(this.selectedFlower[1]) && card.type.includes(this.selectedFlower[2]) && card.type.includes(this.selectedFlower[3])
          case(5):
            return card.type.includes(this.selectedFlower[0]) && card.type.includes(this.selectedFlower[1]) && card.type.includes(this.selectedFlower[2]) && card.type.includes(this.selectedFlower[3]) && card.type.includes(this.selectedFlower[4])
          case(6):
            return card.type.includes(this.selectedFlower[0]) && card.type.includes(this.selectedFlower[1]) && card.type.includes(this.selectedFlower[2]) && card.type.includes(this.selectedFlower[3]) && card.type.includes(this.selectedFlower[4]) && card.type.includes(this.selectedFlower[5])
        }
      })
      const filteredByTo = filteredByFlowers.filter(card => {
        const length = this.selectedTo.length;
        switch (length) {
          case(0):
            return true
          case(1):
            return card.to.includes(this.selectedTo[0])
          case(2):
            return card.to.includes(this.selectedTo[1]) || card.to.includes(this.selectedTo[0])
          case(3):
            return card.to.includes(this.selectedTo[2]) || card.to.includes(this.selectedTo[1]) || card.to.includes(this.selectedTo[0])
          case(4):
            return card.to.includes(this.selectedTo[3]) || card.to.includes(this.selectedTo[2]) || card.to.includes(this.selectedTo[1])|| card.to.includes(this.selectedTo[0])
          case(5):
            return card.to.includes(this.selectedTo[4]) || card.to.includes(this.selectedTo[3]) || card.to.includes(this.selectedTo[2])|| card.to.includes(this.selectedTo[1]) || card.to.includes(this.selectedTo[0])
        }
      })
      return filteredByTo
    },
    paginatedCards() {
      const start = (this.activePage - 1) * this.cardsPerPage;
      const end = this.activePage * this.cardsPerPage;
      let final = this.filteredCards
      return final.slice(start, end)
    },
    totalPages() {
      return Math.ceil(this.filteredCards.length / this.cardsPerPage)
    },
  },
  created() {
    this.getCards()
    const storeFavorites = localStorage.getItem('favoriteCards')
    if (storeFavorites) {
      this.favoriteCards = JSON.parse(storeFavorites)
    }

    this.SortBy()
  },

  methods: {
    async getCards() {
      let res = await axios.get('http://127.0.0.1:8000/api/get-cards')

      res.data.forEach(card => {
        this.cards.push(card);

        if (typeof card.to === 'string') {
          card.to = card.to.split(' ');
        }
        if (typeof card.type === 'string') {
          card.type = card.type.split(' ');
        }
      })
    },
    SortBy() {
      if (this.selectedSort === 'рейтингу') {
        this.cards.sort((a, b) => b.rating - a.rating)
      } else if (this.selectedSort === 'возвышению цены') {
        this.cards.sort((a, b) => a.cost - b.cost)
      } else if (this.selectedSort === 'убыванию цены') {
        this.cards.sort((a, b) => b.cost - a.cost)
      }
    },
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
    toggleFilter(index) {
      this.filters[index].isOpen = !this.filters[index].isOpen;
      this.$nextTick(() => {
        const hiddenFilter = this.$refs.hiddenFilters[index];
        hiddenFilter.style.display = 'flex';
        if (this.filters[index].isOpen) {
          const height = hiddenFilter.scrollHeight + 'px';
          hiddenFilter.style.height = '0px';
          requestAnimationFrame(() => {
            hiddenFilter.style.height = height;
          });
        } else {
          hiddenFilter.style.height = hiddenFilter.scrollHeight + 'px';
          requestAnimationFrame(() => {
            hiddenFilter.style.height = '0px';
          });
          hiddenFilter.addEventListener(
              'transitionend',
              () => {
                if (!this.filters[index].isOpen) {
                  hiddenFilter.style.display = 'none';
                }
              },
              {once: true}
          );
        }
      });
    },
    syncInputs() {
      if (this.sliderMin > this.sliderMax - 100) {
        if (event.target.id === 'slider-min') {
          this.sliderMin = this.sliderMax - 100;
        } else {
          this.sliderMax = this.sliderMin + 100;
        }
      }
      this.priceMin = this.sliderMin;
      this.priceMax = this.sliderMax;
    },
    syncSliders() {
      if (this.priceMin > this.priceMax - 100) {
        if (event.target.id === 'price-min') {
          this.priceMin = this.priceMax - 100;
        } else {
          this.priceMax = this.priceMin + 100;
        }
      }
      this.sliderMin = this.priceMin;
      this.sliderMax = this.priceMax;
    },
    filtering(title, option) {
      title === 'Flower' ? this.filterFlower(option) : this.filterTo(option)
    },
    filterFlower(option) {
      const index = this.selectedFlower.indexOf(option)
      if (index === -1) {
        this.selectedFlower.push(option)
      } else {
        this.selectedFlower.splice(index, 1)
      }
    },

    filterTo(option) {
      const index = this.selectedTo.indexOf(option)
      if (index === -1) {
        this.selectedTo.push(option)
      } else {
        this.selectedTo.splice(index, 1)
      }
    },
  }
}


</script>

<template>
  <div class="wrapper">
    <Header :nav-class="'black'"></Header>
  </div>
  <main>
    <div class="wrapper">
      <div class="Title">Каталог</div>
      <div class="sort">
        <div class="sort-by">сортировать по:</div>
        <select v-model="selectedSort" name="" @change="SortBy">
          <option selected value="рейтингу">рейтингу</option>
          <option value="убыванию цены">убыванию цены</option>
          <option value="возвышению цены">возвышению цены</option>
        </select>
      </div>
      <div class="catalog">
        <div class="filters">
          <div class="filter" v-for="(filter, filterIndex) in filters" :key="filterIndex">
            <div class="filter-title" @click="toggleFilter(filterIndex)">
              {{ filter.titleRus }}
            </div>
            <div
                ref="hiddenFilters"
                class="hidden-filter"
                :class="{ show: filter.isOpen }"
                v-show="filter.isOpen"
            >
              <label class="checkbox" v-for="(option, optionIndex) in filter.options" :key="optionIndex">
                <input type="checkbox"

                       :value="option"
                       @change="filtering(filter.title, option)"
                       :name="filter.options[optionIndex]">
                <span class="input-text">{{ option }}</span>
              </label>
            </div>
          </div>

          <div class="slider-cost">
            <div class="price-title">Цена</div>
            <div class="price-inputs">
              <input type="number" id="price-min" v-model.number="priceMin" min="0" max="50000" @input="syncSliders">
              <input type="number" id="price-max" v-model.number="priceMax" min="0" max="50000" @input="syncSliders">
            </div>
            <div class="slider">
              <div class="track"></div>
              <input type="range" step="10" id="slider-min" min="0" max="50000" v-model.number="sliderMin"
                     @input="syncInputs">
              <input type="range" step="10" id="slider-max" min="100" max="50000" v-model.number="sliderMax"
                     @input="syncInputs">
            </div>
          </div>
        </div>
        <div class="right-block">

          <div class="catalog-cards" style="background-color: #ECE4E4">
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
          <Pagination
              :totalPage="totalPages"
              v-model:activePage="activePage"
          >
          </Pagination>
        </div>
      </div>
    </div>
  </main>
  <Footer></Footer>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');


.main-block {
  height: auto;

  nav {
    display: flex;
    gap: 47px;
    justify-content: flex-end;
  }
}

main {
  .Title {
    margin-bottom: 50px;
    font-family: Ubuntu;
    font-weight: 300;
  }

  .sort {
    display: flex;
    justify-content: right;
    flex-direction: row;
    gap: 5px;
    align-items: center;

    .sort-by {
      font-family: Inter;
      font-size: 20px;
      font-weight: 200;
    }

    select {
      font-family: Inter;
      font-size: 20px;
      font-weight: 200;
      outline: none;
      border: none;
      appearance: none;
      padding: 3px;
      transition: all .27s ease-in-out;
      cursor: pointer;

      option {
        border: none;
        font-family: Inter;
        font-size: 20px;
        font-weight: 200;
        outline: none;
        border: none;
        appearance: none;
        padding: 3px;
        background-color: inherit;
        transition: all 3.27s ease-in-out;
      }


    }
  }

  .catalog {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 33px;
    margin-bottom: 65px;

    .filters {
      width: 352px;
      height: 100%;
      background-color: #ECE4E4;
      border-radius: 10px;
      padding: 45px;

      .filter {
        .filter-title {
          display: inline-block;
          cursor: pointer;
          font-size: 32px;
          position: relative;
        }

        .hidden-filter {
          display: none;
          flex-direction: column;
          gap: 5px;
          overflow: hidden;
          height: 0;
          transition: height 0.5s ease-in-out;

          .checkbox {
            display: flex;
            align-items: center;
            gap: 5px;
            position: relative;

            .input-text {
              font-size: 24px;
            }

            input {
              width: 24px;
              height: 24px;
              margin-right: 15px;
              background-color: #fff;
            }


          }


        }

        .hidden-filter.show {
          display: flex;
          height: auto;
        }

        margin-bottom: 24px;
      }

      .price-title {
        font-size: 24px;
        margin-bottom: 18px;
      }

      .price-inputs {
        justify-content: center;
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
      }

      .price-inputs input {
        padding: 10px 15px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #fff;
        font-size: 14px;
        width: calc(((100%) / 2) - 10px);
        outline: none;
      }

      input[type=number] {
        -moz-appearance: textfield; /* Убирает стрелки в Firefox */
        -webkit-appearance: none; /* Убирает стрелки в Chrome и Safari */
        appearance: none; /* Убирает стрелки в современных браузерах */
        margin: 0; /* Убирает возможный дополнительный отступ */
      }

      input[type=number]::-webkit-outer-spin-button,
      input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      .slider {
        position: relative;
        margin: 0 auto;
        height: 30px;
      }

      .track {
        position: absolute;
        top: 50%;
        left: 0;
        margin-left: 5px;
        width: calc(100% - 10px);
        height: 25px;
        background: #fff;
        border-radius: 5px;
        transform: translateY(-50%);
      }

      .slider input[type=range] {
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
        background: none;
        z-index: 0;
      }

      .slider input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 30px;
        background: none;
        border: none;

        border-radius: 3px;
      }

      .slider input[type=range]::-webkit-slider-thumb {
        pointer-events: all;
        width: 30px;
        height: 30px;
        background: #fff;
        border-radius: 50%;
        cursor: pointer;
        -webkit-appearance: none;
        position: relative;
        z-index: 3;
        box-shadow: -1px 0 2px rgba(0, 0, 0);
      }

      .slider input[type=range]::-moz-range-thumb {
        pointer-events: all;
        width: 20px;
        height: 20px;
        background: #fff;
        border: 2px solid #ccc;
        border-radius: 50%;
        cursor: pointer;
        z-index: 3;
        position: relative;
        box-shadow: -1px 0 2px rgba(0, 0, 0);
      }

      .slider input[type=range]::-moz-range-track {
        width: 100%;
        height: 8px;
        background: none;
        border: none;
        border-radius: 3px;
      }
    }

    .catalog-cards {
      min-height: 1300px;
      padding: 25px;
      border-radius: 10px;
      display: grid;
      grid-template-columns: repeat(3, 228px);
      grid-template-rows: repeat(3, auto);
      grid-column-gap: 66px;
      grid-row-gap: 50px;
    }
  }
}

.catalog-cards, .filters {
  box-shadow: 2px 0 3px rgba(0, 0, 0, 0.5);
}

.hidden-filter {
  transition: height 0.3s ease;
  overflow: hidden;
}

.hidden-filter.show {
  height: auto;
}
</style>
