import { ReactElement } from 'react'
import styled, { useTheme } from 'styled-components'
import { Outlet, useLocation } from 'react-router-dom'

import { STYLE } from 'consts'

import { FormText, Pressable, View } from 'components'

import { Routes } from 'types'
import { useAppNavigation } from 'hooks'

import Brand from './Brand'

const StyledContainer = styled(View)`
  padding: 20px;
  width: 900px;
  margin: 0 auto;
`

const StyledBody = styled(View)`
  display: grid;
  grid-template-columns: 300px 600px;
`

const StyledMenu = styled(View)`
  padding: 20px;
  row-gap: 24px;

  @media ${STYLE.media.mobile} {
    padding: 10px;
  }
`
const StyledContents = styled(View)`
  padding: 20px;
  row-gap: 24px;

  @media ${STYLE.media.mobile} {
    padding: 10px;
  }
`

const StyledMenuItem = styled(Pressable)`
  padding: 10px;
`

const MenuItem = ({
  routes,
  title,
}: {
  routes: Routes
  title: string
}): ReactElement => {
  const { navigate } = useAppNavigation()
  const location = useLocation()
  const theme = useTheme()
  const selected = routes === location?.pathname
  return (
    <StyledMenuItem
      onClick={(): void => {
        navigate(routes)
      }}
    >
      <FormText
        fontType={selected ? 'B.20' : 'R.18'}
        color={selected ? theme.main._400 : theme.gray._900}
      >
        {title}
      </FormText>
    </StyledMenuItem>
  )
}

const MainScreen = (): ReactElement => {
  return (
    <StyledContainer>
      <Brand />
      <StyledBody>
        <StyledMenu>
          <MenuItem routes={Routes.Home} title="Get public key" />
          <MenuItem
            routes={Routes.Home_AccountUpdateFeePayer}
            title="Set fee payer"
          />
          <MenuItem routes={Routes.Home_TestFeePayer} title="Test fee payer" />
        </StyledMenu>
        <StyledContents>
          <Outlet />
        </StyledContents>
      </StyledBody>
    </StyledContainer>
  )
}

export default MainScreen
