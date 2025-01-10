# Änderungen in React19

[Übersicht der Änderungen](https://react.dev/blog/2024/12/05/react-19)

Neue Hooks:

## useActionState

```ts
const [state, myAction, isPending] = useActionState(handleSubmit, initialState);
```

Nützlich um den Status der Form, den pending-Status und Fehlerhandling zu vereinfachen.

Statt "onSubmit" wird in der form die property "action" oder am button "formAction" genutzt.

Die Daten der Form werden als FormData übergeben.

Wichtig: Es muss an jedem verwendeten input / select / checkbox etc. die Property "name" gesetzt werden. Über diese wird gemappt!

```ts
return(
<form action={myAction}>
<input name='kurzerEinzigartigerName' type="text" />
<button formAction={myAction} type='submit'>submit</button>
</form>)
```

Als Parameter nimmt useActionForm zwei Parameter:

- Eine Funktion welche selbst zugriff auf den prevState und formData hat und die Logik enthält, was nach dem submit passiert.
- Den initialen Status (kann auch null oder ein leeres Objekt sein).

## useFormStatus

Ergänzend zu useActionState, gibt es einen weiteren Hook, der useActionState ergänzt.

Wichtig: useFormStatus kann der NUR in Components genutzt werden kann, die in einer Form eingebettet sind.

```ts
// funktioniert nicht innerhalb von CustomButtonComponent:
<>
<form>
  <input/>
</form>
<CustomButtonComponent>
</>

//so funktioniert es:
<form>
  <input/>
  <customButtonComponent>
</form>
```

Ermöglicht einfachen Zugriff auf den pending-Status und auf den FormState, allerdings nur während einer laufenden FormAction.
Außerdem kann man ggf. die Methode (default='GET' oder 'POST') und die action-funktion selbst einsehen.

## useOptimistic

Damit Änderungen sofort sichtbar werden, gibt es einen neuen Hook.

```ts
const [optimisticValue, setOptimisticValue] = useOptimistic(currentValue);
```

## use

Neuer "Hook", der sowohl den Zugriff auf einen Context aber auch auf Promises ermöglicht.

Solange bis die Promise resolved bzw. der Context geladen wird, kann ein Fallback per Suspense-Element gerendert werden.

Wichtig: Folgt nicht den stengen Regeln, eines Hooks, kann also auch z.B. innerhalb einer if-Bedingung oder danach genutzt werden.

## Weitere Änderungen (honorable mentions)

- verbessertes Handling von Refs:
  - forwardRef ist nun obsolet
  - refs können nun einfach wie props übergeben werden.
  - refs haben eine cleanup-Funktion erhalten
- useDeferredValue um initialen Status erweitert
- Server Components
- Server Actions
- Support für Meta-Daten in React
- Support für preloading von Ressourcen
