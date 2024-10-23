<template>
  <div class="wrapper">
    <Header nav-class="black"></Header>
  </div>
  <main>
    <div class="wrapper">
      <div class="Title">Здравствуй, {{user.name}}</div>
      <div class="tabs">
        <div v-for="(tab, index) in tabs" :key="index" class="tab-link" :class="{ active: activeTab === index }" @click="setActiveTab(index)">
          <div class="link" :class="{ active: activeTab === index }">{{ tab }}</div>
        </div>
      </div>
      <div class="open-tab">
        <transition name="fade" mode="out-in">
          <component :is="currentTabComponent" :key="activeTab"></component>
        </transition>
      </div>
    </div>
  </main>
  <Footer></Footer>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Profile from "@/components/Profile.vue";
import OrderHistory from "@/components/OrderHistory.vue";
import Bonuses from "@/components/Bonuses.vue";
import Settings from "@/components/Settings.vue";

export default {
  components: { Header, Footer },
  data() {
    return {
      tabs: ["Профиль", "История заказов", "Бонусы и скидки", "Настройки"],
      activeTab: 0,
      user:{},
    };
  },
  computed: {
    currentTabComponent() {
      switch (this.activeTab) {
        case 0:
          return Profile;
        case 1:
          return OrderHistory;
        case 2:
          return Bonuses;
        case 3:
          return Settings;
        default:
          return Profile;
      }
    }
  },
  methods: {
    setActiveTab(index) {
      this.activeTab = index;
    }
  },
  created() {
    let profile = JSON.parse(localStorage.getItem('user'));
    this.user = profile
  }
}
</script>

<style scoped>
main {
  color: black;
}
.tabs {
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 10px;
  gap: 5px;
  cursor: pointer;
}
.tab-link.active {
  border-radius: 10px;
  transition: .5s ease-in-out;
}
.tab-link {
  border-radius: 5px;
  box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.5);
  width: calc(100% / 4);
  border: 1px solid rgba(0, 0, 0, 0.34);
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.link {
  text-align: center;
  transition: .3s ease-in-out;
  font-size: 20px;
}
.link.active {
  font-size: 24px;
  padding-bottom: 3px;
  border-bottom: 3px solid rgba(0, 0, 0, 0.5);
  text-align: center;
  transition: .5s ease-in-out;
}

</style>
