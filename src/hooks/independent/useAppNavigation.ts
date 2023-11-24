import _ from 'lodash'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { RoutesParamList } from 'types'

type PushProps<RouteName extends keyof RoutesParamList> =
  undefined extends RoutesParamList[RouteName]
    ? [RouteName]
    : [RouteName, RoutesParamList[RouteName]]

const useNavigation = <RouteName extends keyof RoutesParamList>(): {
  navigate: <RouteName extends keyof RoutesParamList>(
    ...args: PushProps<RouteName>
  ) => void
  goBack: () => void
  params: RoutesParamList[RouteName]
} => {
  const _navigate = useNavigate()

  const goBack = (): void => _navigate(-1)
  const navigate = <RouteName extends keyof RoutesParamList>(
    ...args: PushProps<RouteName>
  ): void => {
    const path = args[0]
    const params = args[1]

    if (params) {
      const query = _.map(params, (v, k) => `${k}=${v}`).join('&')
      _navigate(`${path}?${query}`)
    } else {
      _navigate(path)
    }
  }
  const [searchParams] = useSearchParams()
  const params: any = {}
  searchParams.forEach((v, k) => {
    params[k] = v
  })
  return {
    navigate,
    goBack,
    params,
  }
}

export default useNavigation
