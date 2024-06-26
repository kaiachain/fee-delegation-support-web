import { ReactElement } from 'react'
import styled from 'styled-components'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'
import { IconCopy } from '@tabler/icons-react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { useToast } from 'hooks'
import View from '../atom/View'
import { Pressable } from '../atom'

const StyledBlockContainer = styled(View)`
  position: relative;
`

const StyledCopyIconBox = styled(Pressable)`
  position: absolute;
  top: 5px;
  right: 10px;
`

const StyledPre = styled.pre`
  text-align: left;
  padding: 5px;
  overflow-x: scroll;
  margin: 0;

  & .token-line {
    line-height: 1.3em;
    height: 1.3em;
  }
`

const StyledLine = styled.div`
  display: table-row;
`

const StyledLineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
`

const StyledLineContent = styled.span`
  display: table-cell;
`

const CodeBlock = ({
  toggle = false,
  text,
  title,
}: {
  toggle?: boolean
  text: string
  title?: string
}): ReactElement => {
  const { toast } = useToast()

  const Block = (): ReactElement => (
    <StyledBlockContainer>
      <Highlight {...defaultProps} theme={theme} code={text} language="tsx">
        {({
          className,
          style,
          tokens,
          getLineProps,
          getTokenProps,
        }): ReactElement => (
          <StyledPre className={className} style={style}>
            {tokens.map((line, i) => (
              <StyledLine key={i} {...getLineProps({ line, key: i })}>
                <StyledLineNo>{i + 1}</StyledLineNo>
                <StyledLineContent>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </StyledLineContent>
              </StyledLine>
            ))}
          </StyledPre>
        )}
      </Highlight>
      <StyledCopyIconBox>
        <CopyToClipboard
          text={text}
          onCopy={(): void => {
            toast('Copied')
          }}
        >
          <IconCopy color={'white'} size={16} />
        </CopyToClipboard>
      </StyledCopyIconBox>
    </StyledBlockContainer>
  )

  return toggle ? (
    <details>
      <summary style={{ color: '#50fa7b' }}>{title || 'Code'}</summary>
      <Block />
    </details>
  ) : (
    <Block />
  )
}

export default CodeBlock
