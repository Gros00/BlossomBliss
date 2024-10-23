<script>
export default {
  data() {
    return {

    }
  },
  props:{
    activePage:{
      type: Number,
    },
    totalPage:{
      type: Number
    }
  },
  methods: {
    changeActive(page) {
      this.$emit('update:activePage', page)
    }
  },
  computed: {

  }
}
</script>

<template>
  <div class="container">
    <div class="Page"
         v-for="page in totalPage"
         :class="{'active': page===activePage}"
         @click="changeActive(page)"
    >
      <div class="pageNumber">
        {{ page }}
      </div>
    </div>
  </div>
</template>

<style scoped>

.container {
  height: 50px;
  background-color: #fff;
  box-shadow: 1px 3px 3px rgba(0, 0, 0, 0.5), -1px -1px 3px rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  border-radius: 5px;
  margin-top: 20px;
  .Page {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    cursor: pointer;
    .pageNumber {
      font-size: 24px;

    }
  }

  .Page.active {
    background-color: #292B57;

    .pageNumber {
      color: white;
    }
  }

}
</style>