import { CSSProperties } from 'react'
import { DefaultTheme, RuleSet, css } from 'styled-components'
import { FontType } from 'types'

const DESKTOP_WIDE = 1920
const DESKTOP = 1440
const TABLET = 1024
const MOBILE = 480
const MINI = 320

const media = {
  overWideDesktop: `(min-width: ${DESKTOP_WIDE + 1}px)`,
  overDesktop: `(min-width: ${DESKTOP + 1}px)`,
  mini: `(max-width: ${MINI}px)`,
  mobile: `(max-width: ${MOBILE}px)`,
  tablet: `(max-width: ${TABLET}px)`,
}

const setMediaWidth = (): RuleSet<object> => css`
  margin: 0 auto;
  width: ${DESKTOP}px;
  @media ${media.tablet} {
    width: auto;
    margin: 0;
  }
`

const getFontStyle = (fontType: FontType): CSSProperties => {
  const weightType = fontType.split('.')[0]
  const fontSize = Number(fontType.split('.')[1])

  let fontWeight = 400
  if (weightType === 'B') {
    fontWeight = 600
  }

  return { fontSize, fontWeight }
}
const getTheme =
  <T1 extends keyof DefaultTheme, T2 extends keyof DefaultTheme[T1]>(
    val1: T1,
    val2: T2,
  ) =>
  ({ theme }: { theme: DefaultTheme }): DefaultTheme[T1][T2] =>
    theme[val1][val2]

const ellipsisRow = (row: number): RuleSet<object> => css`
  min-width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${row};
  -webkit-box-orient: vertical;
`

export default { media, getFontStyle, getTheme, setMediaWidth, ellipsisRow }
