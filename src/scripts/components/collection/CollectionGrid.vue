<template lang="pug">
  .collection-grid__container
    side-drawer-shop-the-look.shop-the-look__wrapper(
      :shop-the-look-tile="shopTheLookTile"
    )
    .container
      .collection-grid__layout
        collection-sidebar(
          v-if="notMobileTablet && visibilitySettings.sidebarDisabled !== true"
          :default-sort="defaultSort"
          :global-menu="globalMenu"
          :collection-menu="collectionMenu"
          :filters-disabled="visibilitySettings.filtersDisabled"
          :tags="tags"
          :filters="filters"
          :relatedCollections="relatedCollections")
        .collection-grid__wrapper(:class="[visibilitySettings.sidebarDisabled === true ? 'collection-grid__wrapper--no-sidebar' : 'collection-grid__wrapper--sidebar' ]")
          collection-grid-header(
            :pagination-amount="paginationAmount"
            :total-pages="totalPages"
            :tags="tags"
            :filters="filters"
            :default-sort="defaultSort"
            :filtersDisabled="visibilitySettings.filtersDisabled"
            :collection-menu-title="collectionMenuTitle"
            :global-menu="globalMenu"
            :collection-menu="collectionMenu"
            :hero-settings="heroSettings")
          collection-active-filters
          fade-transition(:duration="{enter: 800, leave: 200}")
            .collection-grid(
              v-if="(!this.fetchingStatus.coverAll || !this.fetchingStatus.status) && this.currentTotal >= 1 && (this.promoTile.enabled === 1 || this.shopTheLookTile.enabled === 1)"
              key="grid"
            )
              collection-promo-tile.is-shop-the-look-tile(
                v-if="promoTile.enabled === 1 && shopTheLookTile.enabled === 0 && currentProducts.length >= 6"
                :style="$mq === `desktop` || $mq === `hd` ? gridPositionAndSpanDesktopPromo : gridPositionAndSpanMobilePromo"
                :promo-tile="promoTile"
              )
              .collection-shop-the-look-tile__wrapper.is-shop-the-look-tile(
                @click="openShopTheLook"
                v-if="shopTheLookTile.enabled === 1  && currentProducts.length >= 6"
                :style="$mq === `desktop` || $mq === `hd` ? gridPositionAndSpanDesktopShopTheLook : gridPositionAndSpanMobileShopTheLook"
              )
                collection-shop-the-look-tile(
                  :shop-the-look-tile="shopTheLookTile"
                )
              .collection-grid-item(v-for="(product, index) in currentProducts")
                product-tile(
                  v-if="!product.position"
                  :selected-variant=" !product.position ? getCurrentFilteredVariant(product) : null"
                  :show-mobile-ATC="true"
                  :collection-handle="currentCollectionHandle"
                  :key="product.id"
                  :product="product"
                  :onAddToCart="addToCart"
                  :style="`order: ${index}`"
                  :global-logo-badge="!disableLogoBadge ? globalLogoBadge : undefined"
                  :collection-template="collectionTemplate"
                  :hide-badges="visibilitySettings.badgesDisabled"
                  :on-click-product="onClickProduct"
                  :promo-text="promoText"
                  :promo-text-color="promoTextColor"
                )
          fade-transition(:duration="{enter: 800, leave: 200}")
            .collection-grid.no-promo-tile(v-if="(!this.fetchingStatus.coverAll || !this.fetchingStatus.status) && this.currentTotal >= 1 && ((!this.promoTile.enabled || this.promoTile.enabled === 0) && (!this.shopTheLookTile.enabled || this.shopTheLookTile.enabled === 0))" key="grid")
              .collection-grid-item(v-for="(product, index) in currentProducts")
                product-tile(
                  :selected-variant="getCurrentFilteredVariant(product)"
                  :show-mobile-ATC="true"
                  :collection-handle="currentCollectionHandle"
                  :key="product.id"
                  :product="product"
                  :onAddToCart="addToCart"
                  :style="`order: ${index}`"
                  :global-logo-badge="!disableLogoBadge ? globalLogoBadge : undefined"
                  :collection-template="collectionTemplate"
                  :hide-badges="visibilitySettings.badgesDisabled"
                  :on-click-product="onClickProduct"
                  :promo-text="promoText"
                  :promo-text-color="promoTextColor"
                )
          fade-transition(:duration="{enter: 600, leave: 200}")
            .collection-grid.collection-grid__skeleton(v-if="this.fetchingStatus.status" key="skeleton")
              .collection-grid__skeleton-tile(v-for="n in paginationAmount" :key="`skel-${n}`")
                product-tile-skeleton
          fade-transition(:duration="{enter: 600, leave: 200}")
            .collection-grid__no-results(v-show="!this.fetchingStatus.status && this.currentTotal === 0" key="noProducts")
              h3 Oh no!
              p We couldn't find any products using your currently selected filters.
          .collection-grid__load-more-buttons(v-if="productDisplayedCount != currentTotal")
            button.button.button--primary(@click="loadMore") LOAD MORE
            button.button.button--secondary(@click="loadAll") VIEW ALL
          collection-grid-footer#total-product-count
            .body-md Viewing&nbsp;
              span.body-md.bold {{productDisplayedCount}}&nbsp;
              span.body-md of&nbsp;
              span.body-md.bold {{currentTotal}}
