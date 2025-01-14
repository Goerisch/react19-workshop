import {useMutation, useQueryClient} from '@tanstack/react-query';
import {FormNames} from '../../../util/FormNames';
import {AddToCartResult} from './types';

// Eigener Hook, für API-Aufrufe
export const useCart = (
    cartSize: number,
    setCartSize: React.Dispatch<React.SetStateAction<number>>,
) => {
    const queryClient = useQueryClient();

    const addToCartMutationClient = useMutation(
        {
            mutationKey: ['addToCart'],
            mutationFn: (formData: FormData) => addToCart(formData),
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

    const addToCart = async (formData: FormData): Promise<AddToCartResult> => {
        const itemID = formData.get(FormNames.id);
        const quantity = formData.get(FormNames.quantity);

        console.log(itemID);
        console.log(quantity);

        // Simuliert eine langsame asynchrone API-Anfrage
        await new Promise<void>((resolve) => setTimeout(resolve, 2000));

        if (itemID === '1') {
            setCartSize(cartSize + Number(quantity));
            return Promise.resolve({
                success: true,
                cartSize: cartSize + Number(quantity),
                message: 'The item is added to the cart.',
            });
        } else {
            return Promise.resolve({
                success: false,
                message: 'The item is sold out.',
                cartSize,
            });
        }
    };

    return {
        addToCartMutationClient,
    };
};
