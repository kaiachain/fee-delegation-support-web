import { HTMLAttributes, ReactElement } from 'react'
import View from './View'

const Card = ({
  style,
  ...rest
}: HTMLAttributes<HTMLDivElement>): ReactElement => (
  <View
    style={{
      flex: 1,
      borderRadius: 20,
      background:
        'linear-gradient(180deg, rgba(116, 116, 130, 0.3) 0%, rgba(116, 116, 130, 0.2) 92.11%)',
      padding: 20,
      rowGap: 10,
      ...style,
    }}
    {...rest}
  />
)

export default Card
