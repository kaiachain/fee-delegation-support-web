import { ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components'
import Caver, { Keyring, SingleKeyring, TransactionReceipt } from 'caver-js'
import { isValidAddress } from 'ethereumjs-util'

import { UTIL } from 'consts'

import {
  Card,
  FormButton,
  FormText,
  View,
  FormGetKey,
  FormInput,
  CodeBlock,
  LinkExplorer,
  Row,
  Hr,
} from 'components'
import { useLoading, useNetwork } from 'hooks'
import { ChainNetworkEnum, ContractAddr, Token } from 'types'

const StyledContainer = styled(View)`
  row-gap: 10px;
`

const RunWithFeePayer = ({
  feePayerKeyring,
  senderKeyring,
}: {
  feePayerKeyring: SingleKeyring
  senderKeyring: Keyring
}): ReactElement => {
  const { connectedNetwork } = useNetwork()
  const { showLoading, hideLoading } = useLoading()

  const caver = new Caver(
    connectedNetwork === ChainNetworkEnum.CYPRESS
      ? 'https://public-en-cypress.klaytn.net'
      : 'https://public-en-baobab.klaytn.net',
  )
  caver.wallet.add(senderKeyring)
  caver.wallet.add(feePayerKeyring)

  const [txReceipt, setTxReceipt] = useState<TransactionReceipt>()

  const onClickConfirm = async (): Promise<void> => {
    showLoading()

    try {
      const tx = caver.transaction.feeDelegatedValueTransfer.create({
        from: senderKeyring.address,
        to: senderKeyring.address,
        value: UTIL.microfy('1' as Token),
        gas: 300000,
        feePayer: feePayerKeyring.address,
      })
      await caver.wallet.signAsFeePayer(feePayerKeyring.address, tx)

      await caver.wallet.sign(senderKeyring.address, tx)

      const receipt = await caver.rpc.klay.sendRawTransaction(tx)
      setTxReceipt(receipt)
    } catch (error) {
      window.alert(error)
    } finally {
      hideLoading()
    }
  }

  return (
    <>
      <Card>
        <FormText fontType="B.20">Send 1 KLAY to sender itself</FormText>
        <Row style={{ columnGap: 4 }}>
          <FormText>Fee payer : </FormText>
          <LinkExplorer type="account" address={feePayerKeyring.address} />
        </Row>
        <Row style={{ columnGap: 4 }}>
          <FormText>Sender : </FormText>
          <LinkExplorer type="account" address={senderKeyring.address} />
        </Row>
        <FormButton onClick={onClickConfirm}>Confirm</FormButton>
      </Card>
      {txReceipt && (
        <Card>
          <FormText fontType="B.20">TX</FormText>
          <CodeBlock text={JSON.stringify(txReceipt, null, 2)} />
        </Card>
      )}
    </>
  )
}

const TestFeePayer = (): ReactElement => {
  const [keyring, setKeyring] = useState<Keyring>()
  const [feePayerAddress, setFeePayerAddress] = useState<ContractAddr>(
    '' as ContractAddr,
  )

  const [feePayerKeyring, setFeePayerKeyring] = useState<SingleKeyring>()
  const [senderKeyring, setSenderKeyring] = useState<Keyring>()

  useEffect(() => {
    if (keyring && isValidAddress(feePayerAddress)) {
      const caver = new Caver()

      if (keyring.type === 'SingleKeyring') {
        setFeePayerKeyring(
          caver.wallet.keyring.create(
            feePayerAddress,
            (keyring as SingleKeyring).key.privateKey,
          ),
        )
      }
    }
  }, [keyring, feePayerAddress])

  return (
    <StyledContainer>
      <Card>
        <FormText fontType="B.20">
          KLAY fee owning address
          <br />
          <small>
            <b style={{ color: 'gray' }}>
              (The address that owns the KLAY for paying the fee)
            </b>
          </small>
        </FormText>
        <FormInput
          inputProps={{ value: feePayerAddress, placeholder: '0x...' }}
          onChangeValue={(value): void => {
            setFeePayerAddress(value as ContractAddr)
          }}
        />
        <Hr />
        <FormText fontType="B.20">
          Keystore with the Fee Payer Role
          <br />
          <small>
            <b style={{ color: 'red' }}>(single keyring only for now)</b>
          </small>
        </FormText>
        <View>
          <FormGetKey keyring={keyring} setKeyring={setKeyring} />
          {keyring && <FormText>Keyring type : {keyring.type}</FormText>}
        </View>
        <Hr />
        <FormText fontType="B.20">
          Tx Sender keystore
          <br />
          <small>
            <b style={{ color: 'gray' }}>
              (The keystore of the account attempting to execute a transaction
              without KLAY fees)
            </b>
          </small>
        </FormText>
        <View>
          <FormGetKey keyring={senderKeyring} setKeyring={setSenderKeyring} />
          {senderKeyring && (
            <FormText>Keyring type : {senderKeyring.type}</FormText>
          )}
        </View>
      </Card>
      {feePayerKeyring && senderKeyring && (
        <RunWithFeePayer
          feePayerKeyring={feePayerKeyring}
          senderKeyring={senderKeyring}
        />
      )}
    </StyledContainer>
  )
}

export default TestFeePayer
