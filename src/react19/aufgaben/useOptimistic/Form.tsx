import {useActionState} from 'react';
import {NestedComponent} from './NestedComponent';
import {FormNames} from '../../../enum/FormNames';

export function Aufgabe3() {
    const initialState: AddToCartResult = {
        success: false,
        cartSize: 0,
        message: '',
    };
    const [state, formAction, isPending] = useActionState(
        addToCart,
        initialState,
    );

    async function addToCart(
        prevState: AddToCartResult,
        formData: FormData,
    ): Promise<AddToCartResult> {
        const itemID = formData.get(FormNames.id);
        const quantity = Number(formData.get(FormNames.quantity));

        await new Promise<void>((resolve) => setTimeout(resolve, 2000));

        console.log(itemID);
        console.log(quantity);

        if (itemID === '1') {
            return {
                success: true,
                cartSize: prevState.cartSize + Number(quantity),
                message: 'The item is added to the cart.',
            };
        } else {
            return {
                success: false,
                message: 'The item is sold out.',
                cartSize: prevState.cartSize,
            };
        }
    }

    return (
        <form action={formAction}>
            <p>ItemId:</p>
            <input type='number' name='itemID' />
            <p>Quantity:</p>
            <input type='number' name='quantity' />
            <button type='submit' disabled={isPending}>
                Submit
            </button>
            <NestedComponent state={state} />
        </form>
    );
}

export interface AddToCartResult {
    success: boolean;
    cartSize: number;
    message: string;
}
