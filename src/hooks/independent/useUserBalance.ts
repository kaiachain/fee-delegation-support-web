import Caver from 'caver-js'
import { useQuery } from '@tanstack/react-query'

import { QueryKeyEnum, dToken } from 'types'
import useAuth from 'hooks/independent/useAuth'

const useUserBalance = (): {
  klayBalance: dToken
} => {
  const { user } = useAuth()

  const { data: klayBalance = '0' as dToken } = useQuery(
    [QueryKeyEnum.KLAY_BALANCE, user?.address],
    async () => {
      if (user) {
        const caver = new Caver(user.proxy as any)
        const balance = await caver?.klay.getBalance(user.address)

        return balance as dToken
      }
    },
  )

  return {
    klayBalance,
  }
}

export default useUserBalance
