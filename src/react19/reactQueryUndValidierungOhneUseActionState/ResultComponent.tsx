import {FormNames} from '../../enum/FormNames';
import {useMutationState} from '@tanstack/react-query';
import {AddToCartResult} from './types';

export const ResultComponent = ({state}: {state?: AddToCartResult}) => {
    // kann überall im Code verwendet werden
    const variables = useMutationState<FormData>({
        filters: {mutationKey: ['addToCart'], status: 'pending'},
        select: (mutation) => mutation.state.variables as FormData,
    })[0];

    return (
        <div>
            {variables && <div>Fetching cart...</div>}
            <p>
                Adding Item with ID:{variables?.get(FormNames.id)?.toString()}
            </p>
            <p>Quantity: {variables?.get(FormNames.quantity)?.toString()}</p>
            <h1>Cart overview</h1>
            <p>Cart size: {state?.cartSize}</p>
            <p>{state?.message}</p>
            <p>Success:{state?.success ? 'true' : 'false'}</p>
        </div>
    );
};
