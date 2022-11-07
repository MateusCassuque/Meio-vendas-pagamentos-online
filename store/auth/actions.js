import * as types from './mutations-types'
import * as storege from '../storege'
import { api } from '../services'

export const actionLogin = ({ dispatch }, payload) => {
    return api.post('/auth/authenticate', payload).then((res) => {
        
        dispatch('actionSetUser', res.data.person.user)
        dispatch('actionSetToken', res.data.token)
        dispatch('actionsSetPerson', res.data.person)
        
    }).catch(err => {
        return err
    })
}
export const actionUserRegister = ({ dispatch }, userPayload) => {
    return new Promise(async (resolve, reject) => {
        try {
            await api.post('auth/register', userPayload).then(res => {

                dispatch('actionSetUser', res.data.user)
                dispatch('actionSetToken', res.data.token)
            }).catch(error => {
                
                const texto = error.message
                const index = texto.indexOf("4")
                const code = texto.substring(index, 35)

                reject(code)
            })

            resolve()

        } catch (error) {
            reject('Error on register user: ' + error.data)
        }
    })
}

export const actionPersonRegister = ({ dispatch }, personPayload) => {
    return new Promise(async (resolve, reject) => {
        try {
            await api.post('/person', personPayload).then(res => {
                dispatch('actionsSetPerson', res.data)
            }).catch(error => {
                
                const texto = error.message
                const index = texto.indexOf("4")
                const code = texto.substring(index, 35)

                reject(code)
            })
            resolve()

        } catch (error) {
            reject( 'Erro ao enviar os dados da pessoa: ' + error.message)
        }
    })
}

export const actionCheckToken = ({ dispatch, commit}, state) => {

    if (state.token) {
        return Promise.resolve(state.token)
    }

    const token = storege.getLocalToken()

    if (!token) {
        return Promise.reject('Token invalido')
    }

    dispatch('actionSetToken', token)
    dispatch('actionLoadSession')
}

export const actionLoadSession = ({ dispatch }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data: { person } } = await api.get('/user')

            dispatch('actionSetUser', person.user)
            dispatch('actionsSetPerson', person)
            
            resolve()
        } catch (error) {
            dispatch('actionSignOut')
            reject(error)
        }
    })
}

export const actionSetUser = ({ commit }, payload) => {
    commit(types.SET_USER, payload)
}

export const actionsSetPerson = ({ commit }, payload) => {
    commit(types.SET_PERSON, payload)
}

export const actionSetToken = ({ commit }, payload) => {
    storege.setLocalToken(payload)
    storege.setHeaderToken(payload)
    commit(types.SET_TOKEN, payload)
}

export const actionSignOut = ({ dispatch }) => {
    storege.setHeaderToken('')
    storege.deleteLocalToken()

    dispatch('actionSetUser', {})
    dispatch('actionSetToken', '')
}