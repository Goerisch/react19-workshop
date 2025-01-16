import {useActionState} from 'react';
import {NestedComponent} from './NestedComponent';
import {FormNames} from '../../../enum/FormNames';

export interface AddToCartResult {
    success: boolean;
    cartSize: number;
    message: string;
}

async function addToCart(
    prevState: AddToCartResult,
    formData: FormData,
): Promise<AddToCartResult> {
    await new Promise<void>((resolve) => setTimeout(resolve, 2000));
    const itemID = formData.get(FormNames.id);
    const quantity = Number(formData.get(FormNames.quantity));

    if (itemID === '1') {
        return {
            success: true,
            cartSize: prevState.cartSize + quantity,
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

export function Aufgabe2() {
    const initialState: AddToCartResult = {
        success: false,
        cartSize: 0,
        message: '',
    };
    const [, formAction, isPending] = useActionState(addToCart, initialState);

    return (
        <form action={formAction}>
            <p>ItemId:</p>
            <input type='number' name={FormNames.id} />
            <p>Quantity: </p>
            <input type='number' name={FormNames.quantity} />
            <button type='submit' disabled={isPending}>
                Submit
            </button>
            <NestedComponent />
        </form>
    );
}
