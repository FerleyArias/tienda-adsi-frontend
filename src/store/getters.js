export const getAllCustomers = (state) => {
  return state.persons.filter(person => person.typePerson === "Cliente")  
}

export const getAllVendors = (state) => {
  return state.persons.filter(person => person.typePerson === "Proveedor")  
}