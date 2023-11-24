import { appStore } from 'stores'
import { useSetAtom } from 'jotai'

export type UseConnectWalletReturn = {
  openConnectWallet: () => void
  closeConnectWallet: () => void
}

const useConnectWallet = (): UseConnectWalletReturn => {
  const setIsOpen = useSetAtom(appStore.isOpenConnectWallet)
  const openConnectWallet = (): void => {
    setIsOpen(true)
  }

  const closeConnectWallet = (): void => {
    setIsOpen(false)
  }
  return { openConnectWallet, closeConnectWallet }
}

export default useConnectWallet
