import {useActionState} from 'react';
import {FormNames} from '../../../enum/FormNames';

interface AddToCartResult {
    success: boolean;
    cartSize: number;
    message: string;
}

async function addToCart(
    prevState: AddToCartResult,
    formData: FormData,
): Promise<AddToCartResult> {
    const itemID = formData.get(FormNames.id);
    const quantity = formData.get(FormNames.quantity);

    console.log(itemID);
    console.log(quantity);

    // Simuliert eine langsame asynchrone API-Anfrage
    await new Promise<void>((resolve) => setTimeout(resolve, 2000));

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

export function ActionFormExample() {
    const initialState: AddToCartResult = {
        success: false,
        cartSize: 0,
        message: '',
    };
    const [formState, formAction, isPending] = useActionState(
        addToCart,
        initialState,
    );

    return (
        <form action={formAction}>
            <p>ItemId:</p>
            <input type='number' name={FormNames.id} />
            <p>Quantity:</p>
            <input type='number' name={FormNames.quantity} />
            <button type='submit' disabled={isPending}>
                Submit
            </button>
            <br />
            {isPending && <div className='loading'>Adding to cart...</div>}
            {formState?.success && (
                <div className='toast'>
                    Added to cart! Your cart now has {formState.cartSize} items.
                </div>
            )}
            {formState?.success === false && formState.message.length > 1 && (
                <div className='error'>
                    Failed to add to cart: {formState.message}
                </div>
            )}
        </form>
    );
}
