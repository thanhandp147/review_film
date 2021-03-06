import Home from "./pages/home/home";
import About from "./pages/home/about";
import ListMovie from "./pages/home/list-movie";
import DetailMovie from "./pages/home/detail-movie";
import InsertPost from './pages/home/insert-post'
import InfoPost from './pages/home/InfoPost'
import InfoUser from './pages/home/info-user'
// import HOC from "./HOC";
import Dashboard from "./pages/admin/dashboard";
// import ThemNguoiDung from "./pages/admin/them-nguoi-dung";
// import DemoHook from "./HOOK/DemoHook";
// import DemoMaterial from "./pages/home/demo-material";

const routesHome = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: '/insert-post',
    exact: false,
    component: InsertPost
  },
  {
    path: "/about",
    exact: false,
    component: About
  },
  {
    path: "/list-movie",
    exact: false,
    component: ListMovie
  },
  {
    path: "/detail-movie/:id",
    exact: false,
    component: DetailMovie
  },
  {
    path: "/info-post/:id",
    exact: false,
    component: InfoPost
  },
  {
    path: '/info-user/:id',
    exact: false,
    component: InfoUser
  }
];

const routesAdmin = [
  {
    path: "/dashboard",
    exact: false,
    component: Dashboard
  },
  // {
  //   path: "/them-nguoi-dung",
  //   exact: false,
  //   component: ThemNguoiDung
  // }
];

export { routesHome, routesAdmin };
