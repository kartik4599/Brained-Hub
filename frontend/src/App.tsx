import { useEffect } from "react";
import Header from "./components/Header";
import { Box } from "@chakra-ui/react";
import { Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AuthPage from "./components/Auth/AuthPage";
import { Route, Navigate } from "react-router";
import { authAction } from "./redux/authRedux";
import axios from "axios";
import AllProducts from "./components/Products/AllProducts";
import AddProduct from "./components/Products/AddProduct";
import SearchProduct from "./components/Products/SearchProduct";

function App() {
  const { isLogin } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const checkUser = () => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch(authAction.setUser(JSON.parse(user)));
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Box>
      <Header />
      <Routes>
        {!isLogin && (
          <>
            <Route path="/" element={<AuthPage />} />
            <Route path="*" element={<Navigate to={"/"} replace />} />
          </>
        )}
        {isLogin && (
          <>
            <Route path="/" element={<AllProducts />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/search" element={<SearchProduct />} />
            <Route path="*" element={<Navigate to={"/"} replace />} />
          </>
        )}
      </Routes>
    </Box>
  );
}

export default App;
