import { createMemoryRouter } from 'react-router-dom'

import screens from './screens'
import App from './App'

const router = createMemoryRouter([
  {
    path: '/',
    Component: App,
    children: screens,
  },
])

export default router
