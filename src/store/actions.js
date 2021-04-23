import router from "@/router"
  // Las acciones nos sirven para las solicitudes, llaman a las mutaciones
    // Los commits llaman las mutaciones

const BASE_URL = "https://backend-adsi.herokuapp.com/api/"

  export const login = async ({ commit }, user) => {
      try {
        commit("setLoading")
        const res = await fetch(
          `${BASE_URL}auth/login`,
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
    }
    
    export const logout = ({ commit }) => {
      localStorage.removeItem('token')
      commit('setToken', null)
      router.push('/login')
    }

    export const getToken = ({commit}) => {
      if(localStorage.getItem('token')){
        commit('setToken', localStorage.getItem('token'))
      }
    }

