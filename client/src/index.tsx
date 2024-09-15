import * as React from "react";
import ReactDOM from "react-dom/client";

// Use consistent styling
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { App } from "app";

import { HelmetProvider } from "react-helmet-async";

import { Provider } from "react-redux";

import { store } from "./app/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <>
    <Provider store={store}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Provider>
  </>
);
