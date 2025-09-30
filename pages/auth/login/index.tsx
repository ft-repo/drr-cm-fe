import React from 'react'
import LoginScreen from '@/features/auth/login/screen'
import { ConfigProvider } from 'antd'

interface Props {

}

const LoginIndex: React.FC<Props> = (props) => {
  const { } = props

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Noto Sans Thai"
        }
      }}
    >
      <LoginScreen />
    </ConfigProvider>
  )
}

export default React.memo<Props>(LoginIndex)
