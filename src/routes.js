// import { HomePage } from './pages/HomePage';
import {HomePage} from './pages/Home-page';
import { LoginPage } from './pages/Login-page';
import { MainPanel } from './pages/Main-panel';
import { MainTablePage } from './pages/Main-table';
import { SettingsPage } from './pages/Settings-page';


const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/main-panel',
    component: MainPanel,
  },
  {
    path: '/main-panel/settings',
    component: SettingsPage,
  },
  {
    path: '/main-panel/table',
    component: MainTablePage,
  },


];

export default routes;
