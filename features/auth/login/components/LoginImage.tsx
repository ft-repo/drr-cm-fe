import React from 'react'
import Image from 'next/image'
import LOGIN_IMAGE from '@/public/image/mock-login.jpg'
import DPT_LOGO from '@/public/image/dpt-logo.png'

interface Props {

}

const LoginImage: React.FC<Props> = (props) => {
  const { } = props

  return (
    <figure className='relative hidden lg:block overflow-hidden 2xl:col-span-2'>
      <Image
        src={LOGIN_IMAGE}
        alt='login-image'
        className='object-cover object-center opacity-35 w-full h-full mask-b-from-20% mask-b-to-100%'
      />
      <div className='absolute bottom-10 left-10 hidden lg:flex items-center gap-5 z-20'>
        <Image
          src={DPT_LOGO}
          alt="dpt-logo"
          className='z-10'
          width={80}
          height={80}
        />
        <div className='flex flex-col'>
          <p className='text-2xl font-bold'>กรมทางหลวงชนบท</p>
          <p className='font-extralight'>DEPARTMENT OF RURAL ROAD</p>
        </div>
      </div>
    </figure>
  )
}

export default React.memo<Props>(LoginImage)
