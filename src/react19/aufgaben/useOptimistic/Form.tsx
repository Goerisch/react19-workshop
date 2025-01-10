import {useActionState} from 'react';
import {NestedComponent} from './NestedComponent';

export function OptimisticFormExample() {
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
        queryData: FormData,
    ): Promise<AddToCartResult> {
        const itemID = queryData.get('itemID');
        const quantity = Number(queryData.get('quantity'));

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
        <form
            style={{display: 'flex', flexDirection: 'column'}}
            action={formAction}
        >
            <label htmlFor='itemID'>
                ItemId:
                <input
                    type='number'
                    name='itemID'
                    style={{height: 30, width: 300, margin: '1rem'}}
                />
            </label>
            <label htmlFor='quantity'>
                Quantity:
                <input
                    type='number'
                    name='quantity'
                    style={{height: 30, width: 300, margin: '1rem'}}
                />
            </label>
            <button style={{margin: '1rem'}} type='submit' disabled={isPending}>
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
