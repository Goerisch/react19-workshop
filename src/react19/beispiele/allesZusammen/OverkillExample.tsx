import {startTransition, useActionState, useOptimistic, useRef} from 'react';
import {FormNames} from '../../../enum/FormNames';
import {useForm} from 'react-hook-form';
import {ResultComponent} from './ResultComponent';
import {useCart} from './useCart';

type Input = {
    itemID: number;
    quantity: number;
};
//Beispiel für die Verwendung von useActionState mit React Hook Form Validierung und React Query
export function OverkillExample() {
    const [formState, formAction, isPending] = useActionState(
        action,
        initialState,
    );
    const formRef = useRef<HTMLFormElement>(null);
    const {
        handleSubmit,
        register,
        formState: {errors},
    } = useForm<Input>({mode: 'onBlur'});
    const [optimisticState, setOptimisticState] = useOptimistic(formState);
    const {addToCartMutationClient} = useCart();

    async function action(
        prevState: AddToCartResult,
        formData: FormData,
    ): Promise<AddToCartResult> {
        setOptimisticState({
            success: true,
            cartSize:
                prevState.cartSize + Number(formData.get(FormNames.quantity)),
            message: 'The item is added to the cart.',
        });

        return addToCartMutationClient.mutateAsync({
            prevState,
            formData,
        });
    }

    return (
        <form
            action={formAction}
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

            <ResultComponent
                state={optimisticState}
                pending={isPending}
                data={addToCartMutationClient.variables?.formData}
            />
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
