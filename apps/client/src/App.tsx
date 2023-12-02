import { AppRoutes } from '@client/pages/AppRoutes';
import { store } from '@client/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}

export default App;
