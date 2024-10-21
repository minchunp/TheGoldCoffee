'use client';

import store from "./index";
import { Provider } from "react-redux";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
   return (
      <Provider store={store}>
         {children}
      </Provider>
   )
};

export default AppProvider;
