import './App.css';
import {Alert, Button, Snackbar, TextField, ToggleButton, ToggleButtonGroup} from '@mui/material';
import {useState} from 'react';

function isAlgoCorrect(algo) {
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
        incorrect = incorrect || result[j] === result[j + 1];
    }

    console.log(`%cAlgo : ${algo} ${incorrect ? 'KO' : 'OK'}`, `color: ${incorrect ? 'red' : 'green'}`)

    return !incorrect;
}

function translateNumbersToAlgo(numbers) {
    if (!numbers) {
        return '';
    }
    const splittedNumbers = numbers.split(' ');
    const chars = ['R', 'N'];

    let isFirstCharToPick = true;
    let rt = '';

    while (splittedNumbers.length > 0) {
        const count = splittedNumbers.shift();
        for (let i = 0; i < count; i++) {
            rt += chars[isFirstCharToPick ? 0 : 1]
        }
        isFirstCharToPick = !isFirstCharToPick;
    }

    return rt;
}

function App() {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState('');
    const [correct, setCorrect] = useState();
    const [type, setType] = useState('algo');

    return (
        <div className="App">
            <div className="form">
                <ToggleButtonGroup
                    value={type}
                    exclusive
                    onChange={(e, newValue) => setType(newValue)}
                    aria-label="text alignment"
                >
                    <ToggleButton value="algo" aria-label="left aligned">
                        Algorithme
                    </ToggleButton>
                    <ToggleButton value="numero" aria-label="left aligned">
                        Numéros
                    </ToggleButton>
                </ToggleButtonGroup>

                <TextField label={type === 'algo' ? 'Algorithme' : 'Numéros'}
                           variant="outlined"
                           value={data}
                           onChange={e => {
                               setData(e.target.value)
                           }}/>
            </div>

            <div className="form">
                <Button variant="contained"
                        onClick={_ => {
                            let info = '';
                            if (type === 'algo') {
                                info = data;
                            } else {
                                info = translateNumbersToAlgo(data);
                            }
                            setCorrect(isAlgoCorrect(info))
                            setOpen(true);
                        }}
                        disabled={!data}>Vérifier</Button>

                <Button variant="text" onClick={_ => {
                    setCorrect(undefined);
                    setData('');
                    setType('algo')
                }}>Réinitialiser</Button>
            </div>

            <Snackbar
                open={open}
                autoHideDuration={6000}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                onClose={_ => setOpen(false)}
            >
                <Alert
                    severity={correct ? 'success' : 'error'}>{correct ? 'Bravo 💪' : 'Ça ne correspond pas 😩'}</Alert>
            </Snackbar>
        </div>
    );
}

export default App;
export {isAlgoCorrect, translateNumbersToAlgo};
