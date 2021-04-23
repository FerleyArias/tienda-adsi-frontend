import { createStore } from "vuex";
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

const state = {
    token: null,
    error: null,
    loading: false
}

export default createStore({
    state,
    getters,
    actions,
    mutations
})
