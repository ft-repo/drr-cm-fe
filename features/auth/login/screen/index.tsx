import React from 'react'
import LoginImage from '../components/LoginImage'
import FormLogin from '../components/FormLogin'
import { useAppSelector } from '@/lib/hooks'

interface Props {

}

const LoginScreen: React.FC<Props> = (props) => {
  const { } = props
  const { credential } = useAppSelector(state => state.auth)

  console.log(credential)

  return (
    <div className='block lg:grid grid-cols-2 2xl:grid-cols-3 w-screen h-screen overflow-hidden'>
      <LoginImage />
      <div className='bg-black h-full'>
        <FormLogin />
      </div>
    </div>
  )
}

export default React.memo<Props>(LoginScreen)
