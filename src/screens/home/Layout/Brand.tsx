import { ReactElement } from 'react'
import styled, { useTheme } from 'styled-components'

import { FormButton, FormImg, FormText, Row } from 'components'
import { useAuth, useConnectWallet, useNetwork } from 'hooks'
import { ChainNetworkEnum } from 'types'
import { UTIL } from 'consts'

const StyledContainer = styled(Row)`
  column-gap: 8px;
  justify-content: space-between;
`

const Brand = (): ReactElement => {
  const { connectedNetwork } = useNetwork()
  const theme = useTheme()
  const { user, walletImage, logout } = useAuth()

  const { openConnectWallet } = useConnectWallet()
  return (
    <StyledContainer>
      <Row style={{ columnGap: 8 }}>
        <FormText fontType="B.32">Klaytn Support Kit</FormText>

        {connectedNetwork !== ChainNetworkEnum.CYPRESS && (
          <FormText fontType="R.14" color={theme.orange.solid}>
            {connectedNetwork}
          </FormText>
        )}
      </Row>
      {user ? (
        <Row style={{ columnGap: 8 }}>
          <Row style={{ alignItems: 'center', columnGap: 8 }}>
            <FormImg src={walletImage} size={24} />
            <FormText>{UTIL.truncate(user.address)}</FormText>
          </Row>
          <FormButton figure="red" size="sm" onClick={logout}>
            Logout
          </FormButton>
        </Row>
      ) : (
        <FormButton onClick={openConnectWallet}>Connect</FormButton>
      )}
    </StyledContainer>
  )
}

export default Brand
