export enum Routes {
  // main
  Home = '/',
  Home_AccountUpdateFeePayer = '/AccountUpdateFeePayer',
}

export type RoutesParamList = {
  [Routes.Home]: undefined
  [Routes.Home_AccountUpdateFeePayer]: {
    publicKey?: string
  }
}
