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
  return compras.shopping;
};

//Traer compras By Id
export const getCompraId = async (id, token) => {
  const res = await fetch(`${BASE_URL}shopping/${id}`, {
    method: 'GET',
    headers: {
      token,
    },
  });
  const compras = await res.json();
  return compras;
};

//Añadir compras
export const addCompra = async (item, token) => {
  const res = await fetch(`${BASE_URL}shopping/`, {
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

//Desactivar "eliminar" compras
export const deleteCompra = async (id, token) => {
  await fetch(`${BASE_URL}shopping/disable/${id}`, {
    method: 'PUT',
    headers: {
      token: token,
    },
  });
};

//activar compras
export const enableCompra = async (id, token) => {
  await fetch(`${BASE_URL}shopping/enable/${id}`, {
    method: 'PUT',
    headers: {
      token: token,
    },
  });
};

//<---------- VENTAS --------------------_>
//Traer ventas
export const getVenta = async token => {
  const res = await fetch(`${BASE_URL}sale?value=`, {
    headers: {
      token,
    },
  });
  const ventas = await res.json();
  return ventas.sale;
};

//Traer ventas By Id
export const getVentaId = async (id, token) => {
  const res = await fetch(`${BASE_URL}sale/${id}`, {
    method: 'GET',
    headers: {
      token,
    },
  });
  const compras = await res.json();
  return compras;
};

//Añadir ventas 
export const addVenta = async (item, token) => {
  const res = await fetch(`${BASE_URL}sale/`, {
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

//Desactivar "eliminar" ventas
export const deleteVenta = async (id, token) => {
  await fetch(`${BASE_URL}sale/disable/${id}`, {
    method: 'PUT',
    headers: {
      token: token,
    },
  });
};

//activar ventas
export const enableVenta = async (id, token) => {
  await fetch(`${BASE_URL}sale/enable/${id}`, {
    method: 'PUT',
    headers: {
      token: token,
    },
  });
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
  return personas.person;
};

//Traer personas By Id
export const getPersonId = async (id, token) => {
  const res = await fetch(`${BASE_URL}person/${id}`, {
    method: 'GET',
    headers: {
      token,
    },
  });
  const compras = await res.json();
  return compras;
};

//Modificar personas
export const modifyPerson = async (id, item, token) => {
  const modifyPerson = await fetch(`${BASE_URL}person/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      token: token,
    },
    body: JSON.stringify(item),
  });

  const newPerson = await modifyPerson.json();
  return newPerson;
};
//Añadir personas
export const addPerson = async (item, token) => {
  const res = await fetch(`${BASE_URL}person/`, {
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

//Desactivar "eliminar" personas
export const deletePerson = async (id, token) => {
  await fetch(`${BASE_URL}person/disable/${id}`, {
    method: 'PUT',
    headers: {
      token: token,
    },
  });
};

//activar personas
export const enablePerson = async (id, token) => {
  await fetch(`${BASE_URL}person/enable/${id}`, {
    method: 'PUT',
    headers: {
      token: token,
    },
  });
};

//<----------  USUARIOS -------------------_>
//Traer usuarios
export const getUser = async token => {
  const res = await fetch(`${BASE_URL}user?value=`, {
    headers: {
      token,
    },
  });
  const user = await res.json();
  return user.user;
};

//Traer usuarios By Id
export const getUserId = async (id, token) => {
  const res = await fetch(`${BASE_URL}user/${id}`, {
    method: 'GET',
    headers: {
      token,
    },
  });
  const compras = await res.json();
  return compras;
};

//Modificar personas
export const modifyUser = async (id, item, token) => {
  const modifyPerson = await fetch(`${BASE_URL}user/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      token: token,
    },
    body: JSON.stringify(item),
  });

  const newPerson = await modifyPerson.json();
  return newPerson;
};
//Añadir personas
export const addUser = async (item, token) => {
  const res = await fetch(`${BASE_URL}user/`, {
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


//Desactivar usuario
export const deleteUser = async (id, token) => {
  await fetch(`${BASE_URL}user/disable/${id}`, {
    method: 'PUT',
    headers: {
      token,
    },
  });
};

//Activar usuario
export const enableUser = async (id, token) => {
  await fetch(`${BASE_URL}user/enable/${id}`, {
    method: 'PUT',
    headers: {
      token,
    },
  });
};
