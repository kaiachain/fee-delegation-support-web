import { ReactElement } from 'react'
import _ from 'lodash'

const FormImg = ({
  size,
  width,
  height,
  ...rest
}: { size: number } & Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'alt'
>): ReactElement => (
  <img
    width={size || width}
    height={size || height}
    alt={_.toString(rest.src)}
    {...rest}
  />
)

export default FormImg
