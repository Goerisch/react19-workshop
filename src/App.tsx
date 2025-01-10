import './App.css';
import {UseExampleContainer} from './react19/loesungen/use/useExampleContainer';

function App() {
    return (
        <div
            style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <UseExampleContainer />
        </div>
    );
}

export default App;
