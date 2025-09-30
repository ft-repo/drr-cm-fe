import { Layout } from '@/components/layout'
import React from 'react'
import TestScreen from '@/features/user/test/screen'
import { wrapper } from '@/lib/store'
import { SessionData, sessionOptions } from '@/lib/ironSession'
import { setCredential } from '@/store/features/authSlice'
import { getIronSession } from 'iron-session'
import { checkAuth, redirectToLogin, sessionToProps } from '@/utils/checkAuth'
import { GetServerSideProps } from 'next'
import type { PageProps, Redirect } from '@/types/page'

interface Props {

}

const TestPage: React.FC<Props> = (props) => {
  const { } = props

  return (
    <Layout>
      <TestScreen />
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => (async (context) => {
  const session = await getIronSession<SessionData>(context.req, context.res, sessionOptions);

  const valid = checkAuth(session.access_token, 'ADMIN')
  if (!valid) {
    return redirectToLogin('/errors')
  }

  store.dispatch(setCredential({
    credential: {
      username: session.username,
      role: session.role,
      access_token: session.access_token
    }
  }));

  return sessionToProps({
    credential: {
      username: session.username,
      role: session.role,
      access_token: session.access_token
    }
  })
}) satisfies GetServerSideProps<PageProps | Redirect>);

export default React.memo<Props>(TestPage)
