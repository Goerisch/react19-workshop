# Aufgabe 3

## Ziel

Die Anfrage dauert lange und wir gehen davon aus, dass die Artikel fast immer vorrätig sind.
Daher soll das Update in der Oberfläche sofort wirksam werden und nur nach einem Fehler der "API" zurückgedreht werden.

Nutze hierfür den neuen useOptimistic-Hook:

```ts
const [optimisticState, setOptimisticState] = useOptimistic(currentState);
```

Der Optimistische Status muss an der richtigen Stelle gesetzt und entsprechend auch an der richtigen Stelle genutzt werden.

## Doku

(useOptimistic)
