<template>
    <div>
        <v-stepper v-model="e6" vertical>
            <v-stepper-step :complete="e6 > 1" step="1">
                Create Product
                <small>Your Product Data</small>
            </v-stepper-step>

            <v-stepper-content step="1">
                
                <CreateSpet1  @nextTep="next"/>

            </v-stepper-content>

            <v-stepper-step :complete="e6 > 2" step="2"> 
                Insert Product Image 
                <small>chooese a principal Product Image</small>

            </v-stepper-step>

            <v-stepper-content step="2">
                <CreateSpet2 :product="newProduct" @nextTep2="next"/>           
            </v-stepper-content>

            <v-stepper-step :complete="e6 > 3" step="3"> 
                Insert Product Description 
                <small> Product Detalhes </small>
            </v-stepper-step>

            <v-stepper-content step="3">

                <create-spet-3 :product="newProduct" @nextTep3="next"></create-spet-3>
                
            </v-stepper-content>

            <!-- <v-stepper-step step="4">
                View setup instructions
            </v-stepper-step>
            <v-stepper-content step="4">
                <v-card
                    color="grey lighten-1"
                    class="mb-12"
                    height="200px"
                ></v-card>
                <v-btn
                    color="primary"
                    @click="next()"
                >
                    Continue
                </v-btn>
                <v-btn text>
                    Cancel
                </v-btn>
            </v-stepper-content> -->
        </v-stepper>
    </div>
</template>

<script>
import CreateSpet1 from '@/components/product/CreateStep1.vue' 
import CreateSpet2 from '@/components/product/createStep2.vue' 
import CreateSpet3 from '@/components/product/createStep3.vue' 

export default {
    name: 'createProduct',
    components:{
        CreateSpet1,
        CreateSpet2,
        CreateSpet3,
    },

    data(){
        return{
            step: 1,
            e6: 1,
            newProduct: '',
        }
    },

    methods:{
        next(product){
           this.step++
           this.e6++

           this.newProduct = product
        },
    }
}
</script>