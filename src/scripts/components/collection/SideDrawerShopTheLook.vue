<template lang="pug">
  .sidecart-wrapper
    transition(name="fade")
      .sidecart__overlay(v-if="shopTheLookOpen", @click="$store.dispatch('shopTheLook/closeDrawer')")
    transition(name="off-canvas-right")
      .sidecart(v-show="shopTheLookOpen" v-scroll-lock="shopTheLookOpen && isNotMobile")
        .shop-the-look-drawer
          .shop-the-look-drawer__header
            p.h2.shop-the-look-drawer__title SHOP THE LOOK
            button.sidecart__close.shop-the-look-drawer__close(label="Close shop the look", @click="$store.dispatch('shopTheLook/closeDrawer')", aria-label="Close shop the look")
              icon(name="close" size="24px")
          .shop-the-look-drawer__scrolling-container
            .shop-the-look-drawer__main
              .shop-the-look-drawer__card(
                v-for="(product) in shopTheLookTile.products"
                :key="product.handle"
              )
                a.shop-the-look-drawer__product-image(:href="product.url")
                  img.shop-the-look-drawer__product-image-img(
                    :src="product.featuredImage"
                  )
                .shop-the-look-drawer__product-details
                  p.shop-the-look-drawer__product-vendor {{ product.vendor }}
                  p.shop-the-look-drawer__product-title {{ product.title }}
                  p.shop-the-look-drawer__price(v-if="isCallForPrice(product)") Call For Price
                  .shop-the-look-drawer__price-container(v-else)
                    span.shop-the-look-drawer__compare-price(v-if="(product.price < product.compareAtPrice)")
                      span.shop-the-look-drawer__price {{ product.compareAtPrice }}
                    span.shop-the-look-drawer__price() {{ product.price }}
                  toggle-atc(
                    v-if="!isCallForPrice(product)"
                    :product="product"
                  )
            .shop-the-look-drawer__add-all-cart
              async-button.button.button--primary.shop-the-look-drawer__add-all-cart-button(
                v-if="!allItemIsInCart"
                @click="addAllToCart"
                :promise="addToCartPromise"
              ) Add {{ numberOfProductsInShopTheLook }} Products to Bag
              async-button.pdp__atc.product-form__atc.button--secondary.toggle-atc__added.shop-the-look-drawer__add-all-cart-button(
                v-else
                disabled
              )
                icon(name="check-black", size="24")
</template>

<script>
  import { isCallForPrice } from '../../helpers/util';
  import { mapState } from 'vuex'
  import Icon from 'scripts/components/basic/Icon.vue'
  import AsyncButton from '../buttons/AsyncButton.vue';
  import ToggleAtc from '../buttons/ToggleAtc.vue';
  import VButton from '../buttons/VButton.vue';

  export default {
    name: 'SidecartShopTheLook',
    components: {
      ToggleAtc,
      AsyncButton,
      VButton,
      Icon
    },
    props: {
      shopTheLookTile: Object,
    },
    data() {
      return {
        allItemIsInCart: false,
        addToCartPromise: null,
        errors: [],
      };
    },
    computed: {
      ...mapState({
        shopTheLookOpen: state => state.shopTheLook.shopTheLookOpen,
        itemsInCart: state => state.cart.checkout.items
      }),
      numberOfProductsInShopTheLook() {
        return this.shopTheLookTile.products.length;
      },
      isNotMobile() {
        if (this.$mq !== 'mobile') {
          return true
        } return false
      }
    },
    methods: {
      isCallForPrice,
      closeSidecartShopTheLook() {
        this.shopTheLookOpen = false;
      },
      addToCart(variant) {
        if (this.errors.length) return false;
        let items = [];
        items.push({
          id: variant.id,
          quantity: 1
        });
        this.addToCartPromise = this.$store
          .dispatch('cart/addItems', items)
          .catch((error) => this.$store.dispatch('toast/send', { text: error, type: 'error' }));
        return this.addToCartPromise;
      },
      addAllToCart() {
        if (this.errors.length) return false;
        let itemsToAdd = this.shopTheLookTile.products.map(product =>  {
          return {
            id: product.selectedOrFirstAvailableVariant.id,
            quantity: 1
          }
        });
        this.addToCartPromise = this.$store
          .dispatch('cart/addItems', itemsToAdd)
          .then(() => window.setTimeout(() => this.allItemIsInCart = true , 150))
          .then(() => window.setTimeout(() => this.$store.dispatch('shopTheLook/closeDrawer'), 500))
          .then(() => window.setTimeout(() => this.$store.dispatch('cart/afterAddToCart'), 1000))
          .catch((error) => this.$store.dispatch('toast/send', { text: error, type: 'error' }));
        return this.addToCartPromise;
      }
    }
  }
</script>

<style scoped lang="scss">
  .sidecart {
    display: flex;
    flex-direction: column;
    background-color: $color-white;

    @include tablet-up {
      max-width: 598px;
    }

    &, &__overlay {
      position: fixed;
      right: 0;
      top: 0;
      height: 100%;
      width: 100%;
    }

    &__overlay {
      background-color:#0E0E0E;
      opacity: 0.2;
    }

    &__close {
      opacity: 1;
      transition: opacity 200ms ease;
      &:hover {
        opacity: 0.5;
      }
    }
  }
  .shop-the-look-drawer {

    &__header{
      min-height: 100px;
      display: grid;
      width: 100%;
      align-content: space-between;
      flex-direction: row;
      grid-template-columns: 1fr 100px;
      position: relative;
    }

    &__title {
      padding-left: 32px;
      margin-top: 32px;
      margin-bottom: 32px;

      @include mobile-only {
        padding-left: 16px;
        margin-top: 16px;
      }
    }

    &__close {
      text-align: right;
      padding-right: 32px;
      margin-top: 32px;
      margin-bottom: 32px;
    }

    &__scrolling-container {
      overflow-y: auto;
      overflow-x: hidden;
      height: 90vh;
      margin-bottom: 100px;
    }

    &__main{
      padding-left: 32px;
      padding-right: 32px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 12px;
      row-gap: 32px;

      @include mobile-only {
        padding-left: 14px;
        padding-right: 14px;
        column-gap: 14px;
        row-gap: 24px;
      }
    }

    &__product-vendor {
      font-family: $font-family-primary;
      font-size: rem(14);
      font-weight: bold;
      letter-spacing: 0;
      line-height: 24px;
      margin-top: 8px;
    }

    &__product-title {
      font-family: $font-family-primary;
      font-size: rem(14);
      letter-spacing: 0;
      line-height: 20px;
      margin-top: 2px;
    }

    &__price-container {
      margin-top: 2px;
      margin-bottom: 16px;

      span, s {
        font-size: rem(14);
        font-weight: 400;
        line-height: rem(24);
      }
    }

    &__compare-price {
      color: $color-black-300;
      margin-right: 4px;
        span {
          text-decoration: line-through;
        }
    }

    &__compare-price,
    &__compare-price s {
      @include product-tile-compare-price;
    }
    .button {
      .button__content {
        font-size: 14px;
        font-weight: bold;
        letter-spacing: 1px;
        line-height: 20px;
        text-align: center;
      }
    }

    &__add-all-cart {
      padding: 48px 31px 41px;

      @include mobile-only {
        padding: 32px 14px 100px;
        margin-bottom: 100px;
      }

      &-button {
        width: 100%;
      }
    }
  }
</style>
