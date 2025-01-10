import {useActionState} from 'react';
import {NestedComponent} from './NestedComponent';
import {FormNames} from '../../../util/FormNames';

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

export function FormStatusExample() {
    const initialState: AddToCartResult = {
        success: false,
        cartSize: 0,
        message: '',
    };
    const [, formAction, isPending] = useActionState(addToCart, initialState);

    return (
        <form
            style={{display: 'flex', flexDirection: 'column'}}
            action={formAction}
        >
            <label htmlFor='itemID'>
                ItemId:
                <input
                    type='number'
                    name={FormNames.id}
                    style={{height: 30, width: 300, margin: '1rem'}}
                />
            </label>
            <label htmlFor='quantity'>
                Quantity:
                <input
                    type='number'
                    name={FormNames.quantity}
                    style={{height: 30, width: 300, margin: '1rem'}}
                />
            </label>
            <button style={{margin: '1rem'}} type='submit' disabled={isPending}>
                Submit
            </button>
            <NestedComponent />
        </form>
    );
}
