import { createStore } from "vuex";
import router from "@/router"

export default createStore({
  state: {
    token: null,
    error: null,
    loading: false
  },
  // Las mutaciones modifican el state
  mutations: {
    setToken(state, payload) {
      state.token = payload;
      state.loading = false
    },
    setError(state, payload) {
      state.error = payload
      state.loading = false
    },
    setLoading(state) {
      state.loading = true
      state.error = null
    }
  },
  // Las acciones nos sirven para las solicitudes, llaman a las mutaciones
  actions: {
    // Los commits llaman las mutaciones
    async login({ commit }, user) {
      try {
        commit("setLoading")
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

        if(!userDB.token) {
          throw new Error("Email y/o Contraseña incorrectos")
        }

        commit("setToken", userDB.token);

        localStorage.setItem('token', userDB.token)

        router.push('/')

      } catch (error) {
        console.error(error);
        commit("setError", error)
      }
    },
    logout({ commit }){
      localStorage.removeItem('token')
      commit('setToken', null)
      router.push('/login')
    },
    getToken({commit}) {
      if(localStorage.getItem('token')){
        commit('setToken', localStorage.getItem('token'))
      }
    }
  },
  modules: {

  }
});
