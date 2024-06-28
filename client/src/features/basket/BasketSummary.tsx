﻿import {TableContainer, Paper, Table, TableBody, TableRow, TableCell} from "@mui/material";
import {useStoreContext} from "../../app/context/StoreContext.tsx";
import {currencyFormat} from "../../app/utils/util.ts";

export default function BasketSummary() {
    const {total} = useStoreContext();
    const deliveryFee = total > 100 ? 0 : 100;
    const subtotal = total;

    return (
        <TableContainer component={Paper} variant={'outlined'}>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={2}>Subtotal</TableCell>
                        <TableCell align="right">{currencyFormat(subtotal)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Delivery fee*</TableCell>
                        <TableCell align="right">{currencyFormat(deliveryFee)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell align="right">{currencyFormat(subtotal + deliveryFee)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <span style={{fontStyle: 'italic'}}>*Orders over £100 qualify for free delivery</span>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
