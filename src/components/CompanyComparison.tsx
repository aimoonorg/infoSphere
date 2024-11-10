import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const revenueData = [
  { year: 2018, Apple: 265.6, Microsoft: 110.4 },
  { year: 2019, Apple: 260.2, Microsoft: 125.8 },
  { year: 2020, Apple: 274.5, Microsoft: 143.0 },
  { year: 2021, Apple: 365.8, Microsoft: 168.1 },
  { year: 2022, Apple: 394.3, Microsoft: 198.3 },
];

export function CompanyComparison() {
  const [companyA, setCompanyA] = useState('Apple');
  const [companyB, setCompanyB] = useState('Microsoft');

  return (
    <section className="mb-16">
      <h3 className="text-2xl font-semibold mb-8 text-center">公司对比</h3>
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
        <div className="flex justify-between mb-4">
          <select
            value={companyA}
            onChange={(e) => setCompanyA(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-2"
          >
            <option value="Apple">Apple</option>
            <option value="Microsoft">Microsoft</option>
          </select>
          <select
            value={companyB}
            onChange={(e) => setCompanyB(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-2"
          >
            <option value="Microsoft">Microsoft</option>
            <option value="Apple">Apple</option>
          </select>
        </div>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={companyA} stroke="#8884d8" />
              <Line type="monotone" dataKey={companyB} stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}