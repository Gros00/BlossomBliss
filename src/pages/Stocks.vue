<template>
  <div class="wrapper">
    <Header :nav-class="'black'" ></Header>
  </div>
  <div class="slider">
    <img
        class="slide"
        v-for="(slide, index) in slides"
        :key="index"
        :src="slide.src"
        :alt="slide.alt"
        :class="{ active: index === activeSlideIndex }"
    />
    <div class="buttons">
      <div class="btnContainer">
        <img class="prev" @click="prevSlide" src="@/assets/images/slider-arrow-left.png" alt="Previous Slide">
      </div>
      <div class="btnContainer">
        <img class="next" @click="nextSlide" src="@/assets/images/slider-arrow-right.png" alt="Next Slide">
      </div>
    </div>
  </div>
  <main :class="{active: true}">
    <div class="left-block">
      <img v-if="activeSlideIndex === 2" src="@/assets/images/stock-delivery.png" alt="delivery">
      <img v-if="activeSlideIndex === 1" src="">
      <img v-if="activeSlideIndex === 0" src="">
    </div>
    <div class="right-block">
      <div class="description"  v-if="activeSlideIndex === 0">
        — Отличная новость для всех любителей цветов - мы осуществляем бесплатную доставку заказов из нашего интернет-магазина!
        <div style="height: 30px"></div>
        Подарите себе и своим близким радость, наполнив дом яркими красками и ароматами цветов!
      </div>
      <div class="description" style="max-width: 100%" v-if="activeSlideIndex === 1">
        — Новая коллекция цветов уже в продаже! Спешите купить уникальные букеты, созданные нашими лучшими флористами.
        <div style="height: 30px"></div>
        Превосходное качество и удивительная красота — вот что отличает наши цветы от других.
      </div>
      <div class="description" style="max-width: 100%" v-if="activeSlideIndex === 2">
        — Эксклюзивные предложения и скидки до 50% на самые популярные букеты! Только до конца месяца.
        <div style="height: 30px"></div>
        Не упустите шанс порадовать себя и своих близких красивыми цветами по выгодным ценам!
      </div>
      <div class="btn" style="margin-top: 100px;">
        <router-link to="/catalog" class="toPage">В каталог</router-link>
      </div>
    </div>
  </main>

  <Footer></Footer>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue"

export default {
  components: {Header, Footer},
  data() {
    return {
      slides: [
        {
          src: 'https://sun9-1.userapi.com/impg/JcGmiU9aBhOrzfORVtfRq2-yq6GwX7Kwx4q0ZA/l_lWfS-4sqE.jpg?size=1440x810&quality=95&sign=1589a56712b477c9dd5b73d911383d86&type=album',
          alt: 'Slide 1'
        },
        {
          src: 'https://sun9-27.userapi.com/impg/e5WM0k0WcOufq--cdzQm2Vq7hco_FyZ1L_9Gqw/4fvGpZ-3_oY.jpg?size=1280x720&quality=95&sign=342922e00c39e1778bc713f654e4e699&type=album',
          alt: 'Slide 2'
        },
        {
          src: 'https://sun9-76.userapi.com/impg/yXdAWtabDmSAtu_IJ7LVNdaqYf6ZF1ajsmBcVw/x1xtMfhOSBM.jpg?size=1440x810&quality=95&sign=b99868c27f10ab0a7fd9301e95c43a8b&type=album',
          alt: 'Slide 3'
        },
      ],
      activeSlideIndex: 0,
    };
  },
  methods: {
    nextSlide() {
      this.changeSlide(this.activeSlideIndex + 1);
    },
    prevSlide() {
      this.changeSlide(this.activeSlideIndex - 1);
    },
    changeSlide(newSlideIndex) {
      if (newSlideIndex < 0) {
        newSlideIndex = this.slides.length - 1;
      } else if (newSlideIndex >= this.slides.length) {
        newSlideIndex = 0;
      }
      this.activeSlideIndex = newSlideIndex;
    }
  }
};
</script>

<style scoped>
.slider {
  position: relative;
  width: 1440px;
  height: 820px;
  margin: 0 auto;
  overflow: hidden;
}

.slider .slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.slider img.active {
  opacity: 1;
}

main {
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

main.active {
  opacity: 1;
}

.slider button {
  position: relative;
  display: flex;
  background-color: transparent;
  border: 1px solid black;
  cursor: pointer;
  padding: 10px 20px;
}

.slider button img {
  position: absolute;
  z-index: 10;
  cursor: pointer;
}

.buttons {
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 60px;
  top: 50%;

  img {
    cursor: pointer;
    position: absolute;
    z-index: 3;
  }

  img.next {
    right: 0;
  }

  img.prev {
    left: 0;
  }
}

main {
  width: 1440px;
  margin: 40px auto;
  display: flex;
  gap: 20px;
}

.right-block .description {
  font-size: 40px;
  font-family: 'Montserrat';
  font-weight: 400;
  max-width: 590px;
}

.right-block .btn {
  margin-bottom: 0;
}

.right-block .toPage {
  background-color: #292B57;
  color: white;
  margin-bottom: 0;
}
</style>
