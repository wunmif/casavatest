import { HTTP, getToken } from "@/common";
import homeComponent from "@/components/home"
import searchComponent from "@/components/searchpage"
// import aboutComponent from "@/components/about";





import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const router = new Router({
    mode: "hash",
    routes: [
        { path: "", name:"home", component: homeComponent },
        { path: "/search/:text?", component: searchComponent, name:"searchpage", props: true},
        // { path: "/about", name:"about", component: aboutComponent },
        
        
       

    ]
});

router.beforeResolve((to, from, next) => {
    
    let storedToken = localStorage.getItem("token")
    
    if (storedToken == null || storedToken == undefined || storedToken == "") {
        getToken()
        // console.log(jwtToken);
     }

    next();
    
})

export {router}