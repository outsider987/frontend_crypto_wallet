import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { store } from './store';
import ModalsWrapper from './layouts/ModalsWrapper';
import { MYRoutes } from './routes';
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <QueryClientProvider client={queryClient}>
          <ModalsWrapper>
            <MYRoutes />
          </ModalsWrapper>
        </QueryClientProvider>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
