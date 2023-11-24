import { atom } from 'jotai'

import { User } from 'types'

const isOpenConnectWallet = atom<boolean>(false)

const isShowLoading = atom<boolean>(false)
const loadingMessage = atom<string>('')

const user = atom<User | undefined>(undefined)

export default { isOpenConnectWallet, user, isShowLoading, loadingMessage }
