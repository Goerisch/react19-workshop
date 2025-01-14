import {useFormStatus} from 'react-dom';
import {AddToCartResult} from './ActionForm';
import {FormNames} from '../../../util/FormNames';

export const ResultComponent = ({state}: {state: AddToCartResult}) => {
    const {pending, data} = useFormStatus();
    if (data) {
        console.log(data);
    }

    return (
        <div>
            {pending && <div>Fetching cart...</div>}
            <p>Adding Item with ID:{data?.get(FormNames.id)?.toString()}</p>
            <p>Quantity: {data?.get(FormNames.quantity)?.toString()}</p>
            <h1>Cart overview</h1>
            <p>Cart size: {state?.cartSize}</p>
            <p>{state?.message}</p>
            <p>Success:{state?.success ? 'true' : 'false'}</p>
        </div>
    );
};
