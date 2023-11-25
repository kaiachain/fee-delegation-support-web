import { ReactElement, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { IconX } from '@tabler/icons-react'

import { STYLE } from 'consts'

import { Pressable, FormText, View, Row } from '../atom'

const StyledContainer = styled(View)`
  width: 100%;
`

const StyledWrapper = styled(Row)`
  box-sizing: border-box;
  border-bottom: 2px solid ${STYLE.getTheme('gray', '_50')};
  background-color: ${STYLE.getTheme('gray', '_100')};
  padding: 4px;
`

const StyledInput = styled.input`
  flex: 1;
  width: 100%;
  margin: 0;
  background-color: transparent;
  padding: 10px;

  color: ${STYLE.getTheme('gray', '_700')};
  border: none;

  ::placeholder {
    color: ${STYLE.getTheme('gray', '_400')};
  }
  :focus {
    outline: none;
  }
  @media ${STYLE.media.mobile} {
    width: 100%;
    font-size: 16px;
  }
`

const StyledClearBtn = styled(Pressable)``

const StyledNewClearBtn = styled(Pressable)``

const FormInput = ({
  inputProps,
  onChangeValue,
  isError,
  helperText,
  clearButton,
  newClearButton,
  onEnterKeyPress,
  onNewClearButtonClick,
}: {
  inputProps?: {
    placeholder?: string
    value?: string
    readOnly?: boolean
    autoFocus?: boolean
    type?: 'text' | 'password' | 'number'
  }
  onChangeValue?: (value: string) => void
  isError?: boolean
  helperText?: string
  clearButton?: boolean
  newClearButton?: boolean
  onEnterKeyPress?: () => void
  onNewClearButtonClick?: () => void
}): ReactElement => {
  const theme = useTheme()
  const readOnly = inputProps?.readOnly

  let helperTextStyle
  const [onFocus, setOnFocus] = useState(false)
  if (isError) {
    helperTextStyle = theme.red.solid
  } else if (onFocus) {
    helperTextStyle = theme.main._400
  }

  return (
    <StyledContainer>
      <StyledWrapper>
        <StyledInput
          {...inputProps}
          onChange={({ target: { value } }): void => {
            onChangeValue?.(value)
          }}
          onWheel={({ currentTarget }): void => {
            currentTarget.blur()
          }}
          onFocus={(): void => {
            if (!readOnly) {
              setOnFocus(true)
            }
          }}
          onBlur={(): void => {
            setOnFocus(false)
          }}
          onKeyUp={(e): void => {
            if (e.key === 'Enter' && onEnterKeyPress) {
              onEnterKeyPress()
            }
          }}
        />
        {clearButton && inputProps?.value && (
          <StyledClearBtn
            onClick={(): void => {
              onChangeValue?.('')
            }}
          >
            <IconX
              style={{
                width: '16px',
                height: '16px',
                fill: theme.gray._400,
              }}
            />
          </StyledClearBtn>
        )}
        {newClearButton && inputProps?.value && (
          <StyledNewClearBtn
            onClick={(): void => {
              onChangeValue?.('')
              onNewClearButtonClick?.()
            }}
          >
            <IconX
              style={{
                width: '16px',
                height: '16px',
                fill: theme.gray._400,
              }}
            />
          </StyledNewClearBtn>
        )}
      </StyledWrapper>
      {helperText && (
        <View style={{ paddingTop: 4 }}>
          <FormText fontType={'R.14'} color={helperTextStyle}>
            {helperText}
          </FormText>
        </View>
      )}
    </StyledContainer>
  )
}

export default FormInput
