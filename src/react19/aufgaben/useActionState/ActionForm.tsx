import {FormNames} from '../../../util/FormNames';

interface AddToCartResult {
    success: boolean;
    cartSize: number;
    message: string;
}

export function ActionFormExample() {
    /*
     */

    return (
        <form style={{display: 'flex', flexDirection: 'column'}}>
            <label htmlFor='itemID'>
                ItemId:
                <input
                    type='number'
                    name={FormNames.id}
                    style={{height: 30, width: 300, margin: '1rem'}}
                />
            </label>
            <label htmlFor='quantity'>
                Quantity:
                <input
                    type='number'
                    name={FormNames.quantity}
                    style={{height: 30, width: 300, margin: '1rem'}}
                />
            </label>
            <button style={{margin: '1rem'}} type='submit'>
                Submit
            </button>
        </form>
    );
}

async function addToCart(): Promise<AddToCartResult> {
    // Simuliert eine langsame asynchrone API-Anfrage
    await new Promise<void>((resolve) => setTimeout(resolve, 2000));

    /*
    Wenn die Id des Artikels 1 ist, dann sollte
    - success auf true gesetzt werden,
    - die Anzahl der Artikel im Warenkorb um die Anzahl der Artikel erhöht werden, die hinzugefügt werden sollen,
    - eine Erfolgsmeldung zurückgegeben werden.

    Sonst sollte
    - sucess auf false gesetzt werden,
    - die Anzahl der Artikel im Warenkorb unverändert bleiben
    - eine Rückmeldung gegeben werden, dass der Artikel derzeit nicht vorrätig ist.
    */
}
