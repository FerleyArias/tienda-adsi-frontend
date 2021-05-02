import * as api from '@/api';
import router from '@/router';
// Las acciones nos sirven para las solicitudes, llaman a las mutaciones
// Los commits llaman las mutaciones

//<---------------- Autentificación ------------------------------> 
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
//cerrar sesión y remover el token
export const logout = ({commit}) => {
  localStorage.removeItem('token');
  commit('setToken', null);
  router.push('/login');
};

//obtener el token usando el ciclo de vida de Vue
export const getToken = ({commit}) => {
  if (localStorage.getItem('token')) {
    commit('setToken', localStorage.getItem('token'));
  }
};

//<-------------------------- CATEGORIAS ---------------->
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
    updatedCategories.unshift(newItem.category);
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
    await api.modifyCategory(id, item, state.token);
    const index = state.categories.findIndex(category => category._id === id);
    const updateCategories = state.categories;
    updateCategories[index] = {...state.categories[index], ...item};
    commit('setCategories', updateCategories);
  } catch (error) {
    console.error(error);
    commit('setError');
  }
};

// <------------------- ARTICULOS ---------------->
//Traer artículos
export const getArticle = async ({commit, state}) => {
  try {
    commit('setLoading');
    const dataDB = await api.getArticle(state.token);
    commit('setArticles', dataDB.article);
  } catch (error) {
    commit('setError', error);
  }
};

//Añadir articulo
export const addArticle = async ({commit, state}, item) => {
  try {
    commit('setLoading');
    const newItem = await api.addArticle(item, state.token);
    const category = await api.getCategoryId(newItem.category, state.token);
    newItem.category = {
      _id: category._id,
      name: category.name,
      description: category.description,
    };
    let updatedArticles = state.articles;
    updatedArticles.unshift(newItem);
    commit('setArticles', updatedArticles);
  } catch (error) {
    console.error(error);
    commit('setError', error);
  }
};

//Desactivar "eliminar" Articulos
export const deleteArticle = async ({commit, state}, id) => {
  try {
    commit('setLoading');
    await api.deleteArticle(id, state.token);
    const index = state.articles.findIndex(article => article._id === id);
    let updatedArticles = state.articles;
    updatedArticles[index].state = 0;
    commit('setArticles', updatedArticles);
  } catch (error) {
    console.error(error);
    commit('setError', error);
  }
};

//Activar articulos
export const enableArticle = async ({commit, state}, id) => {
  try {
    commit('setLoading');
    await api.enableArticle(id, state.token);
    const index = state.articles.findIndex(article => article._id === id);
    let updatedArticles = state.articles;
    updatedArticles[index].state = 1;
    commit('setArticles', updatedArticles);
  } catch (error) {
    console.error(error);
    commit('setError', error);
  }
};

//Modificar articulos
export const modifyArticle = async ({commit, state}, {id, item}) => {
  try {
    commit('setLoading');
    await api.modifyArticle(id, item, state.token);
    const index = state.articles.findIndex(article => article._id === id);
    const updateArticles = state.articles;
    const change = {...item}
    const category = await api.getCategoryId(change.category, state.token);
    change.category = {
      _id: category._id,
      name: category.name,
      description: category.description,
    };
    updateArticles[index] = {...state.articles[index], ...change};
    commit('setArticles', updateArticles);
  } catch (error) {
    console.error(error);
    commit('setError');
  }
};

//<----------------------------- COMPRAS ------------------>
//Traer compras 
export const getCompra = async ({commit, state}) => {
  try {
    commit('setLoading');
    const compras = await api.getCompra(state.token);
    commit('setCompras', compras);
  } catch (error) {
    commit('setError', error);
    console.error(error);
  }
};
