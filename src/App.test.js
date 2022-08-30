import {render, screen} from '@testing-library/react';
import App, {isAlgoCorrect, translateNumbersToAlgo} from './App';

test('renders learn react link', () => {
    render(<App/>);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});

test('if algo is correct', () => {
    const rt = isAlgoCorrect('RNNRNNRR')
    expect(rt).toBeTruthy();
})
test('if algo is incorrect', () => {
    const rt = isAlgoCorrect('RNNRNNRRR')
    expect(rt).toBeFalsy();
})

test('translate 1 2 1 2 2', () => {
    const rt = translateNumbersToAlgo('1 2 1 2 2')
    expect(rt).toBe('RNNRNNRR');
})

