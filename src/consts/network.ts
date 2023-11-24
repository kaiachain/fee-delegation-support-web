import { utils } from 'ethers'

import { AddEthereumChainParameter, ChainNetworkEnum } from 'types'

const klaytnChainId: Record<ChainNetworkEnum, number> = {
  [ChainNetworkEnum.CYPRESS]: 8217,
  [ChainNetworkEnum.BAOBAB]: 1001,
  [ChainNetworkEnum.LOCAL]: 31337,
}

const klaytnChainParam: Record<ChainNetworkEnum, AddEthereumChainParameter> = {
  [ChainNetworkEnum.CYPRESS]: {
    chainId: utils.hexValue(klaytnChainId[ChainNetworkEnum.CYPRESS]),
    chainName: 'Klaytn Cypress',
    rpcUrls: ['https://public-en-cypress.klaytn.net'],
    nativeCurrency: { name: 'Klaytn Token', decimals: 18, symbol: 'KLAY' },
    blockExplorerUrls: ['https://scope.klaytn.com'],
  },
  [ChainNetworkEnum.BAOBAB]: {
    chainId: utils.hexValue(klaytnChainId[ChainNetworkEnum.BAOBAB]),
    chainName: 'Klaytn Baobab',
    rpcUrls: ['https://api.baobab.klaytn.net:8651'],
    nativeCurrency: { name: 'Klaytn Token', decimals: 18, symbol: 'KLAY' },
    blockExplorerUrls: ['https://baobab.scope.klaytn.com/'],
  },
  [ChainNetworkEnum.LOCAL]: {
    chainId: utils.hexValue(klaytnChainId[ChainNetworkEnum.LOCAL]),
    chainName: 'Klaytn Local',
    rpcUrls: ['http://localhost:8545'],
    nativeCurrency: { name: 'Klaytn Token', decimals: 18, symbol: 'KLAY' },
    blockExplorerUrls: [''],
  },
}

export default {
  klaytnChainId,
  klaytnChainParam,
}
