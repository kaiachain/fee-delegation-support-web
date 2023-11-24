import { appStore } from 'stores'
import { useSetAtom } from 'jotai'

export type UseLoadingReturn = {
  showLoading: (props?: { message: string }) => void
  hideLoading: () => void
}

const useLoading = (): UseLoadingReturn => {
  const setIsOpen = useSetAtom(appStore.isShowLoading)
  const setLoadingMessage = useSetAtom(appStore.loadingMessage)
  const showLoading = (props?: { message: string }): void => {
    setLoadingMessage(props?.message || '')
    setIsOpen(true)
  }

  const hideLoading = (): void => {
    setLoadingMessage('')
    setIsOpen(false)
  }
  return { showLoading, hideLoading }
}

export default useLoading
