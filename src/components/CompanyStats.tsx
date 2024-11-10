import React from 'react';
import { Users, DollarSign, TrendingUp } from 'lucide-react';

interface CompanyStatsProps {
  companies: Array<{
    name: string;
    industry: string;
    employees: string;
    revenue: string;
    growth: string;
  }>;
}

export function CompanyStats({ companies }: CompanyStatsProps) {
  return (
    <section className="mb-16">
      <h3 className="text-2xl font-semibold mb-4 text-center">特色公司</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {companies.map((company) => (
          <div key={company.name} className="bg-white/10 backdrop-blur-md rounded-lg p-4">
            <div className="flex items-center mb-2">
              <img
                src={`https://logo.clearbit.com/${company.name.toLowerCase()}.com`}
                alt={`${company.name} logo`}
                className="w-12 h-12 rounded-full bg-white p-1 mr-3"
              />
              <div>
                <h4 className="font-semibold text-lg">{company.name}</h4>
                <p className="text-sm text-white/80">{company.industry}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                <span className="text-sm">{company.employees}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                <span className="text-sm">{company.revenue}</span>
              </div>
              <div className="flex items-center col-span-2">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm">年增长: {company.growth}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}