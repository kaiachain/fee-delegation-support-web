import { ButtonHTMLAttributes, ReactElement } from 'react'
import styled, { css, FlattenSimpleInterpolation } from 'styled-components'

import { STYLE } from 'consts'

export type ButtonSizeType = 'xs' | 'sm' | 'md' | 'lg'

export type ButtonFigureType =
  | 'primary'
  | 'secondary'
  | 'outline' // tertiary(line)
  | 'red'
  | 'gray'

const getStyleBySize = ({
  size,
}: {
  size?: ButtonSizeType
}): FlattenSimpleInterpolation => {
  switch (size) {
    case 'xs':
      return css`
        font-size: 12px;
        line-height: 16px;
        padding: 6px 10px;
      `
    case 'sm':
      return css`
        font-size: 14px;
        line-height: 18px;
        padding: 8px 18px;
      `
    case 'md':
      return css`
        font-size: 16px;
        line-height: 20px;
        padding: 10px 22px;
      `
    // lg:
    default:
      return css`
        font-size: 18px;
        line-height: 24px;
        padding: 10px 26px;
      `
  }
}

const StyledButtonBase = styled.button<ButtonProps>`
  cursor: pointer;
  font-weight: 600;
  border-radius: 12px;
  border-style: solid;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out 0s;

  width: ${({ btnWidth }): string => btnWidth ?? 'auto'};

  ${({ size }): FlattenSimpleInterpolation => getStyleBySize({ size })};

  :disabled {
    cursor: not-allowed;
    opacity: 0.8;
    color: ${STYLE.getTheme('gray', '_200')};
  }
`

const StyledPrimary = styled(StyledButtonBase)`
  color: ${STYLE.getTheme('gray', '_700')};
  border-width: 1px;
  border-color: transparent;
  background-color: ${STYLE.getTheme('main', '_400')};

  :hover:not(:disabled) {
    opacity: 0.6;
  }

  :active:not(:disabled) {
    opacity: 0.6;
    border: 1px solid ${STYLE.getTheme('main', '_600')};
  }
`

const StyledSecondary = styled(StyledButtonBase)`
  color: ${STYLE.getTheme('main', '_400')};
  border-width: 1px;
  border-color: transparent;
  background-color: ${STYLE.getTheme('main', '_50')};

  :hover:not(:disabled) {
    opacity: 0.6;
  }

  :active:not(:disabled) {
    opacity: 0.6;
    border: 1px solid ${STYLE.getTheme('main', '_200')};
  }
`

const StyledOutline = styled(StyledButtonBase)`
  color: ${STYLE.getTheme('main', '_400')};
  border-width: 1px;
  border-color: ${STYLE.getTheme('main', '_400')};
  background-color: ${STYLE.getTheme('gray', 'white')};

  :hover:not(:disabled) {
    opacity: 0.6;
    color: ${STYLE.getTheme('main', '_500')};
  }

  :active:not(:disabled) {
    opacity: 0.6;
    color: ${STYLE.getTheme('main', '_500')};
    box-shadow: inset 0 0 0 1px ${STYLE.getTheme('main', '_100')};
  }
`

const StyledDelete = styled(StyledButtonBase)`
  color: ${STYLE.getTheme('red', 'solid')};
  border-width: 1px;
  border-color: ${STYLE.getTheme('red', 'solid')};
  background-color: transparent;

  :hover:not(:disabled) {
    background-color: ${STYLE.getTheme('gray', '_100')};
  }

  :active:not(:disabled) {
    background-color: ${STYLE.getTheme('red', 'pale')};
  }

  :disabled {
    background-color: ${STYLE.getTheme('gray', 'white')};
    border-color: ${STYLE.getTheme('red', 'pale')};
    color: ${STYLE.getTheme('red', 'pale')};
  }
`

const StyledGray = styled(StyledButtonBase)`
  color: ${STYLE.getTheme('gray', '_500')};
  background-color: ${STYLE.getTheme('gray', '_100')};
  border-width: 1px;
  border-color: transparent;
  :hover:not(:disabled) {
    opacity: 0.8;
  }
`

export type ButtonProps = {
  size?: ButtonSizeType
  figure?: ButtonFigureType
  btnWidth?: string
  disabled?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const FormButton = ({
  size = 'md',
  figure = 'primary',
  btnWidth,
  disabled = false,
  ...rest
}: ButtonProps): ReactElement => {
  let StyledComponent
  switch (figure) {
    case 'secondary':
      StyledComponent = StyledSecondary
      break
    case 'outline':
      StyledComponent = StyledOutline
      break
    case 'red':
      StyledComponent = StyledDelete
      break
    case 'gray':
      StyledComponent = StyledGray
      break
    // primary
    default:
      StyledComponent = StyledPrimary
  }

  return (
    <StyledComponent
      type="button"
      size={size}
      btnWidth={btnWidth}
      disabled={disabled}
      {...rest}
    >
      {rest.children}
    </StyledComponent>
  )
}

export default FormButton
