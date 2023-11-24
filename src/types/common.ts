// https://eips.ethereum.org/EIPS/eip-1193
export interface EIP1193Provider {
  request: (args: any) => Promise<any>
  on: (event: string, handler: (arg: any) => void) => void
}

export enum WalletEnum {
  METAMASK = 'METAMASK',
  KAIKAS = 'KAIKAS',
}

export type User = {
  wallet: WalletEnum
  address: string
  proxy: EIP1193Provider
  provider: any
  chainId: number
}

// Timestamp seconds
export type TimestampS = number & NominalType<'TimestampS'>

// Timestamp milliseconds
export type TimestampM = number & NominalType<'TimestampM'>

// Decimal unit
export type dToken = string & NominalType<'dToken'>

// Integer unit
export type Token = string & NominalType<'Token'>

export type NominalType<T extends string> = { __type: T }
export type ContractAddr = string & NominalType<'ContractAddr'>

export type FontType =
  | 'B.40'
  | 'B.32'
  | 'B.24'
  | 'B.20'
  | 'B.18'
  | 'B.16'
  | 'B.14'
  | 'R.32'
  | 'R.24'
  | 'R.20'
  | 'R.18'
  | 'R.16'
  | 'R.14'
  | 'R.12'
