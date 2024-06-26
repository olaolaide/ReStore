import {AppBar, Switch, Toolbar, Typography} from "@mui/material";

interface Props {
    darkMode: boolean
    handleThemeChange: () => void;
}

function Header({handleThemeChange, darkMode}: Props) {
    return (
        <AppBar position='static' sx={{mb: 4}}>
            <Toolbar>
                <Typography variant='h6'>
                    Re-Store
                </Typography>
                <Switch onChange={handleThemeChange} checked={darkMode}/>
            </Toolbar>
        </AppBar>
    );
}

export default Header;