import { ReactElement } from 'react'
import styled from 'styled-components'
import Caver from 'caver-js'

import { Card, FormButton, FormText, View } from 'components'
import { UTIL } from 'consts'
import { Token } from 'types'

const StyledContainer = styled(View)`
  row-gap: 10px;
`

const feePayerAddress = import.meta.env.VITE_ROLE_BASE_ADDRESS
const feePayerPrivateKey = import.meta.env.VITE_FEE_PAYER_PRIVATE_KEY

const senderAddress = import.meta.env.VITE_SENDER_ADDRESS
const senderPrivateKey = import.meta.env.VITE_SENDER_PRIVATE_KEY

const TestFeePayer = (): ReactElement => {
  const caver = new Caver('https://public-en-baobab.klaytn.net')

  const senderKeyring = caver.wallet.keyring.create(
    senderAddress,
    senderPrivateKey,
  )
  caver.wallet.add(senderKeyring)
  const feePayerKeyring = caver.wallet.keyring.create(
    feePayerAddress,
    feePayerPrivateKey,
  )
  caver.wallet.add(feePayerKeyring)

  const onClickConfirm = async (): Promise<void> => {
    const tx = caver.transaction.feeDelegatedValueTransfer.create({
      from: senderAddress,
      to: senderAddress,
      value: UTIL.microfy('1' as Token),
      gas: 3000000,
      feePayer: feePayerAddress,
    })
    await caver.wallet.signAsFeePayer(feePayerAddress, tx)

    await caver.wallet.sign(senderAddress, tx)

    console.log('tx : ', tx)

    const receipt = await caver.rpc.klay.sendRawTransaction(tx)
    console.log(receipt)
  }

  return (
    <StyledContainer>
      <Card>
        <FormText>{`Send 1 KLAY to my self`}</FormText>
        <FormText>{`Sender : ${senderAddress}`}</FormText>
        <FormText>{`Fee payer : ${feePayerKeyring.address}`}</FormText>
        <FormButton onClick={onClickConfirm}>Confirm</FormButton>
      </Card>
    </StyledContainer>
  )
}

export default TestFeePayer
