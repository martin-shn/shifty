// import { HomePage } from './pages/HomePage';
import {HomePage} from './pages/Home-page';
import { LoginPage } from './pages/Login-page';


const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/login',
    component: LoginPage,
  },


];

export default routes;
