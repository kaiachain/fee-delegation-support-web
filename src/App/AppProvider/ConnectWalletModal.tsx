import { ReactElement } from 'react'
import { useAtomValue } from 'jotai'

import { FormButton, FormModal } from 'components'
import { appStore } from 'stores'
import { useConnectWallet, useLink, useWallet } from 'hooks'

const ConnectWalletModal = (): ReactElement => {
  const modalShow = useAtomValue(appStore.isOpenConnectWallet)
  const { closeConnectWallet } = useConnectWallet()
  const { openLink } = useLink()
  const { hasKaikas, connectKaikas } = useWallet()

  return (
    <FormModal
      title="Select Wallet"
      isOpen={modalShow}
      onClickClose={closeConnectWallet}
    >
      {hasKaikas ? (
        <FormButton
          onClick={(): void => {
            connectKaikas()
            closeConnectWallet()
          }}
        >
          Connect Kaikas
        </FormButton>
      ) : (
        <FormButton
          figure="outline"
          onClick={(): void => {
            openLink(
              'https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi',
            )
          }}
        >
          Install Kaikas
        </FormButton>
      )}
      {/* {hasMetaMask ? (
        <FormButton
          onClick={(): void => {
            connectMetamask()
            closeConnectWallet()
          }}
        >
          Connect MetaMask
        </FormButton>
      ) : (
        <FormButton
          figure="outline"
          onClick={(): void => {
            openLink(
              'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'
            )
          }}
        >
          Install MetaMask
        </FormButton>
      )} */}
    </FormModal>
  )
}

export default ConnectWalletModal
