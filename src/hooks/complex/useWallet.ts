import { ethers } from 'ethers'

import { EIP1193Provider, WalletEnum } from 'types'
import useAuth from '../independent/useAuth'

const hasMetaMask = window.ethereum && window.ethereum.isMetaMask
const hasKaikas = window.klaytn && window.klaytn.isKaikas

const useWallet = (): {
  hasMetaMask: any
  hasKaikas: any
  connectWallet: (proxy: EIP1193Provider, wallet: WalletEnum) => Promise<void>
  connectMetamask: () => Promise<void>
  connectKaikas: () => Promise<void>
} => {
  const { login } = useAuth()

  const connectWallet = async (
    proxy: EIP1193Provider,
    wallet: WalletEnum,
  ): Promise<void> => {
    // https://docs.ethers.org/v5/getting-started/#getting-started--connecting
    await proxy.request({ method: 'eth_requestAccounts' })
    const provider = new ethers.providers.Web3Provider(proxy)
    const signer = provider.getSigner()
    const net = await provider.getNetwork()

    login({
      wallet,
      address: await signer.getAddress(),
      proxy,
      provider,
      chainId: net.chainId,
    })
  }
  const connectMetamask = async (): Promise<void> =>
    connectWallet(window.ethereum, WalletEnum.METAMASK)
  const connectKaikas = async (): Promise<void> =>
    connectWallet(window.klaytn, WalletEnum.KAIKAS)

  return {
    hasMetaMask,
    hasKaikas,
    connectWallet,
    connectMetamask,
    connectKaikas,
  }
}

export default useWallet
