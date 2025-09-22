import { Layout } from '@/components/layout'
import React from 'react'
import TestScreen from '@/features/user/test/screen'

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

export default React.memo<Props>(TestPage)
