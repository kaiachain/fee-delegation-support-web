import { ReactElement, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import Caver from 'caver-js'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { Card, FormButton, FormText, Row, View } from 'components'
import { useAppNavigation, useAuth, useToast } from 'hooks'
import { Routes } from 'types'

const utils = Caver.utils

const StyledContainer = styled(View)`
  row-gap: 10px;
`

const GetPublicKey = (): ReactElement => {
  const { user } = useAuth()
  const [publicKey, setPublicKey] = useState('')
  const theme = useTheme()
  const [addrFromPubKey, setAddrFromPubKey] = useState('')

  const { toast } = useToast()
  const { navigate } = useAppNavigation()

  const onClickConfirm = async (): Promise<void> => {
    if (user) {
      const caver = new Caver(user.proxy as any)
      const message = 'Confirm to get public key'

      const signMessage = await caver.klay.sign(message, user.address)
      const _publicKey = utils.recoverPublicKey(
        message,
        utils.resolveSignature(signMessage),
      )
      const _addr = utils.toChecksumAddress(
        utils.publicKeyToAddress(_publicKey),
      )
      setAddrFromPubKey(_addr)
      setPublicKey(_publicKey)
    }
  }

  return (
    <StyledContainer>
      <Card>
        <FormText fontType="B.20">Get public key</FormText>
        <FormButton onClick={onClickConfirm}>Ask to Wallet</FormButton>
      </Card>
      {publicKey && (
        <Card>
          <Row style={{ columnGap: 4 }}>
            <FormText fontType="B.20" color={theme.gray._400}>
              public key
            </FormText>
            <CopyToClipboard
              text={publicKey}
              onCopy={(): void => {
                toast('Copied')
              }}
            >
              <FormButton
                figure="outline"
                size="xs"
                style={{ width: 'fit-content' }}
              >
                {' '}
                copy
              </FormButton>
            </CopyToClipboard>
          </Row>
          <FormText>{publicKey}</FormText>

          <FormText fontType="B.20" color={theme.gray._400}>
            address of public key
          </FormText>
          <FormText>{addrFromPubKey}</FormText>
          {addrFromPubKey !== user?.address && (
            <FormText color={theme.red.solid}>
              It's different with login wallet
            </FormText>
          )}
          <FormButton
            onClick={(): void => {
              navigate(Routes.Home_AccountUpdateFeePayer, { publicKey })
            }}
          >
            Move to set fee payer
          </FormButton>
        </Card>
      )}
    </StyledContainer>
  )
}

export default GetPublicKey
