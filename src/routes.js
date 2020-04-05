import Home from "./pages/home/home";
import About from "./pages/home/about";
import ListMovie from "./pages/home/list-movie";
import DetailMovie from "./pages/home/detail-movie";
import InsertPost from './pages/home/insert-post'
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
