import {Basket} from "../models/basket.ts";
import {createContext, PropsWithChildren, useContext, useState, useEffect} from "react";
import agent from "../api/agent.ts";

interface StoreContextValue {
    basket: Basket | null;
    setBasket: (basket: Basket) => void;
    removeItem: (productId: number, quantity?: number) => Promise<void>;
    addItem: (productId: number, quantity: number) => Promise<void>;
    loading: boolean;
    total: number;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function useStoreContext() {
    const context = useContext(StoreContext);

    if (context === undefined) {
        throw new Error("Oops, we don't seem to be inside a provider!");
    }

    return context;
}

export function StoreProvider({children}: PropsWithChildren<any>) {
    const [basket, setBasket] = useState<Basket | null>(null);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        agent.Basket.get()
            .then(basket => {
                setBasket(basket);
                calculateTotal(basket);
            })
            .finally(() => setLoading(false));
    }, []);

    const calculateTotal = (basket: Basket | null) => {
        if (!basket) return;
        const newTotal = basket.items.reduce((accumulator, currentItem) => accumulator + currentItem.price * currentItem.quantity, 0);
        setTotal(newTotal); // Convert to pounds
    };

    const removeItem = async (productId: number, quantity: number) => {
        if (!basket) return;

        const items = [...basket.items];
        const itemIndex = items.findIndex(i => i.productId === productId);
        if (itemIndex >= 0) {
            items[itemIndex].quantity -= quantity;
            if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1);
            setBasket(prev => {
                const updatedBasket = {...prev!, items};
                calculateTotal(updatedBasket);
                return updatedBasket;
            });
            try {
                await agent.Basket.removeItem(productId, quantity);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const addItem = async (productId: number, quantity: number) => {
        if (!basket) return;

        const items = [...basket.items];
        const itemIndex = items.findIndex(i => i.productId === productId);

        if (itemIndex >= 0) {
            items[itemIndex].quantity += quantity;
        } else {
            items.push({brand: "", type: "", productId, quantity, price: 0, name: '', pictureUrl: ''}); // Adjust default values as needed
        }

        setBasket(prev => {
            const updatedBasket = {...prev!, items};
            calculateTotal(updatedBasket);
            return updatedBasket;
        });

        try {
            await agent.Basket.addItem(productId, quantity);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <StoreContext.Provider value={{basket, setBasket, removeItem, addItem, loading, total}}>
            {children}
        </StoreContext.Provider>
    );
}
