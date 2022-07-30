<template> 
    <div class="flex circular flex-column vh-100 ma4 ">
        
        <div class=" pl3  ph5" @click="$router.push({name:'home'})">
            <img src="@/assets/img/groove.svg"  class="mt1 ml4  "  />
        </div>
        

        <div class="w-100 mt6 overflow-y-scroll flex flex-column">
            <img src="@/assets/img/back.svg"  class="pt3 pl3 ml5 self-start h2 "  />
            <div class=" mh3 ph5  cf w-95 flex  flex-row tc" >
                
                <div class="w-50  ">
                    <div class="tl   black b pt3 f1-ns f2">Albums <br> matching  "{{filter}}"</div>
                    <div class="tl   black2  pv3 f5-ns f4">Find new music you love with a search</div>
                    <input @keyup="keyUp" v-model="search" class="mv3 w-50 fl br-pill pa2 ph4 f6" type="text" placeholder="Search for an album...|">

                </div>            
            </div>



            <div class=" mb4">
   
                <div class="ph3 justify-around flex flex-wrap">
                    <div class=" w-25 mv4 mr2 " v-for="(album, index) in albumList" :key="index" >
                        <div class="container">
                            <div v-for="(image, indexThree) in album.images.slice(0, 1)" >
                                <img  :src="image.url" alt="Snow" style="width:100%;"/>
                            </div>
                            <div class="white b f3 artistName">{{album.name}}</div>
                            <div class="white f4 title" v-for="(artist, indexTwo) in album.artists" :key="indexTwo">{{artist.name}}</div>
                            <div class="button"> <img src="@/assets/img/playbutton.svg"/> </div>
                        </div>  
                    </div>
        
                </div>
            </div>            
        </div>     
    </div>
</template>


<style>

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
    top: 70%;
    right: 5%;
    width: 15%;
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
            search:"", 
            filter:""
        }},
        computed: {

        },
        watch: {

        },
        mounted() { 
           
            if(this.$route.params.text !== undefined || this.$route.params.text !== null)  {
                this.search = this.$route.params.text
                this.searchAlbums();
            }   
        },
        methods:{
            keyUp(event) { 
                if (event.code == "Enter") { 
                    this.searchAlbums(); 
                }
             },
            async searchAlbums () {
                let storedToken = localStorage.getItem("token")
                this.$router.push({  params: { text: this.search } })
                const result = await fetch(`https://api.spotify.com/v1/search?q=${this.search}&type=album&market=Es` , {
                    method: 'GET',
                    headers: {
                        'Authorization' : 'Bearer ' + storedToken, 
                        'Content-Type': 'application/json'
                    },
                });

                let res = await result.json();
                this.albumList = res.albums.items
                this.filter = this.search
                this.search = ""
                return ;
            }
        }
    }
</script>