import {render, screen} from '@testing-library/react';
import App, {isAlgoCorrect, translateNumbersToAlgo, findAlgo, manipule} from './App';

/*test('renders learn react link', () => {
    render(<App/>);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});*/

test('if algo is correct', () => {
    const rt = isAlgoCorrect('RNNRNNRR');
    expect(rt).toBeTruthy();
});

test('if algo is incorrect', () => {
    const rt = isAlgoCorrect('RNNRNNRRR');
    expect(rt).toBeFalsy();
});

test('translate 1 2 1 2 2', () => {
    const rt = translateNumbersToAlgo('1 2 1 2 2')
    expect(rt).toBe('RNNRNNRR');
});

test('manipule 12345678', () => {
    const rt = manipule('12345678');
    expect(rt).toBe('24683751');
});

test('find algo for 8', () => {
    const rt = findAlgo(8);
    expect(rt).toBe('RNRNRNRN');
});
