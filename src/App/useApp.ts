import { useEffect, useState } from 'react'

import { EIP1193Provider, LocalStorageKey, WalletEnum } from 'types'

import { useAuth, useLoading, useWallet } from 'hooks'
import { NETWORK } from 'consts'

const useApp = (): {
  initApp: boolean
} => {
  const [initApp, setInitApp] = useState(false)
  const { user } = useAuth()
  const { connectWallet, connectKaikas, connectMetamask } = useWallet()
  const { showLoading } = useLoading()
  const reLogin = async (): Promise<void> => {
    const storageLoginWallet = localStorage.getItem(
      LocalStorageKey.LOGIN_WALLET
    ) as WalletEnum

    if (storageLoginWallet) {
      if (storageLoginWallet === WalletEnum.KAIKAS) {
        connectKaikas()
      } else {
        connectMetamask()
      }
    }
  }

  const _setNoneKaikasWalletNetwork = async ({
    proxy,
  }: {
    proxy: EIP1193Provider
  }): Promise<void> => {
    const chainId = '0x' + NETWORK.klaytnChainId.CYPRESS.toString(16)

    await proxy.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId,
          chainName: 'Klaytn Mainnet Cypress',
          rpcUrls: ['https://public-en.kaikas.io/v1/cypress'],
          nativeCurrency: {
            name: 'KLAY',
            symbol: 'KLAY',
            decimals: 18,
          },
          blockExplorerUrls: ['https://www.klaytnfinder.io/'],
        },
      ],
    })

    proxy.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }],
    })
  }

  useEffect(() => {
    // https://docs.metamask.io/wallet/reference/provider-api/#accountschanged
    if (user) {
      user.proxy.on('accountsChanged', () => {
        connectWallet(user.proxy, user.wallet)
      })

      // for METAMASK
      user.proxy.on('chainChanged', () => {
        window.location.reload()
      })

      // for KAIKAS
      user.proxy.on('networkChanged', () => {
        window.location.reload()
      })

      const isKlaytnNetwork = [
        NETWORK.klaytnChainId.CYPRESS,
        NETWORK.klaytnChainId.BAOBAB,
        NETWORK.klaytnChainId.LOCAL,
      ].includes(user.chainId)

      if (user.wallet === WalletEnum.KAIKAS || isKlaytnNetwork) {
        return
      }

      if (false === isKlaytnNetwork) {
        showLoading({
          message: 'Please change the Wallet network to the KLAYTN network',
        })
      }

      _setNoneKaikasWalletNetwork({ proxy: user.proxy })
    }
  }, [user])

  useEffect(() => {
    // don't wait for relogin
    reLogin()

    setInitApp(true)
  }, [])

  return {
    initApp,
  }
}

export default useApp
