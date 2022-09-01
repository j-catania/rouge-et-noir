import './App.css';
import {Alert, Button, Snackbar, TextField, ToggleButton, ToggleButtonGroup} from '@mui/material';
import {useState} from 'react';

const manipule = (array) => {
    let result = [];
    let i = 0;

    while (array.length > 0) {
        if (i % 2 === 1) {
            result.push(array.shift());
        } else {
            array.push(array.shift())
        }
        i++;
    }

    return result;
}

const isAlgoCorrect = (algo) => {
    const splited = algo.split('');
    let incorrect = false;

    const result = manipule(splited);

    for (let j = 0; j < result.length; j += 2) {
        incorrect = incorrect || result[j] === result[j + 1];
    }

    //console.log(`%cAlgo : ${algo} result[${result.join('')}]${incorrect ? 'KO' : 'OK'}`, `color: ${incorrect ? 'red' : 'green'}`)

    return !incorrect;
}

const translateNumbersToAlgo = (numbers) => {
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

const findAlgo = (count) => {
    const ordered = [];
    let rt = [];

    for (let i = 0; i < count; i++) {
        ordered.push(i + '');
    }
//console.log('ordered',ordered);

    const manipuled = manipule(ordered);
    let actualLetter = 'N';
//console.log('manipuled',manipuled);
    for (let i = 0; i < count; i++) {
        rt.push({letter: manipuled[i], color: actualLetter});
        actualLetter = actualLetter === 'N' ? 'R' : 'N';
    }

    for (let i = 0; i < count; i++) {
        ordered[i] = rt.find(item => item.letter === (i + '')).color;
    }
//console.log('ordered',ordered)

    return ordered;
}

function App() {
    const [notif, setNotif] = useState('');
    const [data, setData] = useState('');
    const [correct, setCorrect] = useState(true);
    const [type, setType] = useState('algo');
    const [showSolver, setShowSolver] = useState(false);

    return (
        <div className="App">
            <h1>Le <span id="rouge">rouge</span> et <span id="noir">noir</span></h1>
            <h5>Face caché, placez la première carte sous la pile, sortez la seconde et ainsi de suite. Les
                cartes sorties doivent alterner de couleur.</h5>
            <small>C'est tout !</small>
            <div className="form" hidden={showSolver}>
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
                           placeholder={type === 'algo' ? 'NNRRNNRR' : '2 2 1 1'}
                           onChange={e => {
                               setData(e.target.value)
                           }}/>
            </div>
            <div className="form" hidden={!showSolver}>
                <TextField label="Nombre de cartes"
                           value={data}
                           placeholder='8'
                           onChange={e => {
                               setData(e.target.value)
                           }}/>
            </div>

            <div className="actions" hidden={!showSolver}>
                <Button variant="contained"
                        onClick={_ => {
                            setNotif(findAlgo(data));
                        }}
                        disabled={!data}>Trouve !</Button>
            </div>
            <div className="actions" hidden={showSolver}>
                <Button variant="contained"
                        onClick={_ => {
                            let info = '';
                            if (type === 'algo') {
                                info = data;
                            } else {
                                info = translateNumbersToAlgo(data);
                            }
                            setCorrect(isAlgoCorrect(info))
                            setNotif(correct ? 'Bravo 💪' : 'Ça ne correspond pas 😩');
                        }}
                        disabled={!data}>Vérifier</Button>

                <Button variant="text" onClick={_ => {
                    setCorrect(undefined);
                    setData('');
                    setType('algo')
                }}>Réinitialiser</Button>
            </div>

            <Snackbar
                open={!!notif}
                autoHideDuration={6000}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                onClose={_ => setNotif('')}
            >
                <Alert severity={correct ? 'success' : 'error'}>{notif}</Alert>
            </Snackbar>
            <div id="show-slover" onClick={_ => {
                setShowSolver(!showSolver);
                setData('');
            }}></div>
        </div>
    );
}

export default App;
export {isAlgoCorrect, translateNumbersToAlgo, findAlgo, manipule};
