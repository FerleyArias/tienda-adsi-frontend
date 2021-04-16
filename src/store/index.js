import { createStore } from "vuex";

export default createStore({
  state: {
    token: null
  },
  // Las mutaciones modifican el state
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
  },
  // Las acciones nos sirven para las solicitudes, llaman a las mutaciones
  actions: {
    // Los commits llaman las mutaciones
    async login({ commit }, user) {
      console.log(user);
      try {
        const res = await fetch(
          "https://backend-adsi.herokuapp.com/api/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }
        );

        const userDB = await res.json();

        console.log(userDB.token);

        commit("setToken", userDB.token);

        localStorage.setItem('token', userDB.token)

      } catch (error) {
        console.log(error);
      }
    },
    getToken({commit}) {
      if(localStorage.getItem('token')){
        commit('setToken', localStorage.getItem('token'))
      } else {
        commit('setToken', null)
      }
    }
  },
  modules: {

  }
});
