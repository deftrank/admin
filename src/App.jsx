// import { BrowserRouter, useLocation } from "react-router-dom";
// import Layout from "./layouts/Layout";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./router/AppRoutes";
// import { Blank } from "./layouts/Blank";
import store from "./store";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { AxiosInterceptor } from "./service";

function App() {
  // const location = useLocation();
  // const isAuthPath = location.pathname.includes("auth") || location.pathname.includes("error") || location.pathname.includes("under-maintenance") | location.pathname.includes("blank");
  return (
    <>
      <Provider store={store}>
        <AxiosInterceptor>
          <AppRoutes />
        </AxiosInterceptor>
      </Provider>
      <ToastContainer theme="colored" />
    </>
  );
}

export default App;
