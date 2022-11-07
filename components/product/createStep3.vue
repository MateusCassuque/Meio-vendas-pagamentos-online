<template>
    <div class="principal">

        <v-card>
            <v-card-title> Product Descriptions </v-card-title>

            <v-card-text>
                <v-form v-model="valid">
                    <v-row>
                        <v-col cols="12">
                            <label for="tipo" class="text-h6 black--text"> Product Type: </label>
                            <select v-if="product.type" class="text-h6" name="tipo" id="tipo" v-model="description.tipo">
                                <option id="itens"  v-for="(item, i) in digital" :key="i" :value="item.tipo"><span class="itens"> {{ item.tipo }} </span> </option>
                            </select>
                            
                            <v-text-field v-else v-model="description.tipo" 
                            :counter="30" label="Tipo de Produto (O que é?):" required
                            placeholder="Telefone, TV, Livro, etc..."></v-text-field>

                        </v-col>
                        
                        <v-col cols="6" md="3">
                        <v-text-field v-model="description.autor" :rules="nameRules" :counter="30" label="Author:" 
                        required placeholder="Nome do Dono"></v-text-field>
                        </v-col>

                        <v-col cols="6" md="3" v-if="product.type">
                        <v-text-field v-model="description.produtora" :counter="30" label="Produtora:"></v-text-field>
                        </v-col>

                        <v-col cols="6" md="3" v-if="product.type">
                            <v-text-field v-model="description.editora" :counter="30" label="Editora:"></v-text-field>
                        </v-col>

                        <v-col cols="6" md="3" v-if="product.type">
                            <v-text-field v-model="description.album" label="Album, MixTap, EP:"></v-text-field>
                        </v-col>

                         <v-col cols="6" md="3" v-if="product.type">
                            <v-text-field v-model="description.numFaixa" label="Track Number:"></v-text-field>
                        </v-col>

                         <v-col cols="6" md="3" v-if="!product.type">
                            <v-text-field v-model="description.color" label="Cor:"></v-text-field>
                        </v-col>

                         <v-col cols="6" md="3" v-if="!product.type">
                            <v-text-field v-model="description.tamanho" label="Tamanho:"></v-text-field>
                        </v-col>

                         <v-col cols="6" md="3" v-if="!product.type">
                            <v-text-field v-model="description.peso" label="Peso"></v-text-field>
                        </v-col>
                        
                        <v-col cols="10" md="4">
                            <v-textarea v-model="description.detalhe" id="detalhes" name="detalhes"  label="Detalhes do Produto" 
                            :hint="`Descreve detalhadamente o teu produto ${$store.state.auth.user.userNome }`">
                            </v-textarea>
                        </v-col>

                    </v-row>
                    
                    <!-- <div class="form-group opsao">
                        <label for="itens">Extracurricular:</label>
                        <div class="form-group">
                            <input type="checkbox" name="itens[]" value = "Educação Física"> Educação Física
                        </div>
                        <div class="form-group">
                            <input type="checkbox" name="itens[]" value = "Campionato Escolar"> Campionato Escolar
                        </div>
                        <div class="form-group">
                            <input type="checkbox" name="itens[]" value = "Aula de Natação"> Aula de Natação
                        </div>
                        <div class="form-group">
                            <input type="checkbox" name="itens[]" value = "Curso de Planos de feria"> Curso de Planos de feria
                        </div>
                        <div class="form-group">
                            <input type="checkbox" name="itens[]" value = "Acampamento Escolar"> Acampamento Escolar
                        </div>
                        <div class="form-group">
                            <input type="checkbox" name="itens[]" value = "Festival de Música"> Festival de Música
                        </div>
                    </div> -->

                </v-form>
            </v-card-text>

            <v-card-actions>
                <v-btn color="primary" @click="salvar()"> Continue </v-btn>
                <v-btn text @click="test"> Cancel </v-btn>
            </v-card-actions>
        </v-card>

    </div>
</template>

<script>
import {api} from '@/store/services'

export default {
    name: 'createSpet3',
    emits: ['nextTep3'],
    props: ['product'],

    data(){
        return{
            valid: false,
            description: {
                autor: '',
                produtora: '',
                editora: '',
                album:'',
                numFaixa: 1,
                color:'',
                tamanho: '',
                peso:'',
                detalhe: '',
            },
            api,
            nameRules: [
                v => !!v || 'Autor Name is required',
                v => v.length <= 30 || 'Name must be less than 10 characters',
            ],

            digital:[
                {tipo: 'Music'},
                {tipo: 'Beat'},
                {tipo: 'Book'},
                {tipo: 'Design'},
                {tipo: 'Service'},
            ],

            fisical:[
                {tipo: 'Eletronic'},
                {tipo: 'Food'},
                {tipo: 'Service'},
            ],
        }
    },
    
    methods: {
        
        test(){
            alert(this.description.detalhe + this.product.name)
        },
        salvar(){
            try{
                
                // if(this.description.produtora === ''){
                //     this.description.produtora
                // }

                api.post('/description/product/'+this.product._id, this.description).then(res => {
                    // this.$emit('nextTep3', this.product)
                    this.$router.push({name: 'user'})
                })
            }catch(error){
                alert(error)
            }
        }
    },
}
</script>

<style scoped>
#tipo{
    color: rgb(8, 122, 189);
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.511);
    border-radius: 10px;
    width: 100px;
    text-align: center;
}
</style>