<template>
    <v-container fluid>
        <h1> {{ product.name }} </h1>
        <v-row class="mx-auto">

            <Produto :produto="product" class="col-md-4 my-4 mx-auto" max-height="500"/>

            <v-card class="col-md-4 my-4 mx-auto" max-height="400">
                <v-card-title>Detalhes do produto</v-card-title>
                        
                <v-card-text>
                    <p>
                        Produto: <strong> <span v-if="!product.type">Físico</span> <span v-else>Dígital</span> </strong> <br>
                        Preço: <strong class="valor"> {{product.preco}} AOA</strong> <br>
                        Quantidade Disponível: <strong class="valor"> {{ product.quantidade }} </strong> <br>
                        Tipo: <strong class="valor" v-if="product.description"> {{product.description.tipo}}</strong> <br>
                        Tamanho: <strong class="valor" v-if="product.description"> {{product.description.tamanho}}</strong> <br>
                        Cor: <strong class="valor" v-if="product.description"> {{product.description.color}}</strong> <br>
                        Por (Autor): <strong class="valor" v-if="product.description"> {{product.description.autor}}</strong> <br>
                        Editora: <strong class="valor" v-if="product.description"> {{product.description.editora}}</strong> <br>
                        <!-- Publicado Em: <strong class="valor"> {{ product.createdAt }} </strong> -->
                    </p>
                </v-card-text>
                                       
                <v-card-actions>
                    <v-btn color="deep-purple lighten-2" text @click="ver"> 
                        <span v-if="!mostrar">Ver Vendedor</span> 
                        <span v-else>Ocultar Vendedor</span> 
                    </v-btn>
                </v-card-actions>
            </v-card>

            <User :produto="product" v-show="mostrar" max-width="500" max-height="450" class="col-md-4 my-4 mx-auto"/>

        </v-row>

<!--         
        <pre>
            {{ product }}
        </pre> -->

    </v-container>
</template>

<script>
import Produto from '~/components/product/ProdutoCard.vue'
import User from '~/components/user/userCard.vue'
import { api } from '@/store/services'
import imgTeste from '@/static/img/icones/mvpo3.png'


export default {
    name: 'product',
    head(){
        return{
        titleTemplate: '%s - PRODUTO',
        title: 'MVPO',
        }
    },
    
    components:{
        Produto,
        User,
    },

    data() {
        return{
            product: '',
            api,
            imgTeste,
            mostrar: false,
        }
    },
    methods:{
       ver(){
           this.mostrar = !this.mostrar 
       },

        getImages(product){
            try {
                api.get('/image/' + product.images[0]).then( res => {
                    this.product.foto = res.data.key
                })
                
                api.get('/userImg/perfil/' + this.product.user._id).then(res => {
                    this.product.user.foto = res.data.key
                })

            }catch (error){
                alert(error)
            }
        },

    },
    
    mounted(){
    },

    fetch(){
        try{
            const productId = this.$route.params.product

            api.get('/products/' + productId).then(res => {
                this.product = res.data


                this.getImages(this.product)
            })

        }catch(error){

        }
    }
}
</script>