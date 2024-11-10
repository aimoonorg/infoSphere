import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, ExternalLink } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getCompanyDetails } from '../lib/api';

interface CompanyProfile {
  name: string;
  symbol: string;
  description: string;
  marketCap: number;
  stockPrice: number;
  priceChange: number;
  weekRange: {
    low: number;
    high: number;
  };
  peRatio: number;
  news: Array<{
    title: string;
    date: string;
  }>;
}

export function NewsSection() {
  const [selectedCompany, setSelectedCompany] = useState('AAPL');
  
  const { data: companyData, isLoading } = useQuery({
    queryKey: ['company-profile', selectedCompany],
    queryFn: () => getCompanyDetails(selectedCompany),
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const mockCompanyProfiles: Record<string, CompanyProfile> = {
    AAPL: {
      name: 'Apple Inc.',
      symbol: 'AAPL',
      description: '苹果公司是一家总部位于美国加利福尼亚州的跨国科技公司，专门设计、开发和销售消费电子产品、计算机软件和在线服务。',
      marketCap: 2.64e12,
      stockPrice: 167.23,
      priceChange: 2.5,
      weekRange: { low: 124.17, high: 178.49 },
      peRatio: 27.84,
      news: [
        { title: '苹果发布新款MacBook Pro，搭载M2 Pro和M2 Max芯片', date: '2024-02-20' },
        { title: '苹果服务业务收入创下新高，达到208亿美元', date: '2024-02-19' },
        { title: '分析师预计iPhone 15系列将推动新一轮换机潮', date: '2024-02-18' }
      ]
    },
    MSFT: {
      name: 'Microsoft Corporation',
      symbol: 'MSFT',
      description: '微软是全球领先的软件和云服务提供商，专注于企业数字化转型和创新技术解决方案。',
      marketCap: 3.12e12,
      stockPrice: 402.15,
      priceChange: -1.2,
      weekRange: { low: 312.00, high: 420.82 },
      peRatio: 35.62,
      news: [
        { title: '微软AI助手Copilot订阅用户突破1000万', date: '2024-02-20' },
        { title: 'Azure云服务营收同比增长45%', date: '2024-02-19' },
        { title: '微软收购Activision Blizzard后游戏业务增长显著', date: '2024-02-18' }
      ]
    }
  };

  const [profiles, setProfiles] = useState(mockCompanyProfiles);

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setProfiles(prev => ({
        ...prev,
        AAPL: {
          ...prev.AAPL,
          stockPrice: prev.AAPL.stockPrice * (1 + (Math.random() * 0.02 - 0.01)),
          priceChange: (Math.random() * 4 - 2)
        },
        MSFT: {
          ...prev.MSFT,
          stockPrice: prev.MSFT.stockPrice * (1 + (Math.random() * 0.02 - 0.01)),
          priceChange: (Math.random() * 4 - 2)
        }
      }));
    }, 5000);

    return () => clearInterval(updateInterval);
  }, []);

  return (
    <section className="mb-16">
      <h3 className="text-2xl font-semibold mb-8 text-center">公司档案实时预览</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(profiles).map(([symbol, profile]) => (
          <div key={symbol} className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <img
                    src={`https://logo.clearbit.com/${profile.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}.com`}
                    alt={`${profile.name} logo`}
                    className="w-8 h-8 mr-2 rounded-lg bg-white p-1"
                  />
                  <div>
                    <h4 className="text-lg font-semibold">{profile.name}</h4>
                    <p className="text-sm text-white/60">{symbol}</p>
                  </div>
                </div>
                <a href="#" className="text-blue-300 hover:text-blue-100">
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>

              <p className="text-sm mb-4">{profile.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-white/60">市值</p>
                  <p className="font-semibold">
                    {new Intl.NumberFormat('zh-CN', {
                      style: 'currency',
                      currency: 'USD',
                      notation: 'compact',
                      maximumFractionDigits: 2
                    }).format(profile.marketCap)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-white/60">股价</p>
                  <div className="flex items-center">
                    <p className="font-semibold mr-2">
                      ${profile.stockPrice.toFixed(2)}
                    </p>
                    <div className={`flex items-center ${profile.priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {profile.priceChange >= 0 ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                      <span className="text-sm">
                        {Math.abs(profile.priceChange).toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-white/60">52周范围</p>
                  <p className="font-semibold">
                    ${profile.weekRange.low.toFixed(2)} - ${profile.weekRange.high.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-white/60">市盈率</p>
                  <p className="font-semibold">{profile.peRatio.toFixed(2)}</p>
                </div>
              </div>

              <div>
                <h5 className="font-semibold mb-2">最新动态</h5>
                <ul className="space-y-2">
                  {profile.news.map((item, index) => (
                    <li key={index} className="text-sm">
                      <span className="text-white/60 mr-2">{item.date}</span>
                      {item.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}