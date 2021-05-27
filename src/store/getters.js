export const allCustomers = (state) => {
  return state.persons.filter(person => person.typePerson === "Cliente")  
}

export const activeCostumers = (state, getters) => {
  return getters.AllCustomers.filter(person => person.state === 1)  
}

export const allVendors = (state) => {
  return state.persons.filter(person => person.typePerson === "Proveedor")  
}

export const activeVendors = (state, getters) => {
  return getters.AllVendors.filter(person => person.state === 1)  
}

export const activeArticles = (state) => {
  return state.Article.filter(article => article.state === 1)  
}

export const activeCategiries = (state) => {
  return state.categiries.filter(category => category.state === 1)  
}

export const activeCompras = (state) => {
  return state.compras.filter(compra => compra.state === 1)  
}

export const activeVentas = (state) => {
  return state.ventas.filter(venta => venta.state === 1)  
}

export const activeUsers = (state) => {
  return state.users.filter(user => user.state === 1)  
}