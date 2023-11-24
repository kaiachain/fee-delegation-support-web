import { useMemo } from 'react'

import useAuth from '../independent/useAuth'
import { ChainNetworkEnum } from 'types'
import { NETWORK } from 'consts'

const useNetwork = (): {
  connectedNetwork?: ChainNetworkEnum
} => {
  const { user } = useAuth()
  const connectedNetwork = useMemo(() => {
    switch (user?.chainId) {
      case NETWORK.klaytnChainId[ChainNetworkEnum.BAOBAB]:
        return ChainNetworkEnum.BAOBAB
      case NETWORK.klaytnChainId[ChainNetworkEnum.LOCAL]:
        return ChainNetworkEnum.LOCAL
      default:
        return ChainNetworkEnum.CYPRESS
    }
  }, [user?.chainId])

  return {
    connectedNetwork,
  }
}

export default useNetwork
