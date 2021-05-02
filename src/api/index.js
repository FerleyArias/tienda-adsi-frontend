//URL Base
const BASE_URL = 'https://backend-adsi.herokuapp.com/api/';

//Autentificacion
export const login = async user => {
  const res = await fetch(`${BASE_URL}auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const userDB = await res.json();
  return userDB;
};
// <----------- CATEGORIAS --------------------------->
//Traer categorias
export const getCategories = async token => {
  const res = await fetch(`${BASE_URL}category?value=`, {
    headers: {
      token: token,
    },
  });
  const dataDB = await res.json();
  return dataDB;
};

//Traer categorias by-id
export const getCategoryId = async (id, token) => {
  const res = await fetch(`${BASE_URL}category/${id}`, {
    headers: {
      token,
    },
  });
  const category = await res.json();
  return category.category;
};

//Añadir categorias
export const addCategory = async (item, token) => {
  const res = await fetch(`${BASE_URL}category/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: token,
    },
    body: JSON.stringify(item),
  });

  const newItem = await res.json();
  return newItem;
};

//Desactivar "eliminar" categoria
export const deleteCategory = async (id, token) => {
  await fetch(`${BASE_URL}category/disable/${id}`, {
    method: 'PUT',
    headers: {
      token: token,
    },
  });
};

//Activar categoria
export const enableCategory = async (id, token) => {
  await fetch(`${BASE_URL}category/enable/${id}`, {
    method: 'PUT',
    headers: {
      token: token,
    },
  });
};

//Modificar categoria
export const modifyCategory = async (id, item, token) => {
  const modifyCategory = await fetch(`${BASE_URL}category/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      token: token,
    },
    body: JSON.stringify(item),
  });

  const newCategory = await modifyCategory.json();
  return newCategory;
};

// <------------------ ARTICULOS ------------------------->
// Traer articulos
export const getArticle = async token => {
  const res = await fetch(`${BASE_URL}article?value=`, {
    headers: {
      token: token,
    },
  });
  const dataDB = await res.json();
  return dataDB;
};

//Añadir articulos
export const addArticle = async (item, token) => {
  const res = await fetch(`${BASE_URL}article/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: token,
    },
    body: JSON.stringify(item),
  });
  const newItem = await res.json();
  console.log(newItem);
  return newItem.article;
};

//Desactivar "eliminar" articulos
export const deleteArticle = async (id, token) => {
  await fetch(`${BASE_URL}article/disable/${id}`, {
    method: 'PUT',
    headers: {
      token: token,
    },
  });
};

//Activar articulos
export const enableArticle = async (id, token) => {
  await fetch(`${BASE_URL}article/enable/${id}`, {
    method: 'PUT',
    headers: {
      token: token,
    },
  });
};

//Modificar articulos
export const modifyArticle = async (id, item, token) => {
  await fetch(`${BASE_URL}article/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      token: token,
    },
    body: JSON.stringify(item),
  });
};

//<---------- COMPRAS ---------------------------------_>
//Traer compras
export const getCompra = async token => {
  const res = await fetch(`${BASE_URL}shopping?value=`, {
    headers: {
      token,
    },
  });
  const compras = await res.json();
  return compras;
};

//<---------- PERSONAS ---------------------------------_>
//Traer personas
export const getPerson = async token => {
  const res = await fetch(`${BASE_URL}person?value=`, {
    headers: {
      token,
    },
  });
  const personas = await res.json();
  return personas;
};
