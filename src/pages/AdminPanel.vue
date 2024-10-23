<script>
import addCard from "@/components/addCard.vue";
import viewCards from "@/components/viewCards.vue"
export default {
  components: {addCard, viewCards},
  data() {
    return {
      selectedDiv: 'addCard',
    };
  },
  methods: {
    selectDiv(div) {
      this.selectedDiv = div;
    },
  },
};
</script>

<template>
  <div class="header-container">
    <div class="wrapper">
      <div class="admin-header">
        <router-link to="/" class="admin-logo">AdminPanel</router-link>
        <div class="admin-header-right-block">
          <div
              @click="selectDiv('addCard')"
              :class="{ active: selectedDiv === 'addCard' }"
          >
            добавить карточку
          </div>
          <div
              @click="selectDiv('viewCards')"
              :class="{ active: selectedDiv === 'viewCards' }"
          >
            посмотреть все карточки
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="wrapper">

    <div v-if="selectedDiv === 'addCard'" class="content">
      <addCard></addCard>
    </div>
    <div v-if="selectedDiv === 'viewCards'" class="content">
      <viewCards></viewCards>
    </div>
  </div>
</template>

<style scoped>
.header-container {
  background-color: #8e8e8e;
}

.admin-header {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.admin-logo {
  color: black;
  font-size: 32px;
  font-family: Ubuntu;
}

.admin-header-right-block {
  display: flex;
  gap: 25px;
  font-size: 24px;
}

.admin-header-right-block > div {
  font-family: Ubuntu;
  cursor: pointer;
  position: relative;
}

.admin-header-right-block > div::after {
  content: '';
  display: block;
  width: 100%;
  height: 2px;
  background: black;
  position: absolute;
  left: 0;
  bottom: -5px;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.admin-header-right-block > div.active::after {
  transform: scaleX(1);
}

.content {
  margin-top: 20px;
  padding-top: 20px;
}

.add-card-window {
  /* Styles for the add card window */
}

.view-cards-window {
  /* Styles for the view cards window */
}
</style>
