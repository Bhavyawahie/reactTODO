import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createTheme, ThemeProvider } from "@material-ui/core"
import store from "./store"
import App from "./App"
import { yellow } from "@material-ui/core/colors"

const theme = createTheme({
    palette: {
        primary: {
            main: '#f5ba13'
        }
    }
})

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <App/>
        </Provider>
    </ThemeProvider>,
    document.getElementById("root")
)
