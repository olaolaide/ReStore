import { AppBar, Badge, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";

const midLinks = [
    { title: 'catalog', path: '/catalog' },
    { title: 'about', path: '/about' },
    { title: 'contact', path: '/contact' },
];

const rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' },
];

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

function Header({ handleThemeChange, darkMode }: Props) {
    const navLinkStyle = {
        color: 'inherit',
        typography: 'h6',
        textDecoration: 'none',
        '&.active': {
            color: 'secondary.main'
        },
        '&:hover': {
            color: 'grey.500'
        },
    };

    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar>
                <Typography
                    variant="h6"
                    component={NavLink}
                    to="/"
                    sx={{ color: 'inherit', textDecoration: 'none' }}
                >
                    Re-Store
                </Typography>
                <Switch onChange={handleThemeChange} checked={darkMode} sx={{ ml: 2 }} />
                <List sx={{ display: 'flex', ml: 2 }}>
                    {midLinks.map(({ title, path }) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={navLinkStyle}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>
                <IconButton size="large" edge="start" color="inherit" sx={{ ml: 'auto', mr: 2 }}>
                    <Badge badgeContent="4" color="secondary">
                        <ShoppingCart />
                    </Badge>
                </IconButton>
                <List sx={{ display: 'flex' }}>
                    {rightLinks.map(({ title, path }) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={navLinkStyle}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
