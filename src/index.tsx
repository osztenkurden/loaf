import { MuiThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import Loaf from "./Window";
import Theme from "./Theme";
import "./Theme/styles/app.css";
import "./Theme/styles/fonts/montserrat.css";
import "./Theme/styles/index.css";

const App = <MuiThemeProvider theme={Theme}>
    <Loaf />
</MuiThemeProvider>;

ReactDOM.render(App, document.getElementById("root"));
