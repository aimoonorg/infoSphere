import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EnhancedLandingPage from './components/EnhancedLandingPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <EnhancedLandingPage />
    </QueryClientProvider>
  );
}

export default App;