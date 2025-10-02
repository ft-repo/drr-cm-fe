import { Layout } from '@/components/layout'
import React from 'react'
import PageScreen from '@/features/developer/page/screen'
import { wrapper } from '@/lib/store'
import { SessionData, sessionOptions } from '@/lib/ironSession'
import { AuthState, setCredential } from '@/store/features/authSlice'
import { getIronSession } from 'iron-session'
import { checkAuth, redirectToLogin, sessionToProps } from '@/utils/checkAuth'
import { GetServerSideProps } from 'next'
import type { PageProps, Redirect } from '@/types/page'

interface Props {
  user: AuthState;
}

const PageIndex: React.FC<Props> = (props) => {
  const { user } = props

  return (
    <Layout
      credential={user.credential}
    >
      <PageScreen />
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => (async (context) => {
  const session = await getIronSession<SessionData>(context.req, context.res, sessionOptions);

  const valid = checkAuth(session.access_token, 'DEVELOPER')
  if (!valid) {
    return redirectToLogin('/errors')
  }

  store.dispatch(setCredential({
    credential: {
      username: session.username,
      role: session.role,
      access_token: session.access_token,
      is_logged_in: session.isLoggedIn
    }
  }));

  return sessionToProps({
    credential: {
      username: session.username,
      role: session.role,
      access_token: session.access_token,
      is_logged_in: session.isLoggedIn
    }
  })
}) satisfies GetServerSideProps<PageProps | Redirect>);

export default React.memo<Props>(PageIndex)
