<template>
    <div>
        <v-window show-arrows v-model="step">
            <v-window-item v-for="(item,i) in items" :key="i" :value="i">
                <v-img :src="item.src"  class="my-0" id="img-slid">
                    <div id="caption">
                        <h1>{{ item.title }}</h1>
                        <p>{{ item.subtitle }}</p>
                    </div>
                </v-img>
            </v-window-item>
        </v-window>
    </div>
</template>
<script>
import foto0 from '@/static/img/icones/mvpo3.png';
import foto1 from '@/static/img/slid-banner/ap-mao-preto.jpg';
import foto2 from '@/static/img/slid-banner/cartao-fone.jpg';
import foto3 from '@/static/img/slid-banner/home-corrinho.jpg';

export default {
    name: 'SlidPrincipal',
    data() {
        return {
            step: 0,
            items:[
                {
                    src: foto0,
                    title: 'M  V  P  O',
                    subtitle: 'Meio de Vendas com Pagamentos Online'
                },
                {
                    src: foto1,
                    title: 'M  V  P  O',
                    subtitle: 'Compra & Venda com #Seguranca na web'
                },            
                {
                    src: foto2,
                    title: 'Bem-vindo ao MVPO',
                    subtitle: 'Meio de Vendas com Pagamentos Online'
                },
                {
                    src: foto3,
                    title: 'M  V  P  O',
                    subtitle: 'Rapido, seguro e para Todos'
                },
            ],
        }        
    },

    methods:{
        autoSlid_1(){
            setTimeout(() => {
                this.step++
                this.autoSlid_2()
            }, 5000)
        },
        autoSlid_2(){
            setTimeout(() => {
                this.step++
                this.autoSlid_1()
            }, 5000);
        }
    },

    mounted(){
        this.autoSlid_1()
    }
}
</script>
<style scoped>
#caption{
    position: relative;
    margin:20px;
    padding: 10px;
    top: 45%;
    color: #FFd;
    background-color: #1c1e20be;
    display: flex;
    flex-direction: column;
    align-items: center;
}
#caption p{
    color: #FFF;
    font-size: 1rem;
}
#img-slid{
    max-height: 800px;
    min-width: 100%;
}
</style>