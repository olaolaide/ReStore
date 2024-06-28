import Header from "./Header.tsx";
import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {useStoreContext} from "../context/StoreContext.tsx";
import {getCookie} from "../utils/util.ts";
import agent from "../api/agent.ts";
import LoadingComponent from "./LoadingComponent.tsx";

function App() {
    const {setBasket} = useStoreContext()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const buyerId = getCookie('buyerId')
        setLoading(true)
        if (buyerId) {
            agent.Basket.get()
                .then(basket => setBasket(basket))
                .catch(error => console.error(error))
                .finally(() => setLoading(false))
        } else {
            setLoading(false)
        }
    }, [setBasket]);

    const [darkMode, setDarkMode] = useState(false)
    const paletteType = darkMode ? "dark" : "light"
    const theme = createTheme({
        palette: {
            mode: paletteType,
            background: {
                default: darkMode ? '#121212' : '#eaeaea'
            }
        }
    })
    const handleThemeChange = () => {
        setDarkMode(prevState => !prevState)
    }
    if (loading) return <LoadingComponent message='Initializing app...'/>
    return (
        <ThemeProvider theme={theme}>
            <ToastContainer position='bottom-right' hideProgressBar theme="colored"/>
            <CssBaseline/>
            <Header handleThemeChange={handleThemeChange} darkMode={darkMode}/>
            <Container>
                <Outlet/>
            </Container>
        </ThemeProvider>
    );
}

export default App;

