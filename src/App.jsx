import { lazy, Suspense } from "react";

import { Routes, Route } from "react-router-dom";

import Layout from "./Layout";

import Home from "./Pages/Home";
import Menu from "./pages/Menu";
import DishDetail from "./pages/DishDetail";
import Cart from "./pages/Cart";
import SignIn from "./Pages/SignIn";
import NotFound from "./Pages/NotFound";

import RequireAuth from "./auth/RequireAuth";

const Checkout = lazy(() => import("./Pages/Checkout"));

function App() {
  return (
    <Suspense fallback={<p className="loading">Loading page...</p>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="menu" element={<Menu />} />

          <Route path="menu/:id" element={<DishDetail />} />

          <Route path="cart" element={<Cart />} />

          <Route path="signin" element={<SignIn />} />

          <Route element={<RequireAuth />}>
            <Route path="checkout" element={<Checkout />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
