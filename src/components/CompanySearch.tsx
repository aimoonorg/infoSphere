import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Loader2 } from 'lucide-react';
import { searchCompanies } from '../lib/api';

export function CompanySearch() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: companies, isLoading } = useQuery({
    queryKey: ['companies', searchTerm],
    queryFn: () => searchCompanies(searchTerm),
    enabled: searchTerm.length > 2,
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="搜索公司名称、股票代码或行业..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 backdrop-blur-md 
                   border border-white/20 text-white placeholder-white/60 focus:outline-none 
                   focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 
                           text-white/60 animate-spin" />
        )}
      </div>
      
      {companies && companies.length > 0 && (
        <div className="mt-4 bg-white/10 backdrop-blur-md rounded-lg border 
                      border-white/20 divide-y divide-white/10">
          {companies.map((company) => (
            <div key={company.symbol} className="p-4 hover:bg-white/5 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{company.name}</h3>
                  <p className="text-sm text-white/60">{company.symbol}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">{company.industry}</p>
                  <p className="text-sm text-white/60">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      notation: 'compact',
                    }).format(company.marketCap || 0)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}