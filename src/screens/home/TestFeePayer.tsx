import { ReactElement, useState } from 'react'
import styled from 'styled-components'
import Caver, { Keyring } from 'caver-js'

import { Card, FormButton, FormText, View, FormGetKey } from 'components'
import { useAuth } from 'hooks'
import { UTIL } from 'consts'
import { Token } from 'types'

const StyledContainer = styled(View)`
  row-gap: 10px;
`

const TestFeePayer = (): ReactElement => {
  const { user } = useAuth()
  const [feePayerKeyring, setFeePayerKeyring] = useState<Keyring>()

  const onClickConfirm = async (): Promise<void> => {
    if (user && feePayerKeyring) {
      //const feePayerPivateKey = feePayerKeyring.getKeyByRole(2)[0]

      const caver = new Caver(user.proxy as any)

      try {
        const tx = {
          type: 'FEE_DELEGATED_VALUE_TRANSFER',
          from: user.address,
          to: user.address,
          value: UTIL.microfy('1' as Token),
          gas: 3000000,
          feePayer: feePayerKeyring.address,
        }

        const signedTx = await caver.klay.signTransaction(tx)
        console.log('signedTx : ', signedTx)

        const txHash = caver.klay.sendTransaction({
          senderRawTransaction: signedTx.raw,
          feePayer: feePayerKeyring.address,
        })
        console.log('txHash : ', txHash)

        // const { rawTransaction: senderRawTransaction } =
        //   await caver.klay.accounts.signTransaction({
        //     type: 'FEE_DELEGATED_VALUE_TRANSFER',
        //     from: user.address,
        //     to: user.address,
        //     gas: 3000000,
        //     value: caver.utils.toPeb('1', 'KLAY'),
        //   })

        // const txHash = await caver.klay.sendTransaction({
        //   senderRawTransaction: senderRawTransaction,
        //   feePayer: feePayerKeyring.address,
        // })
      } catch (error) {
        console.log('error ', error)
      }
    }
  }

  return (
    <StyledContainer>
      <Card>
        <FormText fontType="B.20">Fee payer keystore</FormText>
        <FormGetKey keyring={feePayerKeyring} setKeyring={setFeePayerKeyring} />
      </Card>
      {feePayerKeyring && (
        <Card>
          <FormText>{`Send 1 KLAY to my self`}</FormText>
          <FormText>{`Address : ${user?.address}`}</FormText>
          <FormText>{`Fee payer : ${feePayerKeyring.address}`}</FormText>
          <FormButton onClick={onClickConfirm}>Confirm</FormButton>
        </Card>
      )}
    </StyledContainer>
  )
}

export default TestFeePayer
