import { Provider } from 'react-redux';
import { render } from 'react-dom';
import './scss/app.scss';
import App from '@src/App';
import { store } from '@src/store';


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
