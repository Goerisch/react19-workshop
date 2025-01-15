import {useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {ResultComponent} from './ResultComponent';
import {FormNames} from '../../../enum/FormNames';
import {useCart} from './useCart';
import {Input} from './types';

//Beispiel für die Verwendung von useActionState mit React Hook Form Validierung
export function FormContainer() {
    const formRef = useRef<HTMLFormElement>(null);
    const [cartSize, setCartSize] = useState<number>(0);
    const {
        handleSubmit,
        register,
        formState: {errors},
    } = useForm<Input>({mode: 'onBlur'});
    const {addToCartMutationClient} = useCart(cartSize, setCartSize);

    return (
        <form ref={formRef}>
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
            <button
                type='button'
                onClick={() =>
                    handleSubmit(() =>
                        addToCartMutationClient.mutateAsync(
                            new FormData(formRef.current!),
                        ),
                    )()
                }
                disabled={addToCartMutationClient.isPending}
            >
                Submit
            </button>
            <ResultComponent state={addToCartMutationClient.data} />
        </form>
    );
}
