import BigNumber from 'bignumber.js'
import _ from 'lodash'
import { Buffer } from 'buffer'

import { Token, dToken } from '../types'

const truncate = (text: string, [h, t]: number[] = [6, 6]): string => {
  const head = text.slice(0, h)
  const tail = text.slice(-1 * t, text.length)
  return text.length > h + t ? [head, tail].join('...') : text
}

const jsonTryParse = <T>(value: string): T | undefined => {
  try {
    return JSON.parse(value) as T
  } catch {
    return undefined
  }
}

const setComma = (str: string | number): string => {
  const parts = _.toString(str).split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

const delComma = (str: string): string => {
  return _.toString(str).replace(/,/g, '')
}

const extractNumber = (str: string): string => str.replace(/\D+/g, '')

const isNumberString = (value: number | string): boolean =>
  false === new BigNumber(value || '').isNaN()

const toBn = (value?: number | string): BigNumber => new BigNumber(value || 0)

const isEven = (value: number): boolean => value % 2 === 0

const isOdd = (value: number): boolean => !isEven(value)

const microfy = (value: Token, decimal?: number): dToken =>
  toBn(value)
    .multipliedBy(Math.pow(10, decimal || 18))
    .toString(10) as dToken

const demicrofy = (value: dToken, decimal?: number): Token =>
  toBn(value)
    .div(Math.pow(10, decimal || 18))
    .toString(10) as Token

const eraseDecimal = (value: string): string => toBn(value).toString(10)

const formatAmount = (
  value: dToken,
  option?: {
    decimal?: number
    abbreviate?: boolean
    toFix?: number
  },
): string => {
  const demicrofyValue = toBn(demicrofy(value, option?.decimal))
  const strValue =
    option?.toFix !== undefined
      ? eraseDecimal(
          demicrofyValue.toFixed(option?.toFix, BigNumber.ROUND_DOWN),
        )
      : demicrofyValue.toString(10)

  if (option?.abbreviate) {
    const abbreviated = abbreviateNumber(strValue, { toFix: option?.toFix })
    return `${setComma(abbreviated.value)}${abbreviated.unit}`
  }
  return setComma(strValue)
}

const abbreviateNumber = (
  value: string,
  option?: {
    toFix?: number
  },
): { value: string; unit: string } => {
  const toFix = option?.toFix === 0 ? 0 : option?.toFix || 2
  const bn = toBn(value)

  if (bn.gte(1e12)) {
    return {
      value: eraseDecimal(bn.div(1e12).toFixed(toFix, BigNumber.ROUND_DOWN)),
      unit: 'T',
    }
  } else if (bn.gte(1e9)) {
    return {
      value: eraseDecimal(bn.div(1e9).toFixed(toFix, BigNumber.ROUND_DOWN)),
      unit: 'B',
    }
  } else if (bn.gte(1e6)) {
    return {
      value: eraseDecimal(bn.div(1e6).toFixed(toFix, BigNumber.ROUND_DOWN)),
      unit: 'M',
    }
  }
  return {
    value: eraseDecimal(bn.toFixed(toFix, BigNumber.ROUND_DOWN)),
    unit: '',
  }
}

const getPriceChange = ({
  from,
  to,
}: {
  from: BigNumber
  to: BigNumber
}): {
  isIncreased: boolean
  rate: BigNumber
} => {
  const isIncreased = to.isGreaterThanOrEqualTo(from)
  const rate = isIncreased
    ? to.div(from).minus(1)
    : new BigNumber(1).minus(to.div(from))
  return {
    isIncreased,
    rate,
  }
}

const toBase64 = (value: string): string =>
  Buffer.from(value).toString('base64')

const fromBase64 = (value: string): string =>
  Buffer.from(value, 'base64').toString()

const toPercentage = (value: number, divideBy: number): string => {
  return toBn(value)
    .div(divideBy)
    .multipliedBy(100)
    .toFixed(2, BigNumber.ROUND_DOWN)
}

const parseUrl = (value: string): URL | undefined => {
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ) // validate fragment locator
  const isValid = !!urlPattern.test(value)
  if (isValid) {
    return new URL(isURL(value) ? value : `https://${value}`)
  }
}

const isURL = (value: string): boolean => {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

const regexp = {
  password: new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!"#$%&\'()*+,.\\/:;<=>?@[\\]^_`{|}~-])[A-Za-z\\d!"#$%&\'()*+,.\\/:;<=>?@[\\]^_`{|}~-]{8,32}$',
  ),
}

const getRandId = (): string =>
  `${Math.random().toString().replace('0.', '')}${new Date().getTime()}`

export default {
  truncate,
  jsonTryParse,
  setComma,
  delComma,
  extractNumber,
  isNumberString,
  toBn,
  isEven,
  isOdd,
  microfy,
  demicrofy,
  formatAmount,
  abbreviateNumber,
  getPriceChange,
  toBase64,
  fromBase64,
  toPercentage,
  isURL,
  parseUrl,
  regexp,
  getRandId,
}
