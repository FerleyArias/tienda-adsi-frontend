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

//Añadir categorias
export const addCategory = async (item, token) => {
  const res = await fetch(`${BASE_URL}category`, {
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

//Articulos
export const getArticles = async token => {
  const res = await fetch(`${BASE_URL}article?value=`, {
    headers: {
      token: token,
    },
  });
  const dataDB = await res.json();
  return dataDB;
};
