<template>
    <dir>
        <v-card>
            <v-card-title>{{ product.name }}</v-card-title>
            <v-card-text>
                <div id="quadro">
                    <img src="/favicon.png" alt="imagem do producto" id="fotoProduto">
                </div>
            
                <v-file-input prepend-icon="" prepend-inner-icon="mdi-camera" 
                show-size accept="image/*" name="file"
                id="file" @change="mostraImg" class="inputFile ml-4">

                    <template v-slot:label>
                        <span id="labelFoto">Escolha Uma Imagem Para o Producto</span>
                    </template>

                </v-file-input>  
            </v-card-text>

            <!-- <v-card-text v-show="false" v-for="n in 3" :key="n">
                <div id="quadro">
                    <img src="/favicon.png" alt="imagem do producto" id="fotoProduto">
                    <p class="nomeProduto">  </p> 
                </div>
            
                <v-file-input prepend-icon="" prepend-inner-icon="mdi-camera" 
                show-size accept="image/*" name="file"
                id="file1" @change="mostraImg" class="inputFile ml-4">

                    <template v-slot:label>
                        <span id="labelFoto">Escolha Uma Imagem Para o Producto</span>
                    </template>

                </v-file-input>  
            </v-card-text> -->

            <v-card-actions>
                <v-btn
                    color="primary"
                    @click="salvarFoto()"
                >

                    <v-progress-circular
                    v-if="!mstPr"
                    :size="25"
                    color="white"
                    indeterminate
                    ></v-progress-circular>

                    <span v-else>
                        Continue
                    </span>
                </v-btn>
                <v-btn text>
                    Cancel
                </v-btn>
            </v-card-actions>

        </v-card>
    </dir>
</template>

<script>
import { api } from '@/store/services'

export default {
    name: 'step2',
    emits: ['nextTep2'],
    props: ['product'],

    data(){
        return{
            file: '',
            api,
            mstPr: true,
        }
    },

    methods:{
        mostraImg(e){
            try {
                const tgt = e.target || window.event.srcElement
                
                const files = tgt.files
                const fr = new FileReader()
                
                fr.onload = function(){
                    document.querySelector('#fotoProduto').src = fr.result
                }
                
                fr.readAsDataURL(files[0])

                this.file = files[0]
            } catch (error) {
                return console.log({Error: 'Error ao salvar a imagem ' + error})
            }
        },

        async salvarFoto(){
            try {
                // Progreese Circol
                this.mstPr = false

                const formData = new FormData()
                const active = true

                formData.append('file', this.file)

                const resposta = await api.post('/produtoImg/' + this.product._id, formData, {
                    headers:{
                       'Content-Type': 'multipart/form-data'
                    }
                }).then(res =>{
                    this.step++
                }).catch(err => {
                    console.log('Erro: ' + err)
                })


                this.mstPr = true
                this.$emit('nextTep2', this.product)

            } catch (error) {
                console.log(error)
            }
        },
    }
}
</script>


<style scoped>
#fotoProduto{
  /** dimencionamento da imagem de perfil enviada pelo usuário*/
  width: 200px;

  /** Estilisão de borda com sombra e posicionameto */
  box-shadow: 0 0 5px black;
  border-radius: 5%;

  margin: auto;
}
#quadro{
  padding: 5px;
  margin: 20px auto;

  max-width: max-content;
}

.inputFile{
    margin: 0 auto;
    width: 450px;
}

</style>
