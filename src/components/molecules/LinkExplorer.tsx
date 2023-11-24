import { ReactElement, ReactNode } from 'react'
import styled, { useTheme } from 'styled-components'

import { STYLE, UTIL } from 'consts'

import { FormText, Pressable, View } from '../atom'
import { useExplorer, useLink } from 'hooks'
import { IconExternalLink } from '@tabler/icons-react'

const StyledContainer = styled(Pressable)`
  flex-direction: row;
  gap: 8px;
  align-items: center;
`

const TextBox = styled(View)`
  ${STYLE.ellipsisRow(1)}
`

const LinkExplorer = ({
  address,
  children,
  type,
  truncate,
}: {
  address: string
  children?: ReactNode
  type: 'tx' | 'account'
  truncate?: [number, number]
}): ReactElement => {
  const theme = useTheme()
  const { openLink } = useLink()
  const { getExplorerLink } = useExplorer()

  return (
    <>
      {!!address && address.length !== 0 && (
        <StyledContainer
          onClick={(): void => openLink(getExplorerLink({ address, type }))}
        >
          {children || (
            <>
              {truncate ? (
                <FormText
                  color={theme.gray._800}
                  style={{ fontFamily: 'IBMPlexMono' }}
                >
                  {UTIL.truncate(address, truncate)}
                </FormText>
              ) : (
                <TextBox>
                  <FormText
                    color={theme.gray._800}
                    style={{ fontFamily: 'IBMPlexMono' }}
                  >
                    {address}
                  </FormText>
                </TextBox>
              )}
              <IconExternalLink color={theme.gray._800} size={18} />
            </>
          )}
        </StyledContainer>
      )}
    </>
  )
}

export default LinkExplorer
