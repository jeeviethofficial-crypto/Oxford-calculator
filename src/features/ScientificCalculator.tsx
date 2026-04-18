import { useState } from 'react';
import * as mathjs from 'mathjs';

export function ScientificCalculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  const handleInput = (val: string) => {
    setExpression((prev) => prev + val);
  };

  const calculate = () => {
    try {
      const res = mathjs.evaluate(expression);
      setResult(res.toString());
      setHistory((prev) => [`${expression} = ${res}`, ...prev].slice(0, 10));
    } catch (e) {
      setResult('Error');
    }
  };

  const clear = () => {
    setExpression('');
    setResult('');
  };

  const buttons = [
    { label: '7', action: () => handleInput('7') },
    { label: '8', action: () => handleInput('8') },
    { label: '9', action: () => handleInput('9') },
    { label: '÷', action: () => handleInput('/') },
    { label: 'sin', action: () => handleInput('sin(') },
    
    { label: '4', action: () => handleInput('4') },
    { label: '5', action: () => handleInput('5') },
    { label: '6', action: () => handleInput('6') },
    { label: '×', action: () => handleInput('*') },
    { label: 'cos', action: () => handleInput('cos(') },
    
    { label: '1', action: () => handleInput('1') },
    { label: '2', action: () => handleInput('2') },
    { label: '3', action: () => handleInput('3') },
    { label: '-', action: () => handleInput('-') },
    { label: 'tan', action: () => handleInput('tan(') },
    
    { label: '0', action: () => handleInput('0') },
    { label: '.', action: () => handleInput('.') },
    { label: '=', action: calculate, main: true },
    { label: '+', action: () => handleInput('+') },
    { label: 'log', action: () => handleInput('log(') },
    
    { label: '(', action: () => handleInput('(') },
    { label: ')', action: () => handleInput(')') },
    { label: '^', action: () => handleInput('^') },
    { label: 'e', action: () => handleInput('e') },
    { label: 'π', action: () => handleInput('pi') },
    
    { label: 'AC', action: clear, danger: true },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Scientific Calculator</h2>
        <div className="bg-gray-100 dark:bg-gray-900 rounded-xl p-4 mb-4 shadow-inner text-right min-h-24">
          <div className="text-gray-500 dark:text-gray-400 text-lg mb-1 min-h-7 overflow-x-auto whitespace-nowrap">{expression}</div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white truncate">{result || '0'}</div>
        </div>
        
        <div className="grid grid-cols-5 gap-2">
          {buttons.map((btn, i) => (
            <button
              key={i}
              onClick={btn.action}
              className={`p-3 md:p-4 rounded-lg text-lg font-semibold transition active:scale-95 shadow-sm
                ${btn.main ? 'bg-blue-600 hover:bg-blue-700 text-white col-span-2' : 
                  btn.danger ? 'bg-red-500 hover:bg-red-600 text-white col-span-5 md:col-span-2 mt-2 md:mt-0' : 
                  'bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-600'}
              `}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="w-full md:w-64 bg-gray-50 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-4 rounded-r-xl">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">History</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {history.length === 0 ? (
            <p className="text-sm text-gray-400">No history yet</p>
          ) : (
            history.map((item, i) => (
              <div key={i} className="text-sm p-2 bg-white dark:bg-gray-700 rounded shadow-sm break-all font-mono text-gray-700 dark:text-gray-300">
                {item}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}