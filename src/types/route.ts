export enum Routes {
  // main
  Home = '/',
  Home_AccountUpdateFeePayer = '/AccountUpdateFeePayer',
  Home_TestFeePayer = '/Home_TestFeePayer',
}

export type RoutesParamList = {
  [Routes.Home]: undefined
  [Routes.Home_AccountUpdateFeePayer]: {
    publicKey?: string
  }
  [Routes.Home_TestFeePayer]: undefined
}
