<template>
    <div id="principal">
        <v-container fluid>            
                <v-row class="mx-auto">
                    <v-card class="col-md-4 my-4 mx-auto"  max-width="350" v-for="product in produtos" :key="product._id">
                        <template slot="progress">
                            <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                        </template>
                        
                        <v-img v-if="product.foto" height="250" alt="Imagem do produto" :src="require(`@/mvpo_back_End/tmp/uploads/files/img/product/${product.foto}`)">
                            <v-card-title id="tituloFoto" class=""> <span class="tituloFoto"> {{ product.name }} </span> </v-card-title>
                        </v-img>

                         <v-img v-else height="250" alt="Imagem do produto" :src="mvpoLogo">
                            <v-card-title> {{ product.name }} </v-card-title>
                        </v-img>
                        
                        <v-row align="center" class="mx-0 mt-4">
                            <v-rating :value="3" color="amber" dense half-increments readonly size="14"></v-rating>
                            <div class="grey--text ms-4"> 3 (3000) </div>
                        </v-row>

                        <v-card-text>
                            <div class="text-subtitle-1">
                                <span>Preço: </span> {{ product.preco }} AOA <br>
                                <span>Quantidade: </span> <span> {{ product.quantidade }} </span><br>
                                <span>Tipo de Produto:</span> <span>Dígital</span>
                            </div>
                        </v-card-text>
                        
                        <v-divider class="mx-4"></v-divider>
                        
                        <v-card-actions>
                            <v-btn color="deep-purple lighten-2" text :to="`/product/${product._id}`" router>Ver Detalhes</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="deep-purple lighten-2" text>Comprar</v-btn>
                        </v-card-actions>

                    </v-card>
                </v-row>
        </v-container>
    </div>
</template>

<script>
import mvpoLogo from '@/static/img/icones/mvpo3.png'

export default {
    name:'sectionProducts',

    props:{
        products: []
    },
    
    data(){
        return{
            produtos: '',
            mvpoLogo,
        }
    },

    methods:{
        getProductos(){
            setTimeout(() => {
                this.produtos = this.$props.products.reverse()
            }, 3500);
        }
    },

    mounted(){
        this.getProductos()
    },
}
</script>

<style scoped>
#tituloFoto .tituloFoto{
    color: white;
    background-color: rgba(0, 0, 0, 0.586);
    border-radius: 20px;
    box-shadow: 0px 0px 5px rgb(255, 248, 248);
    margin: 85px auto;
    padding: 20px;
    text-transform: uppercase;
    font-size: 14px;
}
</style>