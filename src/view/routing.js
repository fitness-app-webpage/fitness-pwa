import { router, BASE } from '../app';


import * as service from '../service/ApiService';
import "./pages/home"
import "./pages/login"
import "./pages/register"
import "./pages/profile"
import "./pages/dairy"
import "./pages/add-product"
import "./pages/products"
import "./pages/product"
import "./pages/scan-page"
import "./pages/product-intake"
import "./pages/update-intake"


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
    {path: `${BASE}/logout`, action: logout, redirect: `${BASE}/login`},
    {path: `${BASE}/register`, name: "Register", component: 'register-div', action: e => document.title = e.route.name},
    {path: `${BASE}/profile`, name: "Profile", component: 'profile-page', action: changeTitleAndAuthCheck},
    {path: `${BASE}/dairy`, name: "Dairy", component: 'dairy-page', action: changeTitleAndAuthCheck},
    {path: `${BASE}/addproduct`, name: "Add a product", component: 'addproduct-page', action: changeTitleAndAuthCheck}, 
    {path: `${BASE}/products`, name: "Products", component: 'products-page', action: changeTitleAndAuthCheck},
    {path: `${BASE}/product/:id`, name: "Product", component: 'product-intake', action: changeTitleAndAuthCheck},
    {path: `${BASE}/products`, name: "Products", component: 'products-page', action: changeTitleAndAuthCheck},
    {path: `${BASE}/scan/product`, name: "Scan barcode", component: 'scan-page', action: changeTitleAndAuthCheck},
    {path: `${BASE}/intake/:id`, name: "Update intake", component: 'update-intake', action: changeTitleAndAuthCheck},
 
//     {path: `${BASE}/dashboard-manager`, name: "Dashboard manager", component: 'manager-dashboard', action: changeTitleAndAuthCheck},
//     {path: `${BASE}/dashboard-employee`, name: "Dashboard employee", component: 'employee-dashboard', action: changeTitleAndAuthCheck},
//     {path: `${BASE}/report-generation`, name: "Report Generation", component: 'report-generation', action: changeTitleAndAuthCheck},
//     {path: `(.*)`, name: "404 Not found", component: 'page-not-found', action: e => document.title = e.route.name}
]);

export { router } ;