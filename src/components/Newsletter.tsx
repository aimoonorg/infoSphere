import React, { useState } from 'react';

export function Newsletter() {
  const [email, setEmail] = useState('');

  return (
    <section className="mb-16 bg-white/10 backdrop-blur-md rounded-lg p-8 text-center">
      <h3 className="text-2xl font-semibold mb-4">订阅我们的 Newsletter</h3>
      <p className="mb-4">获取最新的公司信息、行业趋势和独家报告</p>
      <div className="flex justify-center">
        <div className="relative w-full max-w-md">
          <input
            type="email"
            placeholder="您的邮箱地址"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 backdrop-blur-md 
                     border border-white/20 text-white placeholder-white/60 focus:outline-none 
                     focus:ring-2 focus:ring-blue-500"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        </div>
        <button className="ml-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-white/90 transition-colors">
          订阅
        </button>
      </div>
    </section>
  );
}