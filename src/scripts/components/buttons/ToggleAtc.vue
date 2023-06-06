<template lang="pug">
  .toggle-atc
    button.pdp__atc.product-form__atc.button.button--secondary.toggle-atc__added(
        v-if="justAddedToCart || productAlreadyInCart"
        disabled
      )
        icon(name="check-black", size="24")
    a(
      :href="product.url"
      v-else-if="!product.available"
    )
      button.pdp__atc.product-form__atc.button.button--secondary.toggle-atc__not-added OUT OF STOCK
    button.pdp__atc.product-form__atc.button.button--secondary.toggle-atc__not-added(
      v-else
      @click.stop="addToCart(product.selectedOrFirstAvailableVariant)"
      type="submit"
      name="add"
      data-add-to-cart
    ) ADD TO BAG
</template>

<script>
  import { mapState } from 'vuex'
  import AsyncButton from '../buttons/AsyncButton.vue';
  import Icon from 'scripts/components/basic/Icon.vue'

  export default {
    name: 'ToggleAtc',
    components: {
      AsyncButton,
      Icon
    },
    props: {
      msg: String,
      product: Object
    },
    data() {
      return {
        addToCartPromise: null,
        errors: [],
        justAddedToCart: false
      };
    },
    computed: {
      ...mapState({
        items: state => state.cart.checkout.items
      }),
      productAlreadyInCart() {
        const isInCart = (product) => product.id === this.product.selectedOrFirstAvailableVariant.id;
        return this.items.filter(item => item).findIndex(isInCart) >= 0 ? true : false;
      },
    },
    methods: {
      addToCart(variant) {
        if (this.errors.length) return false;
        let items = [];
        items.push({
          id: variant.id,
          quantity: 1
        });

        this.addToCartPromise = this.$store
          .dispatch('cart/addItems', items)
          // .then(() => window.setTimeout(() => this.$store.dispatch('cart/afterAddToCart'), 1000))
          .then(() => this.justAddedToCart = !true)
          .catch((error) => this.$store.dispatch('toast/send', { text: error, type: 'error' }));
        return this.addToCartPromise;
      }
    }
  }
</script>

<style scoped lang="scss">
  .toggle-atc {
    @include mobile-only {
      max-width: 142px;
    }

    &__not-added {
      max-width: 100% !important;
      display: flex;
      justify-content: center;
      align-items: center;

      @include tablet-up {
        min-width: 185px !important;
      }
    }

    &__added {
      background-color: $color-white !important;
      border: 2px $color-black-900 solid !important;
      width: 160px !important;

      @include tablet-up {
        width: 185px !important;
      }
    }
  }

  .toggle-atc__added > .icon {
    margin-top: -11px;
  }
</style>
