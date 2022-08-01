<template> 
    <div class="flex circular flex-column vh-100 ma4 ">
    
        <div class="pl3 ph5" @click="$router.push({name:'home'})" > 
            <img src="@/assets/img/groove.svg"  class="mt1 ml4 "  />
        </div>
        

        <div class="w-100 mt4 overflow-y-scroll flex flex-column">

            <div class=" mh5 mv4 pb7  cf w-95 flex  flex-row tc" >
                <div class="w-50  pv6">
                    <div class="tl   black b pt6 fa-5x">Don't stop the <br>  groove</div>
                    <div class="tl mv3  black2  pt2 f5-ns f4">Find new music you love with a search</div>
                    <input @keyup="keyUp" v-model="search" class="mv3 w-50 fl br-pill pa2 ph4 f6" type="text" placeholder="Search for an album...|">

                </div>

                <div class="w-50 cf">
                    <div class="wrapper">
                        <div class="box1"> </div>
                        <div class="box overlay"> 
                           <img src="@/assets/img/man.svg" alt="Snow" style="width:100%;"> 
                        </div>

                    </div>

                </div>              
            </div>



            <div class="mh5 mb4">
            
                <h1 class="pa3"> Popular Albums</h1>


                <div class=" justify-between flex flex-wrap">
                    <div class=" w-25 mv4 mr2 " v-for="(album, index) in albumList" :key="index" >
                        <div class="grow container">
                            <div v-for="(image, indexThree) in album.images.slice(0, 1)" >
                                <img  :src="image.url" alt="Snow" style="width:100%;"/>
                            </div>
                            <div class=" white b f3 artistName">{{album.name}}</div>
                            <div class="white f4 title" v-for="(artist, indexTwo) in album.artists" :key="indexTwo">{{artist.name}}</div>
                            <div class="line"></div>
                            <div class="button"> <img src="@/assets/img/playbutton.svg"/> </div>
                        </div>  
                    </div>
        
                </div>
            </div>            
        </div>     
    </div>
</template>


<style>
 .wrapper{
    width: 600px;
    height: 600px;
    position: relative;
    margin: 30px;
 }
 .box{
    width: 100%;
    height: 90%;
    position: absolute;
    bottom: 50px;
    left: 0;
    
 }
 .box1{
    width: 100%;
    height: 128%;
    position: absolute;
    top: 10px;
    left: 0;
    background: #F2F2F7;
 }   
.overlay{
    z-index: 29;
    margin: 30px;
    
}

    .container {
    position: relative;
    text-align: left;
    color: red;
    }

    .artistName {
    position: absolute;
    top: 70%;
    left: 5%;
    }
    
    .title {
    position: absolute;
    top: 80%;
    left: 5%;
    }

    .button {
    position: absolute;
    top: 95%;
    right: 5%;
    width: 13%;
    } 
    .line {
    position: absolute;
    top: 80%;
    left: 35%;
    width: 40%;
    border-bottom: 1px solid white;
    }      


</style>


<script>

    
    import { mapGetters } from 'vuex';
    import { HTTP,   } from "@/common";



    export default {
        name: 'home',
        components: { },
        data(){return{
            albumList:[],
            search:""
        }},
        computed: {

        },
        watch: {

        },
        mounted() { 
           this.searchAlbums();
           
        },
        methods:{
            keyUp(event) { 
                if (event.code == "Enter") { 
                    this.navigateTo(); 
                }
             },
            navigateTo() { 
                this.$router.push({ name: 'searchpage', params:{text: this.search} }) 
             },         
            async searchAlbums () {
                let storedToken = localStorage.getItem("token")

                const result = await fetch(`https://api.spotify.com/v1/albums?ids=41MnTivkwTO3UUJ8DrqEJJ,6JWc4iAiJ9FjyK0B59ABb4,6UXCm6bOO4gFlDQZV5yL37` , {
                    method: 'GET',
                    headers: {
                        'Authorization' : 'Bearer ' + storedToken, 
                        'Content-Type': 'application/json'
                    },
                });

                let res = await result.json();
                this.albumList = res.albums
                return ;
            }
        }
    }
</script>