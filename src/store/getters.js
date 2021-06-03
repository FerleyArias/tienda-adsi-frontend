export const allCustomers = (state) => {
  return state.persons.filter(person => person.typePerson === "Cliente")  
}

export const allVendors = (state) => {
  return state.persons.filter(person => person.typePerson === "Proveedor")  
}
