import { useAtom } from 'jotai'
import { useMemo } from 'react'

import { appStore } from 'stores'
import { LocalStorageKey, User, WalletEnum } from 'types'

import metamaskImg from '../../images/metamask.png'
import kaikasImg from '../../images/kaikas.png'

export type UseAuthReturn = {
  user: User | undefined
  login: (user: User) => void
  logout: () => void
  walletImage: string
}

const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useAtom(appStore.user)
  const login = (user: User): void => {
    setUser(user)
    localStorage.setItem(LocalStorageKey.LOGIN_WALLET, user.wallet)
  }
  const logout = (): void => {
    setUser(undefined)
    localStorage.removeItem(LocalStorageKey.LOGIN_WALLET)
  }

  const walletImage = useMemo(() => {
    switch (user?.wallet) {
      case WalletEnum.KAIKAS:
        return kaikasImg
      case WalletEnum.METAMASK:
        return metamaskImg
    }
    return ''
  }, [user?.wallet])

  return {
    user,
    login,
    logout,
    walletImage,
  }
}

export default useAuth
