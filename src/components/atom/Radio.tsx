import { ReactElement } from 'react'
import styled, { useTheme } from 'styled-components'

import { STYLE } from 'consts'

import View from './View'
import { Pressable } from '.'

const StyledRadioBox = styled(Pressable)<{ selected: boolean }>`
  background-color: ${({ selected, theme }): string =>
    selected ? theme.main._400 : theme.gray.white};
  border: 1px solid;
  border-color: ${({ selected, theme }): string =>
    selected ? theme.main._400 : theme.gray._200};
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`

const StyledCircle = styled(View)`
  background-color: ${STYLE.getTheme('gray', 'white')};
  border-radius: 50%;
`

const Radio = <T,>({
  size = 18,
  value,
  selectedValue,
  setSelectedValue,
  onClickFunc,
}: {
  size?: number
  value: T
  selectedValue: T
  setSelectedValue: (selectedValue: T) => void
  onClickFunc?: () => void
}): ReactElement => {
  const theme = useTheme()
  const selected = selectedValue === value

  return (
    <StyledRadioBox
      style={{ width: `${size}px`, height: `${size}px` }}
      selected={selected}
      onClick={(): void => {
        setSelectedValue(value)
        onClickFunc?.()
      }}
    >
      {selected && (
        <StyledCircle
          style={{
            width: `${size / 2}px`,
            height: `${size / 2}px`,
          }}
          color={theme.gray.white}
        />
      )}
    </StyledRadioBox>
  )
}

export default Radio
