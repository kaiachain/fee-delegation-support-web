import { ChainNetworkEnum } from 'types'
import useNetwork from './useNetwork'

export type UseExplorerReturn = {
  getExplorerLink: (props: {
    address: string
    type: 'tx' | 'account'
  }) => string
}

const useExplorer = (): UseExplorerReturn => {
  const { connectedNetwork } = useNetwork()
  const networkPath =
    connectedNetwork !== ChainNetworkEnum.CYPRESS ? `${connectedNetwork}.` : ''

  const getExplorerLink = ({
    address,
    type,
  }: {
    address: string
    type: 'tx' | 'account'
  }): string => `https://${networkPath}scope.klaytn.com/${type}/${address}`

  return { getExplorerLink }
}

export default useExplorer
