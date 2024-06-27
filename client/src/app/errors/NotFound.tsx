import {Container, Divider, Paper, Typography, Button} from "@mui/material";
import {Link} from "react-router-dom";

function NotFound() {

    return (
        <Container component={Paper} sx={{padding: 2, marginTop: 2}}>
            <Typography variant="h3" color="secondary" gutterBottom>
                Oops - we could not find what you are looking for
            </Typography>
            <Divider sx={{marginBottom: 2}}/>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to='/'
                sx={{mt: 2}}
            >
                Go to Home
            </Button>
        </Container>
    );
}

export default NotFound;
