import React from "react";
// import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// import Home from "./pages/home/home";
// import About from "./pages/home/about";
// import ListMovie from "./pages/home/list-movie";
import PageNotFound from "./pages/page-not-found";
import { routesHome, routesAdmin } from "./routes";
import HomeTemplate from "./templates/HomeTemplate";
import AdminTemplate from "./templates/AdminTemplate";
import Admin from "./pages/admin/admin";
import ModalLogin from './components/modal-login';
import ModalSignin from './components/modal-signin';
import ModalForgotPass from './components/modal-forgot-pass'
import ModalProfile from './components/modal-profile'
import moment from 'moment';
import localVI from 'moment/locale/vi';

import createHistory from "history/createBrowserHistory"
import { ConnectedRouter } from 'react-router-redux'
export const history = createHistory()
history.listen((location, action) => {
  window.scrollTo(0, 0)
})

moment.locale('vi', localVI);



const showMenuHome = routes => {
  if (routes && routes.length > 0) {
    return routes.map((item, index) => {
      return (
        <HomeTemplate
          key={index}
          path={item.path}
          exact={item.exact}
          Component={item.component}
        />
      );
    });
  }
};

const showMenuAdmin = routes => {
  if (routes && routes.length > 0) {
    return routes.map((item, index) => {
      return (
        <AdminTemplate
          key={index}
          path={item.path}
          exact={item.exact}
          Component={item.component}
        />
      );
    });
  }
};

function App() {
  return (
    <BrowserRouter>
      {/* <ConnectedRouter history={history}> */}
        <div>
          <ModalLogin />
          <ModalSignin />
          <ModalForgotPass />
          <ModalProfile />


          <Switch>
            {showMenuHome(routesHome)}
            {showMenuAdmin(routesAdmin)}

            {/* Trang chu */}
            {/* <Route path="/" exact component={Home} /> */}
            {/* Trang About */}
            {/* <Route path="/about" component={About} /> */}
            {/* Trang ListMovie */}
            {/* <Route path="/list-movie" component={ListMovie} /> */}

            <Route path="/admin" component={Admin} />
            {/* Trang PageNotFound - để cuối cùng*/}
            <Route path="" component={PageNotFound} />
          </Switch>
        </div>
      {/* </ConnectedRouter> */}
    </BrowserRouter>
  );
}

export default App;
