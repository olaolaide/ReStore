import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    Divider,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound.tsx";
import LoadingComponent from "../../app/layout/LoadingComponent.tsx";
import {useStoreContext} from "../../app/context/StoreContext.tsx";
import {LoadingButton} from "@mui/lab";
import {toast} from "react-toastify";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    type: string;
    brand: string;
    quantityInStock: number;
}

function ProductDetails() {
    const {basket, setBasket, removeItem, addItem} = useStoreContext();
    const {id} = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const item = basket?.items.find(i => i.productId === product?.id);

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        setQuantity(value);
    };

    useEffect(() => {
        if (item) setQuantity(item.quantity);
        agent.Catalog.details(Number(id))
            .then((response) => setProduct(response))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, [id, item]);

    if (loading) return <LoadingComponent message='Loading Product...'/>;
    if (!product) return <NotFound/>;

    const handleUpdateCart = (productId: number, quantity: number) => {
        setSubmitting(true);
        if (!item || quantity > item.quantity) {
            const updateQuantity = item ? quantity - item.quantity : quantity;
            agent.Basket.addItem(productId, updateQuantity)
                .then((updatedBasket) => setBasket(updatedBasket))
                .catch((error) => {
                    console.error("Error adding item to basket:", error);
                    toast.error("Failed to add item to basket. Please try again.");
                })
                .finally(() => setSubmitting(false));
        } else {
            const updatedQuantity = item.quantity - quantity;
            agent.Basket.removeItem(productId, updatedQuantity)
                .then(() => removeItem(productId, updatedQuantity))
                .catch((error) => {
                    console.error("Error removing item from basket:", error);
                    toast.error("Failed to remove item from basket. Please try again.");
                })
                .finally(() => setSubmitting(false));
        }
    };


    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{width: '100%'}}/>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h3">{product.name}</Typography>
                <Divider sx={{mb: 2}}/>
                <Typography variant="h4" color="secondary">${(product.price / 100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            variant='outlined'
                            type='number'
                            label='Quantity in Cart'
                            fullWidth
                            value={quantity}
                            onChange={handleQuantityChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                            onClick={() => handleUpdateCart(product?.id, quantity)}
                            loading={submitting}
                            sx={{height: '55px'}}
                            color='primary'
                            size='large'
                            variant='contained'
                            fullWidth
                            disabled={item?.quantity === quantity || (!item && quantity === 0)}
                        >
                            {item ? 'Update Quantity' : 'Add to Cart'}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ProductDetails;
