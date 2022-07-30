import Vue from "vue"
import Vuex from "vuex"
import App from  "./app.vue"

import {router} from  "@/routes"

Vue.use(Vuex)

new Vue ({
    el:"#app",
    router, 
    render: h => h(App)
})


