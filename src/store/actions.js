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
    const change = {...item};
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

//<------------------ COMPRAS ------------------>
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

// Eliminar "desactivar" compra
export const deleteCompra = async ({commit, state}, id) => {
  try {
    commit('setLoading');
    await api.deleteCompra(id, state.token);
    const index = state.compras.shopping.findIndex(compra => compra._id === id);
    let updatedCompras = state.compras;
    updatedCompras.shopping[index].state = 0;
    commit('setCompras', updatedCompras);
  } catch (error) {
    console.error(error);
    commit('setError', error);
  }
};

// activar compra
export const enableCompra = async ({commit, state}, id) => {
  try {
    commit('setLoading');
    await api.enableCompra(id, state.token);
    const index = state.compras.shopping.findIndex(compra => compra._id === id);
    let updatedCompras = state.compras;
    updatedCompras.shopping[index].state = 1;
    commit('setCompras', updatedCompras);
  } catch (error) {
    console.error(error);
    commit('setError', error);
  }
};

//<----------------- VENTAS ------------------>
//Traer ventas
export const getVenta = async ({commit, state}) => {
  try {
    commit('setLoading');
    const ventas = await api.getVenta(state.token);
    commit('setVentas', ventas);
  } catch (error) {
    commit('setError', error);
    console.error(error);
  }
};

// Eliminar "desactivar" ventas
export const deleteVenta = async ({commit, state}, id) => {
  try {
    commit('setLoading');
    await api.deleteVenta(id, state.token);
    const index = state.ventas.sale.findIndex(ventas => ventas._id === id);
    let updatedVentas = state.ventas;
    updatedVentas.sale[index].state = 0;
    commit('setVentas', updatedVentas);
  } catch (error) {
    console.error(error);
    commit('setError', error);
  }
};

// Activar ventas
export const enableVenta = async ({commit, state}, id) => {
  try {
    commit('setLoading');
    await api.enableVenta(id, state.token);
    const index = state.ventas.sale.findIndex(ventas => ventas._id === id);
    let updatedVentas = state.ventas;
    updatedVentas.sale[index].state = 1;
    commit('setVentas', updatedVentas);
  } catch (error) {
    console.error(error);
    commit('setError', error);
  }
};
//<----------------------------- PERSONAS ------------------>
//Traer compras
export const getPerson = async ({commit, state}) => {
  try {
    commit('setLoading');
    const person = await api.getPerson(state.token);
    commit('setPersons', person);
  } catch (error) {
    commit('setError', error);
    console.error(error);
  }
};

// Eliminar "desactivar" personas
export const deletePerson = async ({commit, state}, id) => {
  try {
    commit('setLoading');
    await api.deletePerson(id, state.token);
    const index = state.persons.person.findIndex(person => person._id === id);
    //console.log(state.persons.person)
    let updatedPersons = state.persons;
    updatedPersons.person[index].state = 0;
    commit('setPersons', updatedPersons);
  } catch (error) {
    console.error(error);
    commit('setError', error);
  }
};

// Activar personas
export const enablePerson = async ({commit, state}, id) => {
  try {
    commit('setLoading');
    await api.enablePerson(id, state.token);
    const index = state.persons.person.findIndex(person => person._id === id);
    //console.log(state.persons.person)
    let updatedPersons = state.persons;
    updatedPersons.person[index].state = 1;
    commit('setPersons', updatedPersons);
  } catch (error) {
    console.error(error);
    commit('setError', error);
  }
};

//<---------------- USUARIOS ------------------>
//Traer usuarios
export const getUser = async ({commit, state}) => {
  try {
    commit('setLoading');
    const user = await api.getUser(state.token);
    commit('setUsers', user);
  } catch (error) {
    commit('setError', error);
    console.error(error);
  }
};

//Eliminar usuario
export const deleteUser = async ({commit, state}, id) => {
  try {
    commit('setLoading');
    await api.deleteUser(id, state.token);
    const index = state.users.user.findIndex(user => user._id === id);
    let updatedUsers = state.users;
    updatedUsers.user[index].state = 0;
    commit('setUsers', updatedUsers);
  } catch (error) {
    commit('serError', error);
    console.log(error);
  }
};

//Activar usuario
export const enableUser = async ({commit, state}, id) => {
  try {
    commit('setLoading');
    await api.enableUser(id, state.token);
    const index = state.users.user.findIndex(user => user._id === id);
    let updatedUsers = state.users;
    updatedUsers.user[index].state = 1;
    commit('setUsers', updatedUsers);
  } catch (error) {
    commit('serError', error);
    console.log(error);
  }
};
