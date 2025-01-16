import './App.css';
import {OverkillExample} from './react19/beispiele/allesZusammen/OverkillExample';
//import { Aufgabe1 } from './react19/aufgaben/useActionState/ActionForm';
//import { Aufgabe2 } from './react19/aufgaben/useFormStatus/FormStatus';
//import { Aufgabe3 } from './react19/aufgaben/useOptimistic/Form';

function App() {
    return (
        <div className='app'>
            <h1>Willkommen beim React19 Workshop!</h1>
            <OverkillExample />
            {/*
            <Aufgabe1 />
            <Aufgabe2 />
            <Aufgabe3 />
           */}
        </div>
    );
}

export default App;
