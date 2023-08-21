import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox amount={1000} from='PLN' to='USD' />);
    });

    it('should render proper info about conversion when PLN -> USD', () => {
        
        const testCasesPLNToUSD = [
            { amount: '100', expectedOutput: 'PLN 100.00 = $28.57' },
            { amount: '20.25', expectedOutput: 'PLN 20.25 = $5.79' },
            { amount: '200.50', expectedOutput: 'PLN 200.50 = $57.29' },
            { amount: '345', expectedOutput: 'PLN 345.00 = $98.57' },
        ];

        for(const testObj of testCasesPLNToUSD) {
            render(<ResultBox from='PLN' to='USD' amount={parseFloat(testObj.amount)} />);
            const convertedOutput = screen.getByTestId('converted-output');
            expect(convertedOutput).toHaveTextContent(testObj.expectedOutput);
            cleanup()
        }
    });

    it('should render proper info about conversion when USD -> PLN', () => {
        
        const testCasesUSDToPLN = [
            { amount: '100', expectedOutput: '$100.00 = PLN 350.00' },
            { amount: '20.25', expectedOutput: '$20.25 = PLN 70.88' },
            { amount: '200.50', expectedOutput: '$200.50 = PLN 701.75' },
            { amount: '345', expectedOutput: '$345.00 = PLN 1,207.50' },
        ];

        for(const testObj of testCasesUSDToPLN) {
            render(<ResultBox from='USD' to='PLN' amount={parseFloat(testObj.amount)} />);
            const convertedOutput = screen.getByTestId('converted-output');
            expect(convertedOutput).toHaveTextContent(testObj.expectedOutput);
            cleanup()
        }
    });

    it('should render proper info when the same value for "from" and "to" is set', () => {
        
        const testCasesOneCurrency = [
            { amount: '100', from: 'PLN', to: 'PLN', expectedOutput: 'PLN 100.00 = PLN 100.00'},
            { amount: '20.25', from: 'USD', to: 'USD', expectedOutput: '$20.25 = $20.25'},
            { amount: '200.50', from: 'PLN', to: 'PLN', expectedOutput: 'PLN 200.50 = PLN 200.50'},
            { amount: '345', from: 'USD', to: 'USD', expectedOutput: '$345.00 = $345.00'},
        ];

        for(const testObj of testCasesOneCurrency) {
            render(<ResultBox from={testObj.from} to={testObj.to} amount={parseFloat(testObj.amount)} />);
            const convertedOutput = screen.getByTestId('converted-output');
            expect(convertedOutput).toHaveTextContent(testObj.expectedOutput);
            cleanup()
        }
    });   
});