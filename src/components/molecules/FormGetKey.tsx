import { ReactElement, useEffect, useState } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import Caver, { Keystore, Keyring } from 'caver-js'

import { UTIL } from 'consts'

import { FormButton, View, FormInput, Row, FormFile, ErrMsg } from 'components'

const caver = new Caver()
const keyringDecrypt = caver.wallet.keyring.decrypt

const StyledContainer = styled(View)`
  gap: 8px;
`

const FormGetKey = ({
  keyring,
  setKeyring,
}: {
  keyring?: Keyring
  setKeyring: (value?: Keyring) => void
}): ReactElement => {
  const [keyringErrMsg, setKeyringErrMsg] = useState('')
  const [keystoreJSON, setKeystoreJSON] = useState<Keystore>()
  const [keystorePassword, setKeystorePassword] = useState('')

  const handleKeystoreChange = (files?: FileList): void => {
    if (files && files.length > 0) {
      const fileReader = new FileReader()
      fileReader.readAsText(files[0], 'UTF-8')
      fileReader.onload = (event): void => {
        if (typeof event.target?.result === 'string') {
          const json = UTIL.jsonTryParse<Keystore>(event.target.result)
          setKeystoreJSON(json)
        }
      }
    }
  }

  const onClickDecryptKeystore = (): void => {
    try {
      if (keystoreJSON) {
        setKeyring(keyringDecrypt(keystoreJSON, keystorePassword))
      }
    } catch (error) {
      setKeyringErrMsg(_.toString(error))
    }
  }

  useEffect(() => {
    if (keystoreJSON) {
      try {
        setKeyring(keyringDecrypt(keystoreJSON, ''))
      } catch {
        // just try decrypt
      }
    }

    return (): void => {
      setKeyring(undefined)
      setKeyringErrMsg('')
    }
  }, [keystoreJSON])

  useEffect(() => {
    setKeystorePassword('')
  }, [keystoreJSON])

  return (
    <StyledContainer>
      <View>
        <View style={{ paddingBottom: 10 }}>
          <FormFile
            placeholder="Keystore File"
            accept=".json"
            onChange={handleKeystoreChange}
          />
        </View>
        {keystoreJSON && !keyring && (
          <View style={{ paddingBottom: 10 }}>
            <Row style={{ gap: 8 }}>
              <View style={{ flex: 1 }}>
                <FormInput
                  inputProps={{
                    type: 'password',
                    value: keystorePassword,
                    placeholder: 'Input password',
                  }}
                  onChangeValue={setKeystorePassword}
                />
              </View>
              <FormButton
                disabled={!keystorePassword}
                onClick={onClickDecryptKeystore}
              >
                Decrypt
              </FormButton>
            </Row>
            {keystorePassword && <ErrMsg text={keyringErrMsg} />}
          </View>
        )}
      </View>
    </StyledContainer>
  )
}

export default FormGetKey
