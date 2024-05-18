import { ModalSystem } from '@client/context/ModalSystem';
import { ToastSystem } from '@client/context/ToastSystem';
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
          <ToastSystem>
            <AppRoutes />
          </ToastSystem>
        </ModalSystem>
      </Apollo>
    </Provider>
  );
}

export default App;
