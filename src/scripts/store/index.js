import Vue from 'vue';
import Vuex from 'vuex';

// modules
import products from './modules/products';
import collections from './modules/collections';
import cart from './modules/cart';
import shopTheLook from './modules/shopTheLook';
import toast from './modules/toast';
import scroll from './modules/scroll';
import video from './modules/video';
import kitBuilder from './modules/kitBuilder';
import header from './modules/header';
import offers from './modules/offers';
import fullOverlay from './modules/fullOverlay';

Vue.use(Vuex);

// map metafield values to class names
const metafieldColorMap = {
  Primary: 'brand-primary',
  Secondary: 'brand-secondary',
  Primary: 'brand-primary',
  'Accent 1': 'accent-1',
  'Accent 2': 'accent-2',
  'Accent 3': 'accent-3',
  'Accent 4': 'accent-4',
  'Accent 5': 'accent-5',
  White: 'white',
  white: 'white',
  'Light Grey': 'light-grey',
  Grey: 'grey',
  'Off-Black': 'off-black',
  Black: 'black',
};

const state = {
  badgeColorMap: {
    sale: ['badge-bg-sale'],
    new: ['badge-bg-new'],
    alysaspick: ['badge-bg-alysaspick'],
    joannespick: ['badge-bg-joannespick'],
    'one-of-a-kind': ['badge-bg-one-of-a-kind'],
    bold: ['badge-bg-bold'],
    sophisticated: ['badge-bg-sophisticated'],
    edgy: ['badge-bg-edgy'],
    classic: ['badge-bg-classic'],
  },
  comparePriceColor: window.bvaccel.comparePriceColor,
  config: {
    IS_RAMSEY: IS_RAMSEY,
    IS_BOURDAIN: IS_BOURDAIN,
  },
  metafieldColorMap,
};

export default new Vuex.Store({
  state,
  modules: {
    products,
    collections,
    cart,
    shopTheLook,
    toast,
    scroll,
    video,
    kitBuilder,
    header,
    offers,
    fullOverlay,
  },
});
