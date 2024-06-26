import Catalog from "../../features/catalog/Catalog.tsx";
import Header from "./Header.tsx";
import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {useState} from "react";


function App() {
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
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Header handleThemeChange={handleThemeChange} darkMode={darkMode}/>
            <Container>
                <Catalog/>
            </Container>
        </ThemeProvider>
    );
}

export default App;