</template>

<script>
  import { mapState } from 'vuex';
  import {FadeTransition} from 'vue2-transitions'

  import { handleize, unhandleize } from 'scripts/filters/string.js'
  import { getCollectionCacheState } from 'scripts/helpers/collections';

  import CollectionSections from './CollectionSections.vue'
  import SideDrawerShopTheLook from './SideDrawerShopTheLook.vue'
  import CollectionGridHeader from './CollectionGridHeader.vue'
  import CollectionGridFooter from './CollectionGridFooter.vue'
  import CollectionTotalResults from './CollectionTotalResults.vue'
  import CollectionSidebar from './CollectionSidebar.vue'
  import CollectionPromoTile from './CollectionPromoTile.vue'
  import CollectionShopTheLookTile from './CollectionShopTheLookTile.vue'
  import CollectionActiveFilters from './CollectionActiveFilters.vue'
  import CtaTile from './CtaTile.vue'
  import ProductTile from 'scripts/components/product/ProductTile.vue'
  import ProductTileSkeleton from 'scripts/components/product/ProductTileSkeleton.vue'
  import SelectInput from 'scripts/components/forms/SelectInput.vue'

  import { sortProductsBy } from 'scripts/helpers/sort.js'

  export default {
    name: 'CollectionGridB',
    components: {
      SideDrawerShopTheLook,
      CtaTile,
      ProductTile,
      SelectInput,
      CollectionSidebar,
      CollectionGridHeader,
      CollectionGridFooter,
      CollectionTotalResults,
      CollectionActiveFilters,
      FadeTransition,
      ProductTileSkeleton,
      CollectionPromoTile,
      CollectionShopTheLookTile,
      CollectionSections
    },
    props: {
      relatedCollections: Array,
      collectionTemplate: String,
      handle: String,
      heroSettings: Object,
      initCollectionData: Object,
      initCollectionTotal: Number,
      initCollectionProducts: Array,
      totalProducts: Number,
      paginationAmount: Number,
      tags: Array,
      filters: Array,
      promoTile: {
        type: Object,
        default: () => ({
          enabled: Number,
          position: Number,
          url: String,
          bgColor: String,
          textColor: String,
          imageUrl: String,
          title: String,
          copy: String,
          price: String
        })
      },
      shopTheLookTile: {
        type: Object,
        default: () => ({
          enabled: Number,
          position: Number,
          imageUrl: String,
          title: String,
          shop_the_look_products: Object
        })
      },
      globalMenu: {
        type: Array,
        default: () => ([
          {
            url: String,
            title: String
          }
        ])
      },
      collectionMenu: {
        type: Array,
        default: () => ({
          handle: String,
          title: String,
          links: {
            type: Array,
            default: () => ({
              title: String,
              url: String,
              link: {
                type: Array,
                default: () => ({
                  title: String,
                  url: String
                })
              }
            })
          }
        })
      },
      visibilitySettings: {
        type: Object,
        default: () => ({
          "sidebarDisabled": Boolean,
          "filtersDisabled": Boolean
        })
      },
      globalLogoBadge: String,
      disableLogoBadge: Boolean,
      collectionSections: {
        type: Object,
        default: () => ({
          "settings": Object,
          "banner": Object,
          "categoryImages": Object,
          "categoryLinks": Object,
        })
      },
      collectionMenuTitle: String,
      promoText: String,
      promoTextColor: String,
    },
    watch: {
      currentProducts() {
        if (this.currentProducts.length > 0 && this.currentScrollPos != -1) {
          this.$nextTick(function() {
            window.scroll(0, this.currentScrollPos);
            this.$store.dispatch('collections/setCollectionScrollPos', -1);
          });
        }
      }
    },
    computed: {
      ...mapState({
        shopTheLookOpen: state => state.shopTheLook.shopTheLookOpen,
        fetchingStatus: state => state.collections.fetchingStatus,
        currentHandle: state => state.collections.currentHandle,
        currentPage: state => state.collections.currentPage,
        currentSort: state => state.collections.currentSort,
        currentFilters: state => state.collections.currentFilters,
        currentProducts: state => state.collections.currentProducts,
        currentTotal: state => state.collections.currentTotal,
        currentlyDisplayed: state => state.collections.currentlyDisplayed,
        currentScrollPos: state => state.collections.currentScrollPos,
      }),
      productDisplayedCount(){
        return this.currentProducts.length;
      },
      totalPages() {
        return Math.ceil(this.currentTotal / this.paginationAmount)
      },
      notMobileTablet() {
        return this.$mq !== 'mobile' && this.$mq !== 'tablet'
      },
      firstRelevantFilter() {
        let relevant = this.currentFilters.find(filter => filter.includes("color") || filter.includes("pattern"))
        if (!relevant) {
          return ''
        }
        if (relevant.startsWith('color-')) {
          return relevant.split('color-')[1]
        }
        if (relevant.startsWith('pattern-')) {
          return relevant.split('pattern-')[1]
        }
      },
      defaultSort() {
        const data = this.initCollectionData
        return data && data.sort_order ? data.sort_order : 'best-selling'
      },
      currentCollectionHandle() {
        const data = this.initCollectionData
        return data && data.handle ? data.handle : 'all'
      },
      hasPromoTile() {
        if (this.promoTile && this.promoTile.enabled) {
          if (this.promoTile.enabled === '0')
            return false
          return true
        }
        return false
      },
      hasShopTheLookTile() {
        if (this.shopTheLookTile && this.shopTheLookTile.enabled) {
          if (this.shopTheLookTile.enabled === '0')
            return false
          return true
        }
        return false
      },
      gridPositionAndSpanDesktopShopTheLook() {
        // If the client chooses column 2 or 4 for Shop the look / or any even number
        // Then automatically move the tile to a odd number (because it's 2 and 4 column layout)
        let shopTheLookTilePosition = this.shopTheLookTile.position;
        if(shopTheLookTilePosition % 2 == 0) {
            shopTheLookTilePosition -= 1;
        }
        let row = Math.floor((shopTheLookTilePosition / 4) + 1);
        let column = ((shopTheLookTilePosition / 4 ) - Math.floor(shopTheLookTilePosition / 4)) * 4;

        return {
          'grid-column': `${column} / span 2`,
          'grid-row': `${row}/ span 1`,
        }
      },
      gridPositionAndSpanMobileShopTheLook() {
        let shopTheLookTilePosition = this.shopTheLookTile.position;
        if(shopTheLookTilePosition % 2 != 0) {
            shopTheLookTilePosition += 1;
        }
        let row = Math.floor((shopTheLookTilePosition / 2));
        return {
          'grid-column': `1 / span 2`,
          'grid-row': `${row} / span 1`,
        }
      },
      gridPositionAndSpanDesktopPromo() {
        let promoTileTilePosition = this.promoTile.position;
        if(promoTileTilePosition % 2 == 0) {
            promoTileTilePosition -= 1;
        }
        let row = (Math.floor(promoTileTilePosition / 4)) + 1;

        let column = 1;
        if (this.promoTile.position % 4 == 0) {
          column = 4;
        } else {
          column = ((this.promoTile.position / 4 ) - Math.floor(this.promoTile.position / 4)) * 4;
        }

        return {
          'grid-column': `${column} / span 1`,
          'grid-row': `${row} / span 1`,
        }
      },
      gridPositionAndSpanMobilePromo() {
        let shopTheLookTilePosition = this.promoTile.position;
        let column = 2;
        if(shopTheLookTilePosition % 2 != 0) {
            column = 1;
            shopTheLookTilePosition += 1;
        }
        let row = Math.floor((shopTheLookTilePosition / 2));
        return {
          'grid-column': `${column} / span 1`,
          'grid-row': `${row} / span 1`,
        }
      }
    },
    methods: {
      onClickProduct(productHandle) {
        if(this.productDisplayedCount > this.paginationAmount) {
          this.$store.dispatch('collections/setCollectionScrollPos', window.scrollY);
        }
      },
      loadMore(){
        this.$store.dispatch('collections/loadMoreProducts', (this.currentPage + 1));
      },
      loadAll(){
        this.$store.dispatch('collections/loadAllProducts');
      },
      loadByCurrentPage() {
        this.$store.dispatch('collections/loadProductsByCurrentPage', this.currentPage);
      },
      openShopTheLook() {
        this.$store.dispatch('shopTheLook/openDrawer');
      },
      addToCart (id) {
        let addProduct = {
          id: id,
          quantity: 1
        }
        this.$store.dispatch('cart/addItems', addProduct)
          .then(() => this.$store.dispatch('cart/afterAddToCart'))
          .catch(error => this.$store.dispatch('toast/send', { text: error, type: 'error' }))
          .then(() => this.adding = false)
      },
      getCurrentFilteredVariant(currentProduct) {
        if ( this.firstRelevantFilter !== '' ) {
          let filteredVariant = currentProduct.variants.find(variant => {
            return variant.options.find(option => handleize(option) === this.firstRelevantFilter)
          })
          return filteredVariant ? filteredVariant : currentProduct.variants[0]
        }
        return currentProduct.variants[0]
      },
      initializeGrid(fetchProducts = true) {
        const queryParams = new URLSearchParams(window.location.search);
        const page = queryParams.get('page');
        const sort = queryParams.get('sort_by');
        const pathArray = window.location.pathname.split('/');
        // Get filters from URL path
        // URL path structure is /collections/collection-handle/filters
        const currentFilters = pathArray.length > 3 && pathArray[3].length > 0 ? pathArray[3].split('+') : [];

        this.$store.dispatch('collections/setInitialCollectionState', {
          handle: this.currentCollectionHandle,
          products: this.initCollectionProducts,
          total: this.initCollectionTotal,
          paginationAmount: this.paginationAmount,
          sort: sort ? sort : this.defaultSort,
          tags: this.tags,
          currentFilters,
          page: page ? parseInt(page) : 1,
        }).then(() => {
          if (fetchProducts) {
            return this.$store.dispatch('collections/fetchProducts')
          }
        })
      }
    },
    created () {
      // Load from session cache if available
      let cacheState = getCollectionCacheState(this.currentCollectionHandle);
      if (!!cacheState) {
        this.$store.dispatch('collections/setCollectionStateFromCache', cacheState);
        this.$store.dispatch('collections/loadProductsByCurrentPage', cacheState.currentPage);
        return;
      }
      this.initializeGrid(false);
      window.addEventListener('popstate', this.initializeGrid);
    },
    beforeDestroy() {
      if (this.hasPromoTile) {
        this.unsubscribe();
      }
      window.removeEventListener('popstate', this.initializeGrid);
    }
  }
