import {startTransition, useActionState, useOptimistic, useRef} from 'react';
import {FormNames} from '../../../util/FormNames';
import {useForm} from 'react-hook-form';
import {ResultComponent} from './ResultComponent';

type Input = {
    itemID: number;
    quantity: number;
};
//Beispiel für die Verwendung von useActionState mit React Hook Form Validierung
export function ValidationExample() {
    const [formState, formAction, isPending] = useActionState(
        addToCart,
        initialState,
    );
    const formRef = useRef<HTMLFormElement>(null);
    const {
        handleSubmit,
        register,
        formState: {errors},
    } = useForm<Input>({mode: 'onBlur'});
    const [optimisticState, setOptimisticState] = useOptimistic(formState);

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

    return (
        <form
            // workaround, um das Formular zu validieren, bevor die Aktion ausgeführt wird
            ref={formRef}
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(() => {
                    startTransition(() =>
                        formAction(new FormData(formRef.current!)),
                    );
                })(e);
            }}
        >
            <p>ItemId:</p>
            <input
                type='number'
                {...register(FormNames.id, {
                    required: 'Item ID ist erforderlich',
                    min: {value: 1, message: 'Item ID muss mindestens 1 sein'},
                    valueAsNumber: true,
                })}
            />
            <p style={{color: 'red'}}>{errors.itemID?.message}</p>
            <p>Quantity:</p>
            <input
                type='number'
                {...register(FormNames.quantity, {
                    required: 'Quantity ist erforderlich',
                    min: {value: 1, message: 'Quantity muss mindestens 1 sein'},
                    valueAsNumber: true,
                })}
            />
            <p style={{color: 'red'}}>{errors.quantity?.message}</p>
            <button type='submit' disabled={isPending}>
                Submit
            </button>

            <ResultComponent state={optimisticState} />
        </form>
    );
}
export interface AddToCartResult {
    success: boolean;
    cartSize: number;
    message: string;
}

const initialState: AddToCartResult = {
    success: false,
    cartSize: 0,
    message: '',
};
