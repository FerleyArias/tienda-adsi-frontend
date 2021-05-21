import {createStore} from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import mutations from './mutations';

const state = {
  token: null,
  error: null,
  loading: false,
  categories: [],
  articles: [],
  compras: [],
  persons: [],
  ventas: [],
  users: []
};

export default createStore({
  state,
  actions,
  getters,
  mutations,
});
