import { ReactElement } from 'react'

import { useAuth } from 'hooks'

const wrappedAuth = (Children: () => ReactElement): (() => ReactElement) => {
  const Render = (): ReactElement => {
    const { user } = useAuth()

    return user ? <Children /> : <></>
  }

  return Render
}

export default wrappedAuth
