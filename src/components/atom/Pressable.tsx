import { HTMLAttributes, ReactElement } from 'react'
import View from './View'

const Pressable = ({
  style,
  ...rest
}: HTMLAttributes<HTMLDivElement>): ReactElement => (
  <View style={{ cursor: 'pointer', ...style }} {...rest} />
)

export default Pressable
