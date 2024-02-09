import { router, BASE } from '../app';


import * as service from '../service/ApiService';
import "./pages/home"
import "./pages/login"
import "./pages/register"
import "./pages/profile"
import "./pages/logbook"
import "./pages/add-product"


const changeTitleAndAuthCheck = (context, commands) => {
    document.title = context.route.name;
    if(!service.checkAuth() && context.route.path !== `${BASE}/login`) {
        console.log("a")
        return commands.redirect(`${BASE}/login`);
    }
}

const logout = () => {
    service.logout();
}
    
router.setRoutes([
    {path: `${BASE}/`, redirect: service.checkAuth() ? `${BASE}/home` : `${BASE}/login`},
    {path: `${BASE}/home`, name: "Home", component: "home-view", action: changeTitleAndAuthCheck},
    {path: `${BASE}/login`, name: "Login", component: 'login-div', action: changeTitleAndAuthCheck},
    {path: `${BASE}/logout`, action: logout},
    {path: `${BASE}/register`, name: "Register", component: 'register-div', action: e => document.title = e.route.name},
    {path: `${BASE}/profile`, name: "Profile", component: 'profile-page', action: changeTitleAndAuthCheck},
    {path: `${BASE}/logbook`, name: "Logbook", component: 'logbook-page', action: changeTitleAndAuthCheck},
    {path: `${BASE}/addproduct`, name: "Logbook", component: 'addproduct-page', action: changeTitleAndAuthCheck}, 
//     {path: `${BASE}/dashboard-manager`, name: "Dashboard manager", component: 'manager-dashboard', action: changeTitleAndAuthCheck},
//     {path: `${BASE}/dashboard-employee`, name: "Dashboard employee", component: 'employee-dashboard', action: changeTitleAndAuthCheck},
//     {path: `${BASE}/report-generation`, name: "Report Generation", component: 'report-generation', action: changeTitleAndAuthCheck},
//     {path: `(.*)`, name: "404 Not found", component: 'page-not-found', action: e => document.title = e.route.name}
]);

export { router } ;