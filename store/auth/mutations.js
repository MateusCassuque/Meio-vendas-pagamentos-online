import * as types from './mutations-types'

export default{

    [types.SET_USER](state, payload){
        state.user = payload
    },

    [types.SET_TOKEN](state, payload){
        state.token = payload
    },

    [types.SET_PERSON](state, payload){
        state.person = payload
    },
}