import {createStore} from 'vuex';
import * as actions from './actions';
import mutations from './mutations';

const state = {
  token: null,
  error: null,
  loading: false,
  categories: [],
  articles: [],
};

export default createStore({
  state,
  actions,
  mutations,
});
