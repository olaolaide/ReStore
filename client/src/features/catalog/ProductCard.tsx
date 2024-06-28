import {
    Avatar,
    Button,
    Card, CardActions,
    CardContent, CardHeader,
    CardMedia,
    Typography
} from "@mui/material";
import {Link} from "react-router-dom";
import {useState} from "react";
import agent from "../../app/api/agent";
import {LoadingButton} from "@mui/lab";
import {useStoreContext} from "../../app/context/StoreContext.tsx";
import {currencyFormat} from "../../app/utils/util.ts";

interface Props {
    product: Product;
}

function ProductCard({product}: Props) {
    const [loading, setLoading] = useState(false);

    const {setBasket} = useStoreContext()

    function handleAddItem(productId: number) {
        setLoading(true);
        agent.Basket.addItem(productId)
            .then(basket => setBasket(basket))
            .catch(error => console.error(error))
            .finally(() => setLoading(false));
    }

    return (
        <Card>
            <CardHeader avatar={
                <Avatar sx={{bgcolor: 'secondary.main'}}>
                    {product.name.charAt(0).toUpperCase()}
                </Avatar>
            } title={product.name} titleTypographyProps={{
                sx: {
                    fontWeight: 'bold',
                    color: 'primary.main'
                }
            }}/>
            <CardMedia
                sx={{height: 140, backgroundSize: 'contain', bgcolor: 'primary.light'}}
                image={product.pictureUrl}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" color='secondary'>
                    {currencyFormat(product.price)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton loading={loading} onClick={() => handleAddItem(product.id)} size="small">
                    Add to Cart
                </LoadingButton>
                <Button size="small" component={Link} to={`/catalog/${product.id}`}>View</Button>
            </CardActions>
        </Card>
    );
}

export default ProductCard;
