import ReactDOM from 'react-dom/client';

import { App } from '@/app/components/App';
import 'react-loading-skeleton/dist/skeleton.css';
import 'pm-ui/style.css';
import 'pm-ui/theme-light.css';
import 'pm-ui/theme-dark.css';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') ?? document.body,
);

root.render(<App />);
