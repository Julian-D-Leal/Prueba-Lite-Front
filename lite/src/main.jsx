import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/App.jsx'
import store from "./store.js";
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
