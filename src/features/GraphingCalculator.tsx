import { useState, useMemo } from 'react';
import * as mathjs from 'mathjs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function GraphingCalculator() {
  const [expression, setExpression] = useState('x^2');
  const [range, setRange] = useState({ min: -10, max: 10, step: 0.5 });
  const [error, setError] = useState<string | null>(null);

  const data = useMemo(() => {
    try {
      const node = mathjs.parse(expression);
      const code = node.compile();
      const points = [];
      
      for (let x = range.min; x <= range.max; x += range.step) {
        let y = code.evaluate({ x });
        if (typeof y === 'number' && isFinite(y)) {
          points.push({ x: Number(x.toFixed(2)), y: Number(y.toFixed(2)) });
        }
      }
      setError(null);
      return points;
    } catch (err: any) {
      setError(err.message);
      return [];
    }
  }, [expression, range]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto h-[600px]">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Graphing Calculator</h2>
      
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Function f(x) =</label>
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="e.g. sin(x) * x"
          />
        </div>
        <div className="w-24">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Min X</label>
          <input
            type="number"
            value={range.min}
            onChange={(e) => setRange(prev => ({ ...prev, min: Number(e.target.value) }))}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div className="w-24">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Max X</label>
          <input
            type="number"
            value={range.max}
            onChange={(e) => setRange(prev => ({ ...prev, max: Number(e.target.value) }))}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {error ? (
        <div className="text-red-500 mb-4">Error: {error}</div>
      ) : null}

      <div className="flex-grow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-inner p-4 relative">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
            <XAxis dataKey="x" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              itemStyle={{ color: '#2563eb', fontWeight: 'bold' }}
            />
            <Line
              type="monotone"
              dataKey="y"
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}