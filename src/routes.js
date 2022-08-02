import { HTTP, getToken } from "@/common";
import homeComponent from "@/components/home"
import searchComponent from "@/components/searchpage"






import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const router = new Router({
    mode: "hash",
    routes: [
        { path: "/", name:"home", component: homeComponent },
        { path: "/search/:text?", component: searchComponent, name:"searchpage", props: true},

        
        
       

    ]
});

router.beforeResolve((to, from, next) => {
    
    
    
    
        getToken()
        // console.log(jwtToken);
     

    next();
    
})

export {router}