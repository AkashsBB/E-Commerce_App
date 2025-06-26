import { Navigate, Route, Routes} from 'react-router-dom';

import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import LoadingSpinner from './components/LoadingSpinner';
import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage'

import Navbar from './components/Navbar.jsx';
import {Toaster} from "react-hot-toast";
import { useUserStore } from "./store/useUserStore";
import { useEffect } from "react";
import {useCartStore} from "./store/useCartStore";
// import { get } from 'express/lib/response.js';
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";


function App() {
  const { user,checkAuth ,checkingAuth} = useUserStore();
  const { getCartItems } = useCartStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);  // to solve the issue of automatic switch to login page after login and switch to home page and when refres the page we are redirected to login page

  useEffect(() => {
    if(!user) return;

    getCartItems();
  }, [getCartItems, user]);

  if(checkingAuth) return <LoadingSpinner/>;

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path = '/' element={<HomePage/>}/>
        <Route path = '/signup' element = { !user ? <SignUpPage/> : <Navigate to ='/'/>}/>
        <Route path = '/login' element = { !user ? <LoginPage/> : <Navigate to='/'/>}/>
        <Route 
          path='/admin' 
          element={user?.role === "admin" ? <AdminPage /> : <Navigate to='/login' />}
        />

        <Route 
          path = '/secret-dashboard'
          element = {user?.role === "admin" ? <AdminPage /> : <Navigate tp='/login'/>}
        />

        <Route path='/category/:category' element={<CategoryPage />} />
        <Route path='/cart' element={user ? <CartPage /> : <Navigate to='/login' />} />
        <Route
						path='/purchase-success'
						element={user ? <PurchaseSuccessPage /> : <Navigate to='/login' />}
					/>
					<Route path='/purchase-cancel' element={user ? <PurchaseCancelPage /> : <Navigate to='/login' />} />
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App
