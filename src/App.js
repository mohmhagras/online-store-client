import "./index.css";
import React, { lazy, Suspense } from "react";
import { GlobalProvider } from "./context/GlobalContext";
import Header from "./components/Header/Header";
//import Products from "./pages/Products";
//import Product from "./pages/Product";
//import NotFound from "./pages/NotFound";
//import Cart from "./pages/Cart";
import { Switch, Route } from "react-router-dom";
const Products = lazy(() => import("./pages/Products"));
const Cart = lazy(() => import("./pages/Cart"));
const Product = lazy(() => import("./pages/Product"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));
class App extends React.Component {
  render() {
    return (
      <GlobalProvider>
        <Header />
        <Suspense fallback={<div></div>}>
          <Switch>
            <Route exact path="/">
              <Products />
            </Route>
            <Route exact path="/cart">
              <Cart />
            </Route>
            <Route exact path="/checkout">
              <Checkout />
            </Route>
            <Route exact path="/admin">
              <Admin />
            </Route>
            <Route path="/product/:productId">
              <Product />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </GlobalProvider>
    );
  }
}
export default App;
