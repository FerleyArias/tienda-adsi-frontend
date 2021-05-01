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

//Añadir categoria
export const addCategory = async ({commit, state}, item) => {
  try {
    commit('setLoading');
    const newItem = await api.addCategory(item, state.token);
    let updatedCategories = state.categories;
    updatedCategories.push(newItem.category);
    commit('setCategories', updatedCategories);
  } catch (error) {
    console.error(error);
    commit('setError', error);
  }
};

//Desactivar "eliminar" categoria
export const deleteCategory = async ({commit, state}, id) => {
  try {
    commit('setLoading');
    await api.deleteCategory(id, state.token);
    const index = state.categories.findIndex(category => category._id === id);
    let updatedCategories = state.categories;
    updatedCategories[index].state = 0;
    commit('setCategories', updatedCategories);
  } catch (error) {
    console.error(error);
    commit('setError', error);
  }
};

//Activar categoria
export const enableCategory = async ({commit, state}, id) => {
  try {
    commit('setLoading');
    await api.enableCategory(id, state.token);
    const index = state.categories.findIndex(category => category._id === id);
    let updatedCategories = state.categories;
    updatedCategories[index].state = 1;
    commit('setCategories', updatedCategories);
  } catch (error) {
    console.error(error);
    commit('setError', error);
  }
};

//Modificar categorias
export const modifyCategory = async ({commit, state}, {id, item}) => {
  try {
    commit('setLoading');
    await api.modifyCategory(id, item, state.token)
    const index = state.categories.findIndex(category => category._id === id);
    const updateCategories = state.categories
    updateCategories[index] = {...state.categories[index], ...item}
    commit('setCategories', updateCategories)
  } catch (error) {
    console.error(error);
    commit('setError');
  }
};

//Traer artículos
export const getArticles = async ({commit, state}) => {
  try {
    commit('setLoading');
    const dataDB = await api.getArticles(state.token);
    commit('setArticles', dataDB.article);
  } catch (error) {
    commit('setError', error);
  }
};
