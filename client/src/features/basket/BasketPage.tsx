import {useStoreContext} from "../../app/context/StoreContext.tsx";
import {useState} from "react";
import LoadingComponent from "../../app/layout/LoadingComponent.tsx";
import {
    Box, Button, Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {Add, Delete, Remove} from "@mui/icons-material";
import BasketSummary from "./BasketSummary.tsx";
import {Link} from "react-router-dom";

function BasketPage() {
    const {loading, basket, removeItem, addItem} = useStoreContext();
    const [status, setStatus] = useState<{ [key: number]: { adding: boolean, removing: boolean } }>({});

    const handleAddItem = async (productId: number) => {
        setStatus(prev => ({...prev, [productId]: {...prev[productId], adding: true}}));
        await addItem(productId, 1);
        setStatus(prev => ({...prev, [productId]: {...prev[productId], adding: false}}));
    };

    const handleRemoveItem = async (productId: number, quantity: number) => {
        setStatus(prev => ({...prev, [productId]: {...prev[productId], removing: true}}));
        await removeItem(productId, quantity);
        setStatus(prev => ({...prev, [productId]: {...prev[productId], removing: false}}));
    };

    if (loading) return <LoadingComponent/>;

    if (!basket) return <Typography variant="h6" align="center">Your basket is empty</Typography>;

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="basket table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Subtotal</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basket.items.map((item) => (
                            <TableRow key={item.productId}>
                                <TableCell component="th" scope="row">
                                    <Box display='flex' alignItems='center'>
                                        <img alt={item.name} src={item.pictureUrl}
                                             style={{height: 50, marginRight: 20}}/>
                                        <span>{item.name}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="center">
                                    <LoadingButton
                                        loading={status[item.productId]?.adding || false}
                                        color='primary'
                                        onClick={() => handleAddItem(item.productId)}
                                    >
                                        <Add/>
                                    </LoadingButton>
                                    {item.quantity}
                                    <LoadingButton
                                        loading={status[item.productId]?.removing || false}
                                        color='primary'
                                        onClick={() => handleRemoveItem(item.productId, 1)}
                                    >
                                        <Remove/>
                                    </LoadingButton>
                                </TableCell>
                                <TableCell align="right">£{(item.price / 100).toFixed(2)}</TableCell>
                                <TableCell align="right">£{((item.price * item.quantity) / 100).toFixed(2)}</TableCell>
                                <TableCell align='right'>
                                    <IconButton
                                        color='error'
                                        onClick={() => handleRemoveItem(item.productId, item.quantity)}
                                    >
                                        <Delete/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {basket.items.length > 0 &&(<>
                <Grid container>
                    <Grid item xs={6}/>
                    <Grid item xs={6}>
                        <BasketSummary/>
                        <Button component={Link} to='/checkout' variant='contained' size='large'
                                fullWidth>Checkout</Button>
                    </Grid>
                </Grid>
            </>)}
        </>
    );
}

export default BasketPage;
