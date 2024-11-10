import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Building2, Users, DollarSign, Globe, Calendar } from 'lucide-react';
import { getCompanyDetails, getCompanyNews, getCompanyFinancials } from '../lib/api';
import type { Company } from '../lib/api';

interface CompanyDetailsProps {
  symbol: string;
}

export function CompanyDetails({ symbol }: CompanyDetailsProps) {
  const { data: company } = useQuery<Company>({
    queryKey: ['company', symbol],
    queryFn: () => getCompanyDetails(symbol),
  });

  const { data: news } = useQuery({
    queryKey: ['company-news', symbol],
    queryFn: () => getCompanyNews(symbol),
  });

  const { data: financials } = useQuery({
    queryKey: ['company-financials', symbol],
    queryFn: () => getCompanyFinancials(symbol),
  });

  if (!company) return null;

  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={`https://logo.clearbit.com/${company.website.replace('https://', '')}`}
            alt={`${company.name} logo`}
            className="w-16 h-16 rounded-lg bg-white p-2"
          />
          <div>
            <h2 className="text-2xl font-bold">{company.name}</h2>
            <p className="text-white/60">{company.symbol}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <InfoCard
            icon={Building2}
            label="行业"
            value={company.industry}
          />
          <InfoCard
            icon={Users}
            label="员工数"
            value={company.employees.toLocaleString()}
          />
          <InfoCard
            icon={DollarSign}
            label="市值"
            value={formatCurrency(company.marketCap)}
          />
          <InfoCard
            icon={Calendar}
            label="成立年份"
            value={company.yearFounded.toString()}
          />
        </div>
      </div>

      {/* Additional sections for news, financials, etc. */}
    </div>
  );
}

interface InfoCardProps {
  icon: React.FC;
  label: string;
  value: string;
}

function InfoCard({ icon: Icon, label, value }: InfoCardProps) {
  return (
    <div className="bg-white/5 rounded-lg p-4">
      <Icon className="w-5 h-5 mb-2 text-white/60" />
      <div className="text-sm text-white/60">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}

function formatCurrency(value?: number): string {
  if (!value) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}