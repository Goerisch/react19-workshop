import {Suspense, useState} from 'react';
import {UseExample} from './use';
import {TestContext} from './testContext';

export const UseExampleContainer = () => {
    const [context, setContext] = useState<string>('der test');

    return (
        // Für den Context-Provider muss nicht mehr Context.Provider verwendet werden
        <TestContext value={context}>
            <button
                onClick={() => {
                    if (context === 'der test') {
                        setContext('war erfolgreich!');
                    } else {
                        setContext('der test');
                    }
                }}
            >
                Click me
            </button>
            {
                // Suspense wird verwendet, um den Ladezustand des Promise/Context abzufangen
            }
            <Suspense fallback={<p>Promise wird geladen...</p>}>
                <UseExample />
            </Suspense>
        </TestContext>
    );
};
