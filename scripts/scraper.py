import asyncio
import aiohttp
import json
from bs4 import BeautifulSoup
from datetime import datetime
from typing import List, Dict, Any
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class CompanyScraper:
    def __init__(self):
        self.sources = {
            'sec': 'https://www.sec.gov/cgi-bin/browse-edgar',
            'yahoo': 'https://finance.yahoo.com',
            'bloomberg': 'https://www.bloomberg.com'
        }
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }

    async def fetch_page(self, session: aiohttp.ClientSession, url: str) -> str:
        try:
            async with session.get(url, headers=self.headers) as response:
                return await response.text()
        except Exception as e:
            logger.error(f"Error fetching {url}: {e}")
            return ""

    async def parse_sec_data(self, html: str) -> List[Dict[str, Any]]:
        soup = BeautifulSoup(html, 'html.parser')
        results = []
        
        for filing in soup.select('.filing'):
            try:
                results.append({
                    'source': 'SEC',
                    'type': filing.select_one('.filing-type').text.strip(),
                    'date': filing.select_one('.filing-date').text.strip(),
                    'description': filing.select_one('.filing-desc').text.strip(),
                    'link': filing.select_one('a')['href']
                })
            except Exception as e:
                logger.error(f"Error parsing SEC filing: {e}")
                
        return results

    async def parse_yahoo_data(self, html: str) -> List[Dict[str, Any]]:
        soup = BeautifulSoup(html, 'html.parser')
        results = []
        
        for article in soup.select('.article'):
            try:
                results.append({
                    'source': 'Yahoo Finance',
                    'title': article.select_one('.title').text.strip(),
                    'date': article.select_one('.date').text.strip(),
                    'summary': article.select_one('.summary').text.strip(),
                    'link': article.select_one('a')['href']
                })
            except Exception as e:
                logger.error(f"Error parsing Yahoo article: {e}")
                
        return results

    async def scrape_company(self, company_name: str) -> Dict[str, Any]:
        async with aiohttp.ClientSession() as session:
            tasks = []
            for source, base_url in self.sources.items():
                url = f"{base_url}/search?q={company_name}"
                tasks.append(self.fetch_page(session, url))
            
            pages = await asyncio.gather(*tasks)
            
            results = {
                'sec_filings': await self.parse_sec_data(pages[0]),
                'news': await self.parse_yahoo_data(pages[1]),
                'timestamp': datetime.now().isoformat()
            }
            
            return results

async def main():
    scraper = CompanyScraper()
    companies = ['Apple Inc', 'Microsoft Corporation', 'Amazon.com']
    
    for company in companies:
        logger.info(f"Scraping data for {company}")
        results = await scraper.scrape_company(company)
        
        # Save results to file
        filename = f"data/{company.lower().replace(' ', '_')}_{datetime.now().strftime('%Y%m%d')}.json"
        with open(filename, 'w') as f:
            json.dump(results, f, indent=2)
        
        logger.info(f"Data saved to {filename}")
        
        # Respect rate limits
        await asyncio.sleep(2)

if __name__ == "__main__":
    asyncio.run(main())