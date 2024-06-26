import {Button} from "@mui/material";
import ProductList from "./ProductList.tsx";
import {useEffect, useState} from "react";

function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    const addProduct = () => {
        setProducts(prevState => [
            ...prevState,
            {
                id: prevState.length + 1,
                name: 'product' + (prevState.length + 1),
                description: 'Some description',
                price: (prevState.length * 100) + 100,
                pictureUrl: 'http://example.com/picture.jpg',
                type: 'Some type',
                brand: 'Some brand',
                quantityInStock: 100
            }
        ]);
    };

    return (
        <>
            <ProductList products={products}/>
            <Button variant='contained' onClick={addProduct}>Add Product</Button>
        </>
    );
}

export default Catalog;
