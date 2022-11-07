<template>
    <div>
        <v-card class="mt-4">
            <v-card-title>sobre</v-card-title>

            <v-card-subtitle class="mt-2 mb-2"> DADOS PESSOAS </v-card-subtitle>

            <v-card-text>
                <v-row col>
                    <v-input disabled dense height="10" class="col-12 ml-4">
                        NOME: &nbsp; 
                        <span class="chave">
                            {{ person.name}}
                        </span>
                    </v-input>

                    <v-input disabled dense height="10" class="col-12 ml-4">
                        DATA DE NASCIMENTO: &nbsp; 
                        <span class="chave">
                             {{ dataNasci }}
                        </span>
                    </v-input>
                    <v-input disabled dense height="10" class="col-12 ml-4">
                        IDADE: &nbsp; 
                        <span class="chave">
                             {{ idadeEmAno }}
                        </span> &nbsp; anos
                    </v-input>
                    
                    <v-input disabled dense height="10" class="col-12 ml-4">
                        IDENTIDADE: &nbsp; 
                        <span class="chave">
                            {{ person.identification}}
                        </span>
                    </v-input>
                </v-row>
            </v-card-text>

            <v-card-subtitle class="mb-2">ENDEREÇO</v-card-subtitle>

            <v-card-text>
                <v-row class="col-md-8 ml-2"> 
                    
                    <v-input disabled dense height="10" class="mb-2">
                        PAIS: &nbsp;
                        <span class="chave">
                            {{ address.pais}}
                        </span>
                    </v-input>
                    
                    <v-input disabled dense height="10" class="mb-2">
                        PROVÍNCIA: &nbsp;
                         <span class="chave">
                             {{ address.provincia}}
                         </span>
                    </v-input>
                    
                    <v-input disabled dense height="10" class="mb-2">
                        MINICÍPIO: &nbsp;
                        <span class="chave">
                            {{ address.municipio}}
                        </span>
                    </v-input>

                    <v-input disabled dense height="10" class="mb-2">
                        BAIRRO: &nbsp;
                         <span class="chave">
                            {{ address.bairro}}
                         </span>
                    </v-input>

                    <v-input disabled dense height="10" class="mb-2">
                        RUA: &nbsp;
                         <span class="chave">
                            {{ address.rua}}
                         </span>
                    </v-input>
                    
                    <v-input disabled dense height="10" class="mb-2">
                        RESINDÊCIA: &nbsp;
                         <span class="chave">
                            {{ address.residencia}}
                         </span>
                    </v-input>
                    
                    <v-input disabled dense height="10" class="mb-2">
                        REFERÊNCIA: &nbsp;
                         <span class="chave">
                            {{ address.referencia}}
                         </span>
                    </v-input>
                
                </v-row>
            </v-card-text>

            <v-card-subtitle class="mb-2">CONTACTO</v-card-subtitle>

            <v-card-text>
                <v-row class="col-md-8 ml-2"> 
                    <v-input disabled dense height="10" class="mb-2">
                         <span class="chave">
                            EMAIL: &nbsp;
                         </span>
                         {{ user.email}}
                    </v-input>
                
                    <v-input disabled dense height="10" class="mb-2">
                         <span class="chave">
                            TELEFONE: &nbsp;
                         </span>
                         +244 999 999 999
                    </v-input>
                </v-row>
            </v-card-text>
        </v-card>

    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'datalhes',
    data() {
        return{
            user: '',
            person: '',
            dataNasci: '',
            idadeEmAno: 0,
            address:{
                pais: '',
                provincia: '',
                municipio: '',
                bairro: '',
                rua: '',
                residencia: '',
                referencia: '',
            }
        }
    },

    methods:{
        idade(){
            /**
             * FUNÇÃO PARA CALCULAR A IDADE
             */

            const dados = this.person.age

            const indice = dados.indexOf('T')

            const dataNascimento = dados.substring(indice, 0)

            this.dataNasci = dataNascimento

            const anoIndex = dataNascimento.indexOf('-')
            const ano = dataNascimento.substring(anoIndex, 0)

            const anoActual = new Date().getFullYear()

            this.idadeEmAno = anoActual - ano
        },

        endereco(){
            const dados = this.person.address

            const lugares= dados.split('/')

            this.address.pais = lugares[0]
            this.address.provincia = lugares[1]
            this.address.municipio = lugares[2]
            this.address.bairro = lugares[3]
            this.address.rua = lugares[4]
            this.address.residencia = lugares[5]
            this.address.referencia = lugares[6]

        },
    },

    mounted(){
        this.user = this.auth.user
        this.person = this.auth.person

        this.endereco()
        this.idade()
    },

    computed:{
        ...mapState({
        auth: state => state.auth
        }),
    },
}
</script>

<style scoped>
    .chave{
        margin-left: 4px;
        color: rgb(0, 0, 0);
    }
</style>