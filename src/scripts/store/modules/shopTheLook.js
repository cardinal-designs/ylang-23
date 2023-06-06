const state = {
  shopTheLookOpen: false,
};

const mutations = {
  SET_CHECKOUT(state, checkout) {
    state.checkout = checkout;
  },
  OPEN_DRAWER(state) {
    state.shopTheLookOpen = true;
  },
  CLOSE_DRAWER(state) {
    state.shopTheLookOpen = false;
  },
};

const actions = {
  openDrawer: ({ commit }) => {
    commit('OPEN_DRAWER');
  },
  closeDrawer: ({ commit }) => commit('CLOSE_DRAWER'),
};

export default { namespaced: true, state, mutations, actions };
