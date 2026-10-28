import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { NoticeProvider } from './components/NoticeProvider';
import './index.css';

// 사이트의 시작점: index.html의 <div id="root"> 안에 App을 그립니다.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <NoticeProvider>
        <App />
      </NoticeProvider>
    </BrowserRouter>
  </StrictMode>,
);
