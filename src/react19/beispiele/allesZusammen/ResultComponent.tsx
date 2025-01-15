import {FormNames} from '../../../enum/FormNames';
import {AddToCartResult} from './OverkillExample';

export const ResultComponent = ({
    state,
    pending,
    data,
}: {
    state: AddToCartResult;
    pending: boolean;
    data?: FormData;
}) => {
    return (
        <div>
            {
                // Workaround in Form verhindert die Nutzung von useFormStatus
            }
            {pending && <div>Fetching cart...</div>}
            <p>
                Adding Item with ID:
                {pending && data?.get(FormNames.id)?.toString()}
            </p>
            <p>
                Quantity: {pending && data?.get(FormNames.quantity)?.toString()}
            </p>
            <h1>Cart overview</h1>
            <p>Cart size: {state?.cartSize}</p>
            <p>{state?.message}</p>
            <p>Success:{state?.success ? 'true' : 'false'}</p>
        </div>
    );
};
