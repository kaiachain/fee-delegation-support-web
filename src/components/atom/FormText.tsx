import { STYLE } from 'consts'
import { FontType } from 'types'
import { HTMLAttributes, ReactElement } from 'react'
import { useTheme } from 'styled-components'

type FormTextProps = {
  fontType?: FontType
} & HTMLAttributes<HTMLSpanElement>

const FormText = ({
  fontType = 'R.16',
  children,
  color,
  style,
  ...rest
}: FormTextProps): ReactElement => {
  const fontStyle = STYLE.getFontStyle(fontType)
  const theme = useTheme()
  color = color || theme.gray._800

  return (
    <span
      style={{ wordBreak: 'break-word', color, ...fontStyle, ...style }}
      {...rest}
    >
      {children}
    </span>
  )
}

export default FormText
