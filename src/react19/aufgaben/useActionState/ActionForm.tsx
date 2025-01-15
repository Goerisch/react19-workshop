import {FormNames} from '../../../enum/FormNames';

interface AddToCartResult {
    success: boolean;
    cartSize: number;
    message: string;
}

export function ActionFormExample() {
    // Hook verwenden

    return (
        <form>
            <p>ItemId:</p>
            <input type='number' name={FormNames.id} />
            <p>Quantity: </p>
            <input type='number' name={FormNames.quantity} />
            <button type='submit'>Submit</button>
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
