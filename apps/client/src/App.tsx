import { AppRoutes } from '@client/pages/AppRoutes';
import { store } from '@client/store';
import { Provider } from 'react-redux';
import { Apollo } from './integrations/apollo';

function App() {
  return (
    <Provider store={store}>
      <Apollo>
        <AppRoutes />
      </Apollo>
    </Provider>
  );
}

export default App;
