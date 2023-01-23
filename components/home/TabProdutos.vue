<template>
  <v-card main>
    <v-tabs color="deep-purple accent-4">
        <v-tab>P. Fisicos</v-tab>
        <v-tab>P. Digitais</v-tab>

        <p class="mx-auto d-none d-md-block">Para facilitar a tua busca {{ $store.state.auth.user.userNome }} , tenta procura o produto por categória!</p>

        <v-tab-item key="1">

            <v-container fluid>
                <h2>Produtos Fisicos</h2>

                <Fisicalproducts :products="products.fisico"/>
            </v-container>
        </v-tab-item>

        <v-tab-item key="2">

            <v-container fluid>
                <h2>Produtos Digitais</h2>

                <Digitalproducts :products="products.digital"/>
            </v-container>
        </v-tab-item>

    </v-tabs>
  </v-card>
</template>

<script>
import imgTeste from '@/static/img/icones/mvpo3.png'
import imgTeste1 from '@/static/img/icones/mao-pret-branco.png'

import Digitalproducts from '@/components/product/SectionProducts.vue'
import Fisicalproducts from '@/components/product/sessionProductFisic.vue'
import { api } from '@/store/services.js'


export default {
    name: 'tabProdutos',

    components:{
        Digitalproducts,
        Fisicalproducts
    },

    data() {
        return {
            imgTeste,
            imgTeste1,
            products:{
                fisico:[],
                digital:[],
            },
            api,
        }
    },
    
    fetch(){
        try {
            api.get('/products').then(res => {
                const produtos = res.data

                produtos.forEach(produto => {
                    if(produto.type){
                        this.products.digital.push(produto)
                    }else{
                        this.products.fisico.push(produto)
                    }
                })

                this.getImages(produtos)
            })   
        } catch (error) {
            alert(error)
        }
    },

    methods:{
        getImages(products){
            products.forEach(product => {
                try {
                    api.get('/image/' + product.images[0]).then( res => {
                        product.foto = res.data.key
                    })
                } catch (error) {
                    
                }
            })
        },
    }
}
</script>