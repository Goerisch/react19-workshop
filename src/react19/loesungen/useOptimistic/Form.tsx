import {useActionState, useOptimistic} from 'react';
import {NestedComponent} from './NestedComponent';
import {FormNames} from '../useFormStatus/FormStatus';

export function OptimisticFormLoesung() {
    const initialState: AddToCartResult = {
        success: false,
        cartSize: 0,
        message: '',
    };
    const [state, formAction, isPending] = useActionState(
        addToCart,
        initialState,
    );

    const [optimisticState, setOptimisticState] = useOptimistic(state);

    async function addToCart(
        prevState: AddToCartResult,
        formData: FormData,
    ): Promise<AddToCartResult> {
        const itemID = formData.get(FormNames.id);
        const quantity = formData.get(FormNames.quantity);

        setOptimisticState({
            success: true,
            cartSize: prevState.cartSize + Number(quantity),
            message: 'The item is added to the cart.',
        });

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
            <input type='number' name={FormNames.id} />
            <p>Quantity:</p>
            <input type='number' name={FormNames.quantity} />
            <button type='submit' disabled={isPending}>
                Submit
            </button>
            <NestedComponent state={optimisticState} />
        </form>
    );
}

export interface AddToCartResult {
    success: boolean;
    cartSize: number;
    message: string;
}
