import {Grid, List} from "@mui/material";
import ProductCard from "./ProductCard.tsx";

interface Props {
    products: Product[];
}

function ProductList({products}: Props) {
    return (
        <Grid container spacing={4}>
            {products.map(product => (
                <Grid item xs={3} key={product.id}>
                    <ProductCard product={product}/>
                </Grid>

            ))}
        </Grid>
    );
}

export default ProductList;