import axios from 'axios';
import { z } from 'zod';

const API_BASE_URL = '/api';

export const CompanySchema = z.object({
  name: z.string(),
  symbol: z.string().optional(),
  description: z.string(),
  industry: z.string(),
  employees: z.number(),
  revenue: z.number(),
  marketCap: z.number().optional(),
  stockPrice: z.number().optional(),
  yearFounded: z.number(),
  headquarters: z.string(),
  ceo: z.string(),
  website: z.string().url(),
});

export type Company = z.infer<typeof CompanySchema>;

export const searchCompanies = async (query: string): Promise<Company[]> => {
  const { data } = await axios.get(`${API_BASE_URL}/companies/search`, {
    params: { q: query },
  });
  return z.array(CompanySchema).parse(data);
};

export const getCompanyDetails = async (symbol: string): Promise<Company> => {
  const { data } = await axios.get(`${API_BASE_URL}/companies/${symbol}`);
  return CompanySchema.parse(data);
};

export const getCompanyNews = async (symbol: string) => {
  const { data } = await axios.get(`${API_BASE_URL}/companies/${symbol}/news`);
  return data;
};

export const getCompanyFinancials = async (symbol: string) => {
  const { data } = await axios.get(`${API_BASE_URL}/companies/${symbol}/financials`);
  return data;
};