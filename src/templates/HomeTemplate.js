import React from "react";
import { Route } from "react-router-dom";
import Navbar from "./../components/navbar";

const HomeLayout = props => {
  return (
    <div>
      <Navbar position="fixed" />
      {props.children}
    </div>
  );
};

export default function HomeTemplate({ Component, ...props }) {
  return (
    <Route
      {...props}
      render={propsComponent => (
        <HomeLayout>
          <Component {...propsComponent} />
        </HomeLayout>
      )}
    />
  );
}
