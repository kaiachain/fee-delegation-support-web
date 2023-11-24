import { RouteObject } from 'react-router-dom'

import { Routes } from 'types'

import Layout from './Layout'
import AccountUpdateFeePayer from './AccountUpdateFeePayer'
import GetPublicKey from './GetPublicKey'

const pages: RouteObject[] = [
  {
    path: Routes.Home,
    Component: Layout,
    children: [
      {
        index: true,
        Component: GetPublicKey,
      },
      {
        path: Routes.Home_AccountUpdateFeePayer,
        Component: AccountUpdateFeePayer,
      },
    ],
  },
]

export default pages
