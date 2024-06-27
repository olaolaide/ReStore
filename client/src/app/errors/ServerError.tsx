import {Container, Divider, Paper, Typography} from "@mui/material";
import {useLocation} from "react-router-dom";

function ServerError() {
    const {state} = useLocation<{ error?: { title?: string; detail?: string } }>();

    return (
        <Container component={Paper} sx={{padding: 2, marginTop: 2}}>
            {state?.error ? (
                <>
                    <Typography variant="h3" color="secondary" gutterBottom>
                        {state.error.title}
                    </Typography>
                    <Divider sx={{marginBottom: 2}}/>
                    <Typography variant="body1">
                        {state.error.detail || "Internal Server Error"}
                    </Typography>
                </>
            ) : (
                <Typography variant="h5" gutterBottom>
                    Server Error
                </Typography>
            )}
        </Container>
    );
}

export default ServerError;
