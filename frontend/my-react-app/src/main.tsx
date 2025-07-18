import { createRoot } from 'react-dom/client'
import '/src/assets/styles/base.css'
import '/src/assets/fonts/MontserratAlternates/stylesheet.css'
import App from './app/App'

createRoot(document.getElementById('root')!).render(
    <App />
)
