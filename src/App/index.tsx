import { ReactElement, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import AppProvider from './AppProvider'
import useApp from './useApp'

const InitializeApp = (): ReactElement => {
  const [initComplete, setInitComplete] = useState(false)
  const { initApp } = useApp()

  useEffect(() => {
    if (initApp) {
      setInitComplete(true)
    }
  }, [initApp])

  return <>{initComplete && <Outlet />}</>
}

function App(): ReactElement {
  return (
    <AppProvider>
      <InitializeApp />
    </AppProvider>
  )
}

export default App
