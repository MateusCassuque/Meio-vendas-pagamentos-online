<template>
    <div id="principal">
        <p :v-show="message"><a href="#"> {{ message }} </a></p>
         <v-card>            
           <v-form>
                <v-card-text>
                    <span>
                        product data
                    </span> 
                    
                    <v-container>
                        
                         <v-row>
                            
                            <v-col cols="6" md="4">
                                <v-text-field class="" name="name" label="Name" 
                                v-model="product.name" placeholder="Product Name" 
                                hide-details="auto" prepend-inner-icon="">
                                </v-text-field> 
                            </v-col>

                            <v-col cols="6" md="4">
                                <v-text-field name="preco" label="value" 
                                v-model="product.preco" placeholder="Preço" 
                                hide-details="auto">
                                </v-text-field>  
                            </v-col>

                            <v-col cols="6" md="4">
                                <v-text-field name="quantidade" label="Quantidade" 
                                v-model="product.quantidade" placeholder="Quantidade disponivel" 
                                hide-details="auto">
                                </v-text-field> 
                            </v-col>

                            <v-container class="col-12 px-0" fluid>
                                <v-radio-group class="col-md-2" v-model="product.type">
                                    <p>Product Type</p>
                                
                                    <v-row>
                                        <v-radio
                                        class="col-6"
                                        v-for="type in types"
                                        :key="type.index"
                                        :label="`${type.tipo}`"
                                        :value="type.value"
                                    ></v-radio>
                                    </v-row>
                                </v-radio-group>
                            </v-container>

                            
                            <!-- <div class="col-12">
                                <v-checkbox class="m-4"
                                v-model="tipo"
                                label="Fisical Product"
                                color="dark"
                                :value="true"
                                hide-details
                                ></v-checkbox>


                                <v-checkbox class="m-4"
                                v-model="tipo"
                                label="Digital Product"
                                color="dark"
                                :value="true"
                                hide-details
                                ></v-checkbox>
                            </div>  -->
                            
                        </v-row>

                    </v-container>
                </v-card-text>

                <v-divider></v-divider>
                <v-btn color="primary" class="mb-4 mt-4 ml-4" @click="criar()">Continuar</v-btn>
                <v-btn text> Cancel </v-btn>

           </v-form>
        </v-card>

    </div>
</template>

<script>
import { api } from '@/store/services'

export default {
    name:'createSpet1',
    emits:['nextTep'],

    data(){
        return{
            api,
            message: '',
            product:{
                name:'',
                quantidade:'',
                type: false,
                preco: ''
            },
            types: [
                {
                    value: false,
                    tipo: 'Fisical',
                    index: 0
                },
                {
                    value: true,
                    tipo: 'Digital',
                    index: 1
                }
            ]
        }
    },

    methods:{
        async criar(){
            try {
                await api.post('/products', this.product).then(res => {
                    this.message = 'Producto Creado com Sucesso!'
                    this.product = res.data

                })
                    this.$emit('nextTep', this.product)
            } catch (error) {
                this.message = 'Erro ao cadastrar o Producto!'
                console.log(error)
            }
        },
    }
}
</script>