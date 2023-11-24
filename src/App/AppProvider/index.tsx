import { ReactElement, ReactNode } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Modal from 'react-modal'
import { dark } from '../../consts/theme'
import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { View } from 'components'
import { STYLE } from 'consts'

import ConnectWalletModal from './ConnectWalletModal'
import LoadingModal from './LoadingModal'

const queryClient = new QueryClient()
Modal.setAppElement('#root')

const StyledContainer = styled(View)`
  background-color: ${STYLE.getTheme('gray', '_30')};
  min-height: 100%;
`

const AppProvider = ({ children }: { children: ReactNode }): ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={dark}>
        <StyledContainer>
          {children}
          <ConnectWalletModal />
          <LoadingModal />
          <ToastContainer
            position="top-right"
            hideProgressBar
            autoClose={1000}
            transition={Slide}
            limit={3}
          />
        </StyledContainer>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default AppProvider
