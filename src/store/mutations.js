//Mutations
export default {
  setToken(state, payload) {
    state.token = payload;
    state.loading = false;
  },
  setUserLogin(state, payload) {
    state.userLogin = payload;
    state.loading = false;
  },
  setError(state, payload) {
    state.error = payload;
    state.loading = false;
  },
  setLoading(state) {
    state.loading = true;
    state.error = null;
  },
  setCategories(state, payload) {
    state.categories = payload;
    state.loading = false;
  },
  setArticles(state, payload) {
    state.articles = payload;
    state.loading = false;
  },
  setCompras(state, payload) {
    state.compras = payload;
    state.loading = false;
  },
  setPersons(state, payload) {
    state.persons = payload;
    state.loading = false;
  },
  setVentas(state, payload) {
    state.ventas = payload;
    state.loading = false;
  },
  setUsers(state, payload) {
    state.users= payload;
    state.loading = false;
  },
  setRol(state, payload) {
      state.rol = payload;
  }
};
