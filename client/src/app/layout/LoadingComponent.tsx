import { Backdrop, CircularProgress, Container, Typography } from "@mui/material";

interface Props {
    message?: string;
}

function LoadingComponent({ message = 'Loading...' }: Props) {
    return (
        <Backdrop open={true} invisible={true}>
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress color="inherit" />
                {message && (
                    <Typography variant="h6" color="inherit" sx={{ ml: 2 }}>
                        {message}
                    </Typography>
                )}
            </Container>
        </Backdrop>
    );
}

export default LoadingComponent;
