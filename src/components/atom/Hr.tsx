import styled from 'styled-components'
import View from './View'
import { STYLE } from 'consts'

const Hr = styled(View)`
  width: 100%;
  background-color: ${STYLE.getTheme('gray', '_400')};
  height: 1px;
`

export default Hr
