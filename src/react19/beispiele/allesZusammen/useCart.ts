import {useMutation, useQueryClient} from '@tanstack/react-query';
import {FormNames} from '../../../enum/FormNames';
import {AddToCartResult} from './OverkillExample';

// Eigener Hook, für API-Aufrufe
export const useCart = () => {
    const queryClient = useQueryClient();

    const addToCartMutationClient = useMutation(
        {
            mutationKey: ['addToCartKey'],
            mutationFn: ({
                prevState,
                formData,
            }: {
                prevState: AddToCartResult;
                formData: FormData;
            }) => addToCart(prevState, formData),
            onError: (error) => {
                console.error(error);
                // Fehlerbehandlung (z. B. Anzeige einer Fehlermeldung)
            },
            onSuccess: (data) => {
                // Erfolgreiche Aktion (z. B. Anzeige einer Erfolgsmeldung)
                console.log(data);
            },
            onSettled: () => {
                // Wenn die Aktion abgeschlossen ist, wird der Cache für den Warenkorb ungültig gemacht
                //queryClient.invalidateQueries(['cart']);
            },
        },
        queryClient,
    );

    const addToCart = async (
        prevState: AddToCartResult,
        formData: FormData,
    ): Promise<AddToCartResult> => {
        const itemID = formData.get(FormNames.id);
        const quantity = formData.get(FormNames.quantity);

        console.log(itemID);
        console.log(quantity);

        // Simuliert eine langsame asynchrone API-Anfrage
        await new Promise<void>((resolve) => setTimeout(resolve, 2000));

        if (itemID === '1') {
            return Promise.resolve({
                success: true,
                cartSize: prevState.cartSize + Number(quantity),
                message: 'The item is added to the cart.',
            });
        } else {
            return Promise.resolve({
                success: false,
                message: 'The item is sold out.',
                cartSize: prevState.cartSize,
            });
        }
    };

    return {
        addToCartMutationClient,
    };
};
