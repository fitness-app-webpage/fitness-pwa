import { router, BASE } from '../app';


import * as service from '../service/ApiService';
import "./pages/home"
import "./pages/login"
import "./pages/register"


const changeTitleAndAuthCheck = (context, commands) => {
    document.title = context.route.name;
    if(!service.checkAuth() && context.route.path !== `${BASE}/login`) {
        return commands.redirect(`${BASE}/login`);
    }
}

const logout = (context, commands) => {
    localStorage.removeItem("auth");
    localStorage.removeItem("refresh");
}
const a = (context, commands) => {
    // console.log(context.route)
    console.log(router.getRoutes())
    
}
    
router.setRoutes([
    {path: `${BASE}/`, name: "Home", component: "login-div"},
    {path: `${BASE}/home`, name: "Home", component: "home-view"},
    {path: `${BASE}/login`, name: "Login", component: 'login-div', action: changeTitleAndAuthCheck},
    {path: `${BASE}/register`, name: "Register", component: 'register-div', action: e => document.title = e.route.name},
//     {path: `${BASE}/logout`, action: logout, redirect: `${BASE}/login`},
//     {path: `${BASE}/home`, name: "Home", component: 'travel-type-nav', action: changeTitleAndAuthCheck},
//     {path: `${BASE}/register-trip`, name: "Register trip", component: 'travel-type-nav', action: changeTitleAndAuthCheck},
//     {path: `${BASE}/register-trip/business`, name: "Register business trip", component: 'business-field', action: changeTitleAndAuthCheck},
//     {path: `${BASE}/register-trip/commute`, name: "Register commute trip", component: 'commute-field', action: changeTitleAndAuthCheck},
//     {path: `${BASE}/register-trip/private`, name: "Register private trip", component: 'private-field', action: changeTitleAndAuthCheck},
//     {path: `${BASE}/dashboard-manager`, name: "Dashboard manager", component: 'manager-dashboard', action: changeTitleAndAuthCheck},
//     {path: `${BASE}/dashboard-employee`, name: "Dashboard employee", component: 'employee-dashboard', action: changeTitleAndAuthCheck},
//     {path: `${BASE}/report-generation`, name: "Report Generation", component: 'report-generation', action: changeTitleAndAuthCheck},
//     {path: `(.*)`, name: "404 Not found", component: 'page-not-found', action: e => document.title = e.route.name}
]);

export { router } ;