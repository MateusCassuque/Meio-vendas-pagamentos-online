export default async ({route, redirect, store})=>{
    if(route.name != 'auth-login' && !store.getters['auth/husToken']){
        try {
            await store.dispatch('auth/actionCheckToken', store.state)

            redirect({ name: route.name })
        } catch (error) {
            console.log('Erro no middleware: ' + error)
            redirect({ name: 'auth-login' })
        }
    }else{
        if (route.name == 'auth-login' && store.getters['auth/husToken']) {
            redirect({ name: 'index' })
        }else{
           // redirect({ name: 'index' })

        }
    }
}