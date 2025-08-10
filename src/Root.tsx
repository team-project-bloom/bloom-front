import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { Layout } from './components/Layout';
import { AccountPage } from './modules/AccountPage';
import { CartPage } from './modules/CartPage';
import { HomePage } from './modules/HomePage';
import { WinePage } from './modules/WinePage';
import { WinesPage } from './modules/WinesPage';
import { WinesProvider } from './store/WinesContext';

export const Root = () => {
  return (
    <Router>
      <WinesProvider>
          <div className="page">
            <Layout>
              <Routes>
                <Route path="/" element={<App />}>
                  <Route index element={<HomePage />} />
                  <Route path="home" element={<Navigate to="/" />} />
                  <Route path="wines" element={<WinesPage />} />
                  <Route path="account" element={<AccountPage />} />
                  <Route path="/wine/:wineId" element={<WinePage />} />
                </Route>

                <Route path="cart" element={<CartPage />} />
              </Routes>
            </Layout>
          </div>

      </WinesProvider>
    </Router>
  );
};
