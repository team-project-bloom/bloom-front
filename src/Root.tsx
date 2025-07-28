import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { Layout } from './components/Layout';
import { HomePage } from './modules/HomePage';
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
              </Route>
            </Routes>
          </Layout>
        </div>
      </WinesProvider>
    </Router>
  );
};
