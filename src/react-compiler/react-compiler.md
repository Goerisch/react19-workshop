# React-Compiler

## Welche Vorteile bietet der neue Compiler?

Der neue Compiler bringt insbesondere Verbesserungen zur Performance der Anwendung.

Er erkennt "teure" funktionsaufrufe in Components und Hooks, die von caching profitieren würden.

Außerdem werden verstärkt unnötige rerenderings in Hooks und Components vermieden.

Damit werden manuelle Optimierungen mit (memo(), useMemo() und useCallback()) obsolet.

ABER:
Der neue Compiler ist anders als React 19 aktuell noch im Beta-Status!

## Beispiele

```ts
// **KEIN** caching vom React Compiler, das es keine React-Component / Hook ist
function expensivelyProcessAReallyLargeArrayOfObjects() { /* ... */ }

// React-Component -> Caching vom React Compiler
const TableContainer = ({ items }) => {
  // Der Aufruf der Funktion würde gecached werden:
  const data = expensivelyProcessAReallyLargeArrayOfObjects(items);
  // ...
}
```

In diesem Beispiel würde die MessageButton-Component jedesmal neu gerendert werden, wenn sich das frieds-Array ändert.

```ts
function FriendList({ friends }) {
  const onlineCount = useFriendOnlineCount();
  if (friends.length === 0) {
    return <NoFriends />;
  }
  return (
    <div>
      <span>{onlineCount} online</span>
      {friends.map((friend) => (
        <FriendListCard key={friend.id} friend={friend} />
      ))}
      <MessageButton />
    </div>
  );
}
```

## Welche Voraussetzungen hat der React-Compiler?

Der Compiler erfordert mindestens React 17, empfohlen wird aber React 19.

Der Compiler stellt Anforderungen an den Code:
Außerdem müssen die [Rules of React](https://react.dev/reference/rules) eingehalten werden.

## Wie installiere ich den React-Compiler?

Damit der neue React-Compiler genutzt werden kann, benötigen wir die folgenden Dev-Dependencies:

```bash
npm install -D babel-plugin-react-compiler eslint-plugin-react-compiler
```

### Eslint-Plugin

Kann auch bereits genutzt werden, ohne dass geplant ist, den Compiler zu installieren, damit die Kompatibilität gewährleistet wird/bleibt!

Die eslint.config.js muss angepasst werden, damit das plugin aktiv wird:

```js
// eslint.config.js
import reactCompiler from 'eslint-plugin-react-compiler'

export default [
  {
    plugins: {
      'react-compiler': reactCompiler,
    },
    rules: {
      'react-compiler/react-compiler': 'error',
    },
  },
]
```

hiermit wird die Einhaltung der [Rules of React](https://react.dev/reference/rules) erzwungen.

### Compiler aktivieren

Um den Compiler zu aktivieren, müssen wir unsere vite.config.ts anpassen:

```ts
// vite.config.js
const ReactCompilerConfig = { /* Wenn React 17 oder 18 verwendet wird, muss die Version als target konfiguriert werden, bei React 19, kann die Config hingegen leer bleiben: */
    target: 19
 };

export default defineConfig(() => {
  return {
    plugins: [
      react({
        babel: {
          plugins: [
            ["babel-plugin-react-compiler", ReactCompilerConfig],
          ],
        },
      }),
    ],
    build: {
        rollupOptions: {
        external: ['react-compiler-runtime']
        }
    }
    // ...
  };
});
```

### Wie kann ich erkennen, dass der Compiler eine Component optimiert hat?

Wenn der Compiler eine Component optimiert hat, kann man über die [React Dev Tools](https://react.dev/learn/react-developer-tools) ab Version 5 über ein "Memo ✨" Badge erkennen, dass an der Stelle optmiert wurde.

## Dokumentation zum Compiler

Hier gibt es weitere [Details/Dokumentation zum Compiler](https://react.dev/learn/react-compiler) und einen [Playground zum Testen](https://playground.react.dev/#N4Igzg9grgTgxgUxALhAgHgBwjALgAgBMEAzAQygBsCSoA7OXASwjvwFkBPAQU0wAoAlPmAAdNvhgJcsNgB5CTAG4A+ABIJKlCPgDqOSoTkB6RaoDc4gL7iQVoA).
