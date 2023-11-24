import { ReactElement } from 'react'
import { useTheme } from 'styled-components'

import { FormText, View } from '.'

const ErrMsg = ({ text }: { text?: string }): ReactElement => {
  const theme = useTheme()

  return (
    <>
      {text && (
        <View style={{ paddingTop: 4 }}>
          <FormText fontType={'R.14'} color={theme.red.solid}>
            {text}
          </FormText>
        </View>
      )}
    </>
  )
}

export default ErrMsg
