import React from "react";
import ReactDOM from "react-dom";
import SnackbarProvider from "notistack";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./index.scss";

ReactDOM.render(
    <React.StrictMode>
        <SnackbarProvider
            maxSnack={5}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            TransitionProps={{ direction: "right" }}
        >
            <App />
        </SnackbarProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
