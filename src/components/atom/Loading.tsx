import { ReactElement } from 'react'
import loadingImg from '../../images/loading.gif'

const Loading = ({ size = 60 }: { size?: number }): ReactElement => {
  return <img src={loadingImg} style={{ width: size, height: size }} />
}

export default Loading
