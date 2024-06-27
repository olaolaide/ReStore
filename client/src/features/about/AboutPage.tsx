﻿import {
    Button,
    ButtonGroup,
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    Alert,
    AlertTitle
} from "@mui/material";
import agent from "../../app/api/agent";
import {useState} from "react";

function AboutPage() {
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    function getValidationError() {
        agent.testErrors.getValidationError()
            .catch(error => {
                if (error) {
                    setValidationErrors(error);
                }
            });
    }

    return (
        <Container>
            <Typography gutterBottom variant="h2">
                Errors for testing
            </Typography>
            <ButtonGroup fullWidth>
                <Button
                    variant="contained"
                    onClick={() => agent.testErrors.get400Error().catch(error => console.log(error))}
                >
                    Test 400 Error
                </Button>
                <Button
                    variant="contained"
                    onClick={() => agent.testErrors.get401Error().catch(error => console.log(error))}
                >
                    Test 401 Error
                </Button>
                <Button
                    variant="contained"
                    onClick={() => agent.testErrors.get404Error().catch(error => console.log(error))}
                >
                    Test 404 Error
                </Button>
                <Button
                    variant="contained"
                    onClick={() => agent.testErrors.get500Error().catch(error => console.log(error))}
                >
                    Test 500 Error
                </Button>
                <Button
                    variant="contained"
                    onClick={getValidationError}
                >
                    Test Validation Error
                </Button>
            </ButtonGroup>

            {validationErrors.length > 0 && (
                <Alert severity='error'>
                    <AlertTitle> Validation Errors</AlertTitle>
                    <List>
                        {validationErrors.map(error => (
                            <ListItem key={error}>
                                <ListItemText>{error}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Alert>
            )}
        </Container>
    );
}

export default AboutPage;
