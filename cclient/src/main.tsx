import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MsalProvider } from "@azure/msal-react";
import { Configuration, PublicClientApplication } from "@azure/msal-browser";
// MSAL configuration
const configuration: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_CLIENT_ID as string,
    authority: `https://login.microsoftonline.com/${
      import.meta.env.VITE_TENANT_ID as string
    }`,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
};
export const pca = new PublicClientApplication(configuration);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <MsalProvider instance={pca}>
    <App />
  </MsalProvider>
);
