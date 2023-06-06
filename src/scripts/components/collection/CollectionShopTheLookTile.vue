<template lang="pug">
  .collection-shop-the-look-tile.zoom-transition(
    @click="openShopTheLook"
  )
    img.collection-shop-the-look-tile__image(
      :src="shopTheLookTile.imageUrl"
      :alt="shopTheLookTile.imageAlt"
    )
    .collection-shop-the-look-tile__text
      h3 {{ shopTheLookTile.title }}
</template>

<script>
  export default {
    name: "CollectionShopTheLookTile",
    props: {
      shopTheLookTile: Object,
      default: () => ({
        enabled: Number,
        position: Number,
        imageUrl: String,
        imageAlt: String,
        title: String,
        products: Array,
      })
    },
    methods: {
      openShopTheLook () {
        this.$emit('clicked', true)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .collection-shop-the-look-tile {
    display: flex;
    position: relative;
    height: 100%;
    width: 100%;

    &:hover {
      cursor: pointer;
    }

    @include tablet-only {
      height: 100%;
    }

    @include mobile-only {
      height: 100%;
    }

    &__image {
      object-fit: cover;
      object-position: center;
    }

    &__text {
      position: absolute;
      bottom: 0;
      left: 0;
      margin-bottom: 24px;
      background-color: rgba(255, 255, 255, 0.8);
      padding: 12px 28px 16px 24px;
      color: $color-text-dark;

      @include mobile-only {
        margin-top: 8px;
        padding: 8px 8px 16px 8px;
      }

      h3 {
        margin-bottom: 0px;
        letter-spacing: 1px;
        line-height: 28px;

        @include mobile-only {
          font-size: 20px;
          line-height: 24px;
          letter-spacing: 0.7px;
        }
      }

      a {
        font-size: 16px;
        line-height: 24px;
        text-decoration: underline;
        &:visited {
          color: $color-text-dark;
        }
        &:hover {
          color: $color-text-accent;
        }
        &:active {
          text-decoration: none;
        }
      }
    }
  }
</style>
