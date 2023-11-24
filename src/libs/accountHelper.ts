import Caver from 'caver-js'
import { ContractAddr } from 'types'

const utils = Caver.utils

const publicKeyToAddress = (publicKey: string): ContractAddr | undefined => {
  if (utils.isValidPublicKey(publicKey)) {
    return utils.toChecksumAddress(
      utils.publicKeyToAddress(publicKey),
    ) as ContractAddr
  }
}

export default {
  publicKeyToAddress,
}
