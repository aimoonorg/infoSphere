import { useState, useEffect } from 'react';
import { CompanySearch } from './CompanySearch';
import { CompanyStats } from './CompanyStats';
import { NewsSection } from './NewsSection';
import { CompanyComparison } from './CompanyComparison';
import { Newsletter } from './Newsletter';
import { 
  Search, 
  Database, 
  Shield, 
  Zap, 
  TrendingUp
} from 'lucide-react';

const featuredCompanies = [
  { name: 'Apple', industry: '科技', employees: '147,000+', revenue: '$3940亿', growth: '+8%' },
  { name: 'Microsoft', industry: '软件', employees: '181,000+', revenue: '$1980亿', growth: '+18%' },
  { name: 'Amazon', industry: '电商', employees: '1,608,000+', revenue: '$4698亿', growth: '+22%' },
  { name: 'Google', industry: '互联网', employees: '156,500+', revenue: '$2575亿', growth: '+13%' },
];

const companyInsightFeatures = [
  { 
    icon: Database, 
    title: "全面的数据覆盖", 
    description: "我们的数据库涵盖超过100万家美国公司，包括上市公司和私有企业。",
    stats: "100万+ 公司 | 1000+ 数据点/公司"
  },
  { 
    icon: Zap, 
    title: "实时数据更新", 
    description: "通过先进的数据采集和处理技术，我们确保信息的及时性和准确性。",
    stats: "每日更新 | 99.9% 数据准确率"
  },
  { 
    icon: Shield, 
    title: "安全可靠的信息源", 
    description: "我们严格遵守数据保护法规，采用银行级别的加密技术保护用户数据。",
    stats: "符合GDPR标准 | SOC 2 Type II认证"
  },
  { 
    icon: TrendingUp, 
    title: "深度分析与预测", 
    description: "借助AI和机器学习技术，我们提供趋势分析和未来预测。",
    stats: "95% 预测准确率 | 50+ 行业报告/月"
  }
];

export default function EnhancedLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 text-white">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
      <div className="relative">
        <header className="container mx-auto px-4 py-8">
          <nav className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">CompanyInsight</h1>
            <div className="space-x-4">
              <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                登录
              </button>
              <button className="px-4 py-2 rounded-lg bg-white text-blue-600 hover:bg-white/90 transition-colors">
                注册
              </button>
            </div>
          </nav>
        </header>

        <main className="container mx-auto px-4">
          <section className="text-center mb-16">
            <h2 className="text-6xl font-bold mb-4 drop-shadow-lg">探索美国公司的全面信息</h2>
            <p className="text-xl mb-8 drop-shadow">获取超过100万家美国公司的详细数据、财务信息和行业洞察</p>
            <CompanySearch />
          </section>

          <CompanyStats companies={featuredCompanies} />
          
          <section className="mb-16">
            <h3 className="text-2xl font-semibold mb-8 text-center">为什么选择 CompanyInsight？</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {companyInsightFeatures.map((feature, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <feature.icon className="w-8 h-8 mr-3" />
                    <h4 className="text-xl font-semibold">{feature.title}</h4>
                  </div>
                  <p className="text-white/80 mb-4">{feature.description}</p>
                  <div className="bg-white/20 rounded p-2 text-sm">
                    {feature.stats}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <CompanyComparison />
          <NewsSection />
          <Newsletter />
        </main>

        <footer className="bg-white/10 backdrop-blur-md py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 CompanyInsight. 保留所有权利。</p>
            <div className="mt-4">
              <a href="#" className="mx-2 hover:underline">关于我们</a>
              <a href="#" className="mx-2 hover:underline">使用条款</a>
              <a href="#" className="mx-2 hover:underline">隐私政策</a>
              <a href="#" className="mx-2 hover:underline">联系我们</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}