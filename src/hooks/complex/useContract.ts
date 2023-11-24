import { ContractTransaction, ethers } from 'ethers'

import useAuth from '../independent/useAuth'
import { ContractAddr, dToken } from 'types'
import { NETWORK } from 'consts'

export type UseContractReturn = {
  contract?: ethers.Contract
  getContractFunc: (props: {
    funcName: string
    params: any[]
    txOptions?: {
      gasLimit?: number
      value?: dToken
    }
  }) => Promise<ContractTransaction | undefined>
  getContractView: <T>(props: {
    funcName: string
    params: any[]
  }) => Promise<T | undefined>
}

const useContract = ({
  contractAddress,
  abi,
}: {
  contractAddress: ContractAddr
  abi: any
}): UseContractReturn => {
  const { user } = useAuth()

  const contract = new ethers.Contract(
    contractAddress,
    abi,
    user?.provider ||
      new ethers.providers.JsonRpcProvider(
        NETWORK.klaytnChainParam['CYPRESS'].rpcUrls[0],
      ),
  )

  const getContractFunc = async ({
    funcName,
    params,
    txOptions,
  }: {
    funcName: string
    params: any[]
    txOptions?: {
      gasLimit?: number
      value?: dToken
    }
  }): Promise<ContractTransaction | undefined> => {
    if (contract?.address && user) {
      return contract
        .connect(user.signer)
        [funcName](...params, { gasLimit: 1000000, ...txOptions })
    }
  }

  const getContractView = async <T>({
    funcName,
    params,
  }: {
    funcName: string
    params: any[]
  }): Promise<T | undefined> => {
    if (contract?.address) {
      return contract[funcName](...params)
    }
  }
  return { contract, getContractFunc, getContractView }
}

export default useContract
