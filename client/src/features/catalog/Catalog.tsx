import ProductList from "./ProductList.tsx";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent.ts";
import LoadingComponent from "../../app/layout/LoadingComponent.tsx";

function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true); // Initialize loading state

    useEffect(() => {
        agent.Catalog.list()
            .then(products => {
                setProducts(products);
                setLoading(false); // Set loading to false once data is fetched
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setLoading(false); // Ensure loading state is set to false on error as well
            });
    }, []);

    if (loading) return <LoadingComponent message='Loading Product...'/>; // Display loading component while fetching data

    return (
        <>
            <ProductList products={products} />
        </>
    );
}

export default Catalog;
