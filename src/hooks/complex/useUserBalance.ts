import { useQuery } from '@tanstack/react-query'

import { useAuth } from 'hooks'
import { QueryKeyEnum, dToken } from 'types'
import { UTIL } from 'consts'

export type UseUserBalanceReturn = {
  klayBalance: dToken
}

const useUserBalance = (): UseUserBalanceReturn => {
  const { user } = useAuth()

  const { data: klayBalance = '0' as dToken } = useQuery(
    [QueryKeyEnum.KLAY_BALANCE, user?.address],
    async () => {
      if (user) {
        const bal = await user?.signer.getBalance()
        return UTIL.toBn(bal._hex).toString(10) as dToken
      }
    },
    {
      enabled: !!user?.address,
    },
  )

  return {
    klayBalance,
  }
}

export default useUserBalance