</script>

<style scoped lang="scss">

  .shop-the-look {
    width: 100%;
    position: fixed;
    right: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 10;
  }

  .container {
    padding: 0 $grid-gutter;
    @include mobile-only {
      padding: 0;
    }
  }

  .collection-grid {
    position: relative;
    text-align: left;
    font-size: 0;
    padding: 0 12px;
    margin-top: 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-flow: dense;

    @include desktop-up {
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-gap: 12px;
    }

    &.justify-start{
      /deep/ .collection-promo-tile  {
        display: none;
      }
    }

    &__container {
      background-color: $color-white;
    }

    &__skeleton {
      min-height: 100vh;
    }

    &__layout {
      display: flex;
    }
    &__wrapper {
      width: 100%;
    }

    &__header-pagination-controls {
      position: absolute;
      top: 4px;
      left: 0;
      display: flex;
    }

    &__filters {
      position: absolute;
      top: 4px;
      right: 0;
    }

    &__sort {
      &-wrapper {
        display: flex;
        justify-content: center;
        margin-bottom: 18px;

        @include tablet-up {
          justify-content: flex-end;
          margin-bottom: 36px;
        }
      }
    }

    &__loading {
      position: absolute;
      width: 100%;
      display: flex;
      justify-content: center;
    }
    &__load-more-buttons {
      display: flex;
      justify-content: center;
      padding: 40px 0px 26px;
      border-bottom: 1px solid $color-black-300;
      @include mobile-only {
        flex-direction: column;
      }
      .button {
        margin: 0 12px;
        @include mobile-only {
          margin-bottom: 12px;
        }
      }
    }
    &__no-results {
      padding: 30px;
      padding-top: 0;

      @include tablet-up {
        padding: 0;
        padding-bottom: 30px;
      }
    }
  }

  .collection-grid-item {
    display: flex;
  }

  @include mobile-only {
    .collection-grid-item:nth-child(odd) {
      padding-right: 7px;
    }
    .collection-grid-item:nth-child(even) {
      padding-left: 7px;
    }
  }

  .collection-grid__wrapper--no-sidebar .collection-grid > * {
    margin-right: $collection-tile-side-margin-mobile;
    margin-bottom: 24px;
    width: 100%;
    display: inline-block;
    vertical-align: top;

    @include mobile-only {
      margin-right: 0;
      margin-bottom: 0;
    }

    @include tablet-only {
      margin-right: 0;
      margin-bottom: 0;
    }

    @include desktop-up {
      margin-right: $collection-tile-side-margin-tablet;

      &:nth-child(4n) {
        margin-right: 0;
      }
    }
  }

  .collection-grid__wrapper--sidebar .collection-grid > * {
    margin-right: $collection-tile-side-margin-mobile;
    margin-bottom: 16px;
    width: 100%;
    display: inline-block;
    vertical-align: top;

    @include mobile-only {
      width: 100%;
      margin-right: 0;
    }

    @include tablet-only {
      width: 100%;
      margin-right: 0;
      margin-bottom: 0;
    }

    @include desktop-up {
      width: 100%;
      margin-right: $collection-tile-side-margin-tablet;

      &:nth-child(4n) {
        margin-right: 0;
      }
    }
  }

  .grid-sort-animation-move {
    transition: transform 0.5s cubic-bezier(0.77, 0, 0.175, 1);
  }

  .is-shop-the-look-tile {
    grid-column: span 2;
  }

</style>
