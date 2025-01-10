# Aufgabe 1

## Ziel

Der Button soll deaktiviert werden, wenn eine Anfrage an die API gesendet wird.
Wenn die Anfrage erfolgreich ist, soll eine Erfolgsmeldung angezeigt werden.
Wenn die Anfrage fehlschlägt, soll eine Fehlermeldung angezeigt werden.
Die Anzahl der Artikel im Warenkorb soll angezeigt aktualisiert werden, wenn ein Artikel hinzugefügt wird.

Nutze den Hook useActionState, um den Zustand des Formulars zu verwalten.

Bitte vermeide die Nutzung weiterer Hooks

Vorschlag:

```ts
const [formState, formAction, isPending] = useActionState(addToCart, initialState);
```

initialState sollte vom Typ AddToCartResult sein.

Für addToCart wurde unten eine Funktion als Rohbau bereitgestellt, die fertig implementiert werden muss.

### addToCart

Die Funktion gibt ein AddToCartResult zurück:

Wenn die Id des Artikels 1 ist, dann sollte

- success auf true gesetzt werden,
- die Anzahl der Artikel im Warenkorb um die Anzahl der Artikel erhöht werden, die hinzugefügt werden sollen,
- eine Erfolgsmeldung zurückgegeben werden.

Sonst sollte

- sucess auf false gesetzt werden,
- die Anzahl der Artikel im Warenkorb unverändert bleiben
- eine Rückmeldung gegeben werden, dass der Artikel derzeit nicht vorrätig ist.

## Test

Zum testen füge die Komponente in der App.tsx ein
und starte die Anwendung mit

```bash
npm run dev
```

## Dokumentation

[useActionState](https://react.dev/reference/react/useActionState)
