<template lang="pug">
  .header__dropdown-container
    .header__dropdown-container-inner
      .header__dropdown-inner-small-images-container
        .header__dropdown-image-outer-container(v-if="block.image_1")
          a.header__dropdown-image-outer-content-container.clip-transition(v-if="block.image_1_url", :href="block.image_1_url")
            .header__dropdown-image-container
              img.header__dropdown-image(:src="imageSize(block.image_1, '300x')", :alt="block.image_1_text", loading="lazy")
            .header-menu-image-title.link.link--primary(v-if="block.image_1_text") {{ block.image_1_text }}
              icon.menu-image-link-arrow(name="arrow_long_right", size="24px")
          .header__dropdown-image-outer-content-container.clip-transition(v-else)
            .header__dropdown-image-container
              img.header__dropdown-image(:src="imageSize(block.image_1, '300x')", :alt="block.image_1_text", loading="lazy")
            p.header-menu-image-title(v-if="block.image_1_text") {{ block.image_1_text }}
        .header__dropdown-image-outer-container(v-if="block.image_2")
          a.header__dropdown-image-outer-content-container.clip-transition(v-if="block.image_2_url", :href="block.image_2_url")
            .header__dropdown-image-container
              img.header__dropdown-image(:src="imageSize(block.image_2, '300x')", :alt="block.image_2_text", loading="lazy")
            .header-menu-image-title.link.link--primary(v-if="block.image_2_text") {{ block.image_2_text }}
              icon.menu-image-link-arrow(name="arrow_long_right", size="24px")
          .header__dropdown-image-outer-content-container.clip-transition(v-else)
            .header__dropdown-image-container
              img.header__dropdown-image(:src="imageSize(block.image_2, '300x')", :alt="block.image_2_text", loading="lazy")
            p.header-menu-image-title(v-if="block.image_2_text") {{ block.image_2_text }}
        .header__dropdown-image-outer-container(v-if="block.image_3")
          a.header__dropdown-image-outer-content-container.clip-transition(v-if="block.image_3_url", :href="block.image_3_url")
            .header__dropdown-image-container
              img.header__dropdown-image(:src="imageSize(block.image_3, '300x')", :alt="block.image_3_text", loading="lazy")
            .header-menu-image-title.link.link--primary(v-if="block.image_3_text") {{ block.image_3_text }}
              icon.menu-image-link-arrow(name="arrow_long_right", size="24px")
          .header__dropdown-image-outer-content-container.clip-transition(v-else)
            .header__dropdown-image-container
              img.header__dropdown-image(:src="imageSize(block.image_3, '300x')", :alt="block.image_3_text", loading="lazy")
            p.header-menu-image-title(v-if="block.image_3_text") {{ block.image_3_text }}
        .header__dropdown-image-outer-container(v-if="block.image_4")
          a.header__dropdown-image-outer-content-container.clip-transition(v-if="block.image_4_url", :href="block.image_4_url")
            .header__dropdown-image-container
              img.header__dropdown-image(:src="imageSize(block.image_4, '300x')", :alt="block.image_4_text", loading="lazy")
            .header-menu-image-title.link.link--primary(v-if="block.image_4_text") {{ block.image_4_text }}
              icon.menu-image-link-arrow(name="arrow_long_right", size="24px")
          .header__dropdown-image-outer-content-container.clip-transition(v-else)
            .header__dropdown-image-container
              img.header__dropdown-image(:src="imageSize(block.image_4, '300x')", :alt="block.image_4_text", loading="lazy")
            p.header-menu-image-title(v-if="block.image_4_text") {{ block.image_4_text }}
</template>

<script>
  import Icon from 'scripts/components/basic/Icon.vue'
  import { imageSize } from '../../helpers/util';

  export default {
    name: 'NavbarDesktopSmallImageBlocks',
    components: { Icon },
    props: {
      block: Object
    },
    methods: {
      imageSize
    }
  }
</script>

<style scoped lang="scss">
  .header__dropdown-container-inner {
    display: flex;
    flex-direction: column;
    width: 100%;

    @include desktop-up {
      flex-direction: row;
      justify-content: space-between;
      max-width: $container-max-width;
      margin-left: auto;
      margin-right: auto;
      padding-left: 30px;
      padding-right: 30px;
    }
  }

  .header-menu-image-title {
    font-size: 16px;
    margin-top: 2px;
    display: flex;
    align-items: center;
    color: $color-brand-secondary;
    display: inline-block;
    width: 162px;
    letter-spacing: 0;
    line-height: 24px;
    text-align: center;

    &:hover {

      &::before {
        background-color: $color-brand-primary;
      }
    }
  }

  .header__dropdown-inner-small-images-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .header__dropdown-image-outer-container {
    margin-right: 32px;
    max-width: 290px;
  }

  .header__dropdown-image-outer-container:last-child {
    margin-right: 0;
    width: 30%;
  }



</style>