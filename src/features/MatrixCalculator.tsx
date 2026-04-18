import { useState } from 'react';
import * as mathjs from 'mathjs';

export function MatrixCalculator() {
  const [matrixA, setMatrixA] = useState<string>('[[1, 2], [3, 4]]');
  const [matrixB, setMatrixB] = useState<string>('[[5, 6], [7, 8]]');
  const [result, setResult] = useState<string>('');

  const parseMatrix = (str: string) => {
    try {
      return mathjs.parse(str).evaluate();
    } catch {
      return null;
    }
  };

  const calculate = (op: 'add' | 'multiply' | 'detA' | 'invA') => {
    try {
      const A = parseMatrix(matrixA);
      const B = parseMatrix(matrixB);

      let res;
      switch (op) {
        case 'add':
          res = mathjs.add(A, B);
          break;
        case 'multiply':
          res = mathjs.multiply(A, B);
          break;
        case 'detA':
          res = mathjs.det(A);
          break;
        case 'invA':
          res = mathjs.inv(A);
          break;
      }
      setResult(mathjs.format(res, { precision: 4 }));
    } catch (err: any) {
      setResult('Error: ' + err.message);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Matrix Operations</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Matrix A (JSON format)</label>
          <textarea
            value={matrixA}
            onChange={(e) => setMatrixA(e.target.value)}
            className="w-full h-32 p-3 font-mono text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Matrix B (JSON format)</label>
          <textarea
            value={matrixB}
            onChange={(e) => setMatrixB(e.target.value)}
            className="w-full h-32 p-3 font-mono text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button onClick={() => calculate('add')} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow">A + B</button>
        <button onClick={() => calculate('multiply')} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow">A × B</button>
        <button onClick={() => calculate('detA')} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow">Det(A)</button>
        <button onClick={() => calculate('invA')} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow">Inv(A)</button>
      </div>

      <div className="mt-6 bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-inner min-h-[150px]">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Result</h3>
        <pre className="font-mono text-gray-900 dark:text-gray-100 whitespace-pre-wrap">{result}</pre>
      </div>
    </div>
  );
}