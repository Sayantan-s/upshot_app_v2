import { ModalSystem } from '@client/context/ModalSystem';
import { Apollo } from '@client/integrations/apollo';
import { AppRoutes } from '@client/pages/AppRoutes';
import { store } from '@client/store';
import { Provider } from 'react-redux';

function App() {
  console.log(import.meta.env);
  return (
    <Provider store={store}>
      <Apollo>
        <ModalSystem>
          <AppRoutes />
        </ModalSystem>
      </Apollo>
    </Provider>
  );
}

export default App;
