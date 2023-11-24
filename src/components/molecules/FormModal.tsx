import { CSSProperties, ReactElement, ReactNode } from 'react'
import styled from 'styled-components'
import { IconX } from '@tabler/icons-react'

import { View, Modal, Pressable, Row, FormText } from '../atom'
import { STYLE } from 'consts'

const StyledContainer = styled(View)`
  padding: 20px;
  background-color: ${STYLE.getTheme('gray', '_100')};
  margin: 15% auto 0;
  width: 480px;
  max-width: 100%;
  border-radius: 24px;
  row-gap: 12px;
`

const StyledHeader = styled(Row)`
  justify-content: space-between;
  margin-bottom: 10px;
`

const FormModal = ({
  title,
  isOpen,
  onClickClose,
  children,
  containerStyle,
}: {
  title?: string
  isOpen: boolean
  onClickClose: () => void
  children: ReactNode
  containerStyle?: CSSProperties
}): ReactElement => {
  return (
    <Modal isOpen={isOpen}>
      <StyledContainer style={containerStyle}>
        <StyledHeader>
          <View>{!!title && <FormText fontType="B.20">{title}</FormText>}</View>
          <Pressable onClick={onClickClose}>
            <IconX color="white" />
          </Pressable>
        </StyledHeader>
        {children}
      </StyledContainer>
    </Modal>
  )
}

export default FormModal
