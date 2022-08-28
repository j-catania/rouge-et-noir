import './App.css';
import {Button, TextField} from '@mui/material';
import {useState} from 'react';

function isAlgoWorking(algo) {
    const splited = algo.split('');
    let result = '';
    let i = 0
    let incorrect = false;

    while (splited.length > 0) {
        if (i % 2 === 1) {
            result += splited.shift();
        } else {
            splited.push(splited.shift())
        }
        i++;
    }

    for (let j = 0; j < result.length; j += 2) {
        incorrect = incorrect || result[j] === result[j+1];
    }

    console.log(`%cAlgo : ${algo} ${incorrect ? 'KO' : 'OK'}`, `color: ${incorrect ? 'red' : 'green'}`)

    return !incorrect;
}

function App() {
    const [algo, setAlgo] = useState('RNNRNNRR');
    const [correct, setCorrect] = useState();

    return (
        <div className="App">
            <TextField id="outlined-basic" label="Algorithme" variant="outlined"
                       onChange={e => setAlgo(e.target.value)} defaultValue="RNNRNNRR"/>
            <Button variant="contained" onClick={_ => setCorrect(isAlgoWorking(algo))}>Tester !</Button>
            {correct !== undefined ? (correct === true ? '💪' : '😩') : ''}
        </div>
    );
}

export default App;
