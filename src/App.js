import React from "react" ;
import { Routes, Route, Switch } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Layout } from "./components/Layout";
import { Home } from "./containers/Home";
import { Signin } from "./containers/Signin";
import { Signup } from "./containers/Signup";
import { Products } from "./containers/Products";
import { Orders } from "./containers/Orders";
import { Categories } from "./containers/Categories";

const App = () => {
  return (
    <> 
      <Routes>
        <Route exact path="/" element={ <Home/> } />
        <Route path="products" element={ <Products/> } />
        <Route path="orders" element={ <Orders/> } />
        <Route path="categories" element={ <Categories/> } />

        <Route path="signin" element={ <Signin/> } />
        <Route path="signup" element={ <Signup/> } />
      </Routes>
    </>
  );
}

export default App;
