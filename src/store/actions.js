import * as api from '@/api';
import router from '@/router';
// Las acciones nos sirven para las solicitudes, llaman a las mutaciones
// Los commits llaman las mutaciones

export const login = async ({commit}, user) => {
  try {
    commit('setLoading');

    const userDB = await api.login(user);

    if (!userDB.token) {
      throw new Error('Email y/o Contraseña incorrectos');
    }

    commit('setToken', userDB.token);

    localStorage.setItem('token', userDB.token);

    router.push('/');
  } catch (error) {
    console.error(error);
    commit('setError', error);
  }
};

export const logout = ({commit}) => {
  localStorage.removeItem('token');
  commit('setToken', null);
  router.push('/login');
};

export const getToken = ({commit}) => {
  if (localStorage.getItem('token')) {
    commit('setToken', localStorage.getItem('token'));
  }
};
//Traer categorias
export const getCategories = async ({commit, state}) => {
  try {
    commit('setLoading');
    const dataDB = await api.getCategories(state.token);
    commit('setCategories', dataDB.category);
  } catch (error) {
    commit('setError', error);
    console.error(error);
  }
};

//Traer artículos
export const getArticles = async ({commit, state}) => {
  try {
      commit('setLoading');
      const dataDB = await api.getArticles(state.token)
      commit('setArticles', dataDB.article)
  } catch (error) {
    commit('setError', error);
  }
};
