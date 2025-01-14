import {use} from 'react';
import {TestContext} from './testContext';

export const UseExample = () => {
    // use kann statt useContext und für Promises verwendet werden
    const context = use(TestContext);
    if (!context) {
        return null;
    }
    // use ist kein klassischer Hook,
    // und muss nicht auf dem top-level aufgerufen werden!
    const myPromise = use(promise);

    return (
        <div>
            <p>context: {context}</p>
            <p>promise: {myPromise}</p>
        </div>
    );
};

const promise = new Promise<string>((resolve) => {
    setTimeout(() => {
        resolve('resolved');
    }, 2000);
});
