import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient} >
      <BrowserRouter>
         <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
              <App />
            </PersistGate>
         </Provider>
      </BrowserRouter>
    </QueryClientProvider>
)
