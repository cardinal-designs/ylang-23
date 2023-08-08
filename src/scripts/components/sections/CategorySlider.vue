<template>
  <section class="category-slider">
    <div class="container">
      <div class="category-slider__title-wrapper">
        <h2 class="category-slider__title">{{ schema.settings.title }}</h2>
        <div class="category-slider__btn">
          <button class="category-slider__btn__previous-slide" @click="previousSlide">
            <icon name="chevron-left" size="14px" />
          </button>
          <button class="category-slider__btn__next-slide" @click="nextSlide">
            <icon name="chevron-right" size="14px" />
          </button>
        </div>
      </div>
      <swiper :options="desktopOptions" ref="categorySlider">
        <swiper-slide v-for="block in schema.blocks" :key="block.id">
          <v-link :href="block.settings.slider_link_url" class="category-slider__slide">
            <div class="category-slider__slide__image" v-if="block.settings.slider_image.src">
              <img :src="block.settings.slider_image.src" :alt="block.settings.slider_image.alt" />
            </div>
            <div class="category-slider__detail">
              <p>{{ block.settings.slider_title }}</p>
              <icon name="chevron-right" size="10px" />
            </div>
          </v-link>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Icon from '../basic/Icon.vue';
import VLink from '../buttons/VLink.vue'
export default {
  name: "CategorySlider",
  components: {
    swiper,
    swiperSlide,
    Icon,
    VLink
  },
  props: {
    schema: {
      type: Object
    }
  },
  data() {
    return {
      desktopOptions: {
        slidesPerView: 4,
        spaceBetween: 30,
        loop: true,
        breakpoints: {
          765: {
            spaceBetween: 15,
            slidesPerView: 2,
          }
        },
      },
    };
  },
  methods: {
    nextSlide() {
      this.$refs.categorySlider.swiper.slideNext();
    },
    previousSlide() {
      this.$refs.categorySlider.swiper.slidePrev()();
    }
  },
}
</script>
<style scoped lang="scss">
.category-slider {
  padding: 35px 0 70px 0;

  @media(max-width: 768px) {
    padding: 18px 0 36px 0;
  }

  &__detail {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 5px;

    p {
      color: #000000;
    }
  }

  &__title-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-bottom: 35px;

    @media(max-width: 768px) {
      text-align: left;
      margin-bottom: 18px;
    }
  }

  &__btn__previous-slide {
    padding-right: 15px;
  }

  &__btn__next-slide {
    padding-left: 15px;
  }

  &__title {
    width: 80%;
    margin-left: 20%;

    @media(max-width: 768px) {
      margin-left: 0%;
    }
  }

  &__btn {
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: end;
  }
}
</style>