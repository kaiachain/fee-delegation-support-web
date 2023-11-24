import { ReactElement } from 'react'
import { useAtomValue } from 'jotai'

import { FormText, Loading, Modal, View } from 'components'
import { appStore } from 'stores'

const LoadingModal = (): ReactElement => {
  const isShowLoading = useAtomValue(appStore.isShowLoading)
  const loadingMessage = useAtomValue(appStore.loadingMessage)
  return (
    <Modal isOpen={isShowLoading}>
      <View style={{ alignItems: 'center', paddingTop: '30%' }}>
        <Loading />
        {loadingMessage && (
          <FormText fontType="B.18">{loadingMessage}</FormText>
        )}
      </View>
    </Modal>
  )
}

export default LoadingModal
