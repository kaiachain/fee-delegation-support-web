import { ReactElement, useMemo, useState } from 'react'
import styled from 'styled-components'
import Caver, { AccountKeyForRPC } from 'caver-js'
import { useTheme } from 'styled-components'
import { useQuery } from '@tanstack/react-query'
// @ts-ignore
import { ec } from 'elliptic'

import { Card, FormButton, FormText, View, CodeBlock, Row } from 'components'
import { useAppNavigation, useAuth } from 'hooks'
import { ContractAddr, QueryKeyEnum, Routes, User } from 'types'
import { STYLE } from 'consts'
import { accountHelper } from 'libs'

const secp256k1 = new ec('secp256k1')

const StyledContainer = styled(View)`
  row-gap: 10px;
`

const StyledKeyBox = styled(Card)`
  background-color: ${STYLE.getTheme('gray', '_870')};
`

const StyledTextarea = styled.textarea`
  resize: none;
  background-color: transparent;
  color: ${STYLE.getTheme('gray', '_700')};
  border: 1px solid ${STYLE.getTheme('gray', '_800')};
  padding: 10px;
`

const makePublicKey = (x: string, y: string): string => {
  const keyPair = secp256k1.keyPair({
    pub: {
      x: x.replace('0x', ''),
      y: y.replace('0x', ''),
    },
    pubEnc: 'hex',
  })
  return `0x${keyPair.getPublic(false, 'hex').slice(2)}`
}

const KeyParser = ({
  title,
  accKey,
}: {
  title: string
  accKey: AccountKeyForRPC['key']
}): ReactElement => {
  const { user } = useAuth()
  const theme = useTheme()
  const obj = useMemo(() => {
    if (accKey && 'x' in accKey && 'y' in accKey) {
      const publicKey = makePublicKey(accKey.x, accKey.y)

      return {
        address: accountHelper.publicKeyToAddress(publicKey),
        publicKey,
      }
    }
  }, [accKey])

  const isSameWithUser = obj?.address === user?.address

  return obj ? (
    <View style={{ rowGap: 4 }}>
      <Row style={{ columnGap: 4 }}>
        <FormText fontType="B.14" color={theme.gray._500}>
          {title}
        </FormText>
        <FormText
          fontType="B.14"
          color={isSameWithUser ? theme.main._500 : theme.red.solid}
        >
          {` ( ${
            isSameWithUser ? "Same with user's address" : 'Different address'
          } )`}
        </FormText>
      </Row>
      <CodeBlock text={JSON.stringify(obj, null, 2)} />
    </View>
  ) : (
    <FormText>-</FormText>
  )
}

const UpdateCard = ({
  updaterPubKey,
  user,
}: {
  updaterPubKey: string
  user: User
}): ReactElement => {
  const [feePayerPubKey, setFeePayerPubKey] = useState('')

  const theme = useTheme()

  const caver = new Caver(user.proxy as any)

  const { data: updaterAccountKey = {}, refetch } = useQuery(
    [QueryKeyEnum.KLAY_ACCOUNT_KEY, updaterPubKey],
    () =>
      caver.rpc.klay.getAccountKey(
        accountHelper.publicKeyToAddress(updaterPubKey) || '',
      ),
  )

  const updaterAccountKeyType = useMemo(() => {
    switch (updaterAccountKey.keyType) {
      case 5:
        return 'AccountKeyRoleBased'
      case 4:
        return 'AccountKeyWeightedMultiSig'
      case 3:
        return 'AccountKeyFail'
      case 2:
        return 'AccountKeyPublic'
      case 1:
        return 'AccountKeyLegacy'
    }
  }, [updaterAccountKey])

  const update = async (): Promise<void> => {
    const toUpdate = caver.klay.accounts.createAccountForUpdateWithPublicKey(
      user.address,
      {
        transactionKey: updaterPubKey,
        updateKey: updaterPubKey,
        feePayerKey: feePayerPubKey,
      },
    )

    const tx = {
      type: 'ACCOUNT_UPDATE',
      from: user.address,
      gas: 3000000,
      key: toUpdate,
    }

    // @ts-ignore
    caver.klay.sendTransaction(tx)

    refetch()
  }

  return (
    <>
      <Card>
        <FormText fontType="B.20" color={theme.gray._400}>
          Account updater's public key
        </FormText>
        <FormText>{updaterPubKey}</FormText>

        <FormText fontType="B.20" color={theme.gray._400}>
          Account Key
        </FormText>
        <StyledKeyBox>
          <FormText fontType="B.14" color={theme.gray._500}>
            Key type
          </FormText>
          <FormText fontType="B.18">{updaterAccountKeyType} </FormText>
          {Array.isArray(updaterAccountKey.key) && (
            <View style={{ rowGap: 4 }}>
              <FormText fontType="B.14" color={theme.gray._500}></FormText>
              <KeyParser
                title="Transaction key"
                accKey={updaterAccountKey.key[0].key}
              />
              <KeyParser
                title="Update key"
                accKey={updaterAccountKey.key[1].key}
              />
              <KeyParser
                title="Fee Payer key"
                accKey={updaterAccountKey.key[2].key}
              />
            </View>
          )}
        </StyledKeyBox>
      </Card>
      <Card>
        <FormText fontType="B.20" color={theme.gray._400}>
          Input public key to set as fee payer
        </FormText>
        <StyledTextarea
          rows={3}
          value={feePayerPubKey}
          onChange={({ target: { value } }): void => {
            setFeePayerPubKey(value as ContractAddr)
          }}
        />
        {feePayerPubKey && (
          <FormText fontType="R.14">
            Address of public key:{' '}
            {accountHelper.publicKeyToAddress(feePayerPubKey)}
          </FormText>
        )}
      </Card>
      <FormButton onClick={update}>Update</FormButton>
    </>
  )
}

const AccountUpdateFeePayer = (): ReactElement => {
  const { params, navigate } =
    useAppNavigation<Routes.Home_AccountUpdateFeePayer>()
  const updaterPubKey = params.publicKey
  const { user } = useAuth()
  return (
    <StyledContainer>
      {updaterPubKey && user ? (
        <UpdateCard updaterPubKey={updaterPubKey} user={user} />
      ) : (
        <Card>
          <FormButton
            onClick={(): void => {
              navigate(Routes.Home)
            }}
          >
            Get wallet public key
          </FormButton>
        </Card>
      )}
    </StyledContainer>
  )
}

export default AccountUpdateFeePayer
