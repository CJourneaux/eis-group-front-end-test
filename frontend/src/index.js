import * as React from "react";
import axios from "axios";
import { render } from "react-dom";
import { CSSReset, ThemeProvider } from "@chakra-ui/core";

import { AppLayout } from "./components";
import ProductDropperPage from "./product-dropper-page";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.timeout = 10000; // for some reason, the first request takes a very long time

const rootElement = document.getElementById("root");
render(
  <React.StrictMode>
    <ThemeProvider>
      <CSSReset />
      <AppLayout>
        <ProductDropperPage />
      </AppLayout>
    </ThemeProvider>
  </React.StrictMode>,
  rootElement
);
