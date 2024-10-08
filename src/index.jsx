import { hydrate, prerender as ssr } from "preact-iso";

import "./style.css";
import "./assets/css/bootstrap.css";
import AppRoutes from "./routes/appRoutes";
import store from "./store";
import { AxiosInterceptor } from "./service";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <AxiosInterceptor>
            <AppRoutes />
          </AxiosInterceptor>
        </BrowserRouter>
      </Provider>
      <ToastContainer theme="colored" />
    </>
  );
}

if (typeof window !== "undefined") {
  hydrate(<App />, document.getElementById("app"));
}

export async function prerender(data) {
  return await ssr(<App {...data} />);
}
