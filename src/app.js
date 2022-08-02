import Vue from "vue"
import App from  "./app.vue"

import {router} from  "@/routes"



new Vue ({
    el:"#app",
    router, 
    render: h => h(App)
})


