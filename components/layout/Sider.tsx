import { Menu } from 'antd'
import React, { useCallback, useMemo } from 'react'
import menu from '@/menu';
import Image from 'next/image';
import DPT_LOGO from '@/public/image/dpt-logo.png'
import {
  FaGrip,
  FaVideo,
  FaExplosion,
  FaChartSimple,
  FaTrafficLight,
  FaPersonWalking,
  FaBolt,
  FaTv,
  FaCarTunnel,
  FaTruckFast
} from "react-icons/fa6";

interface Props {
}

const ICON_LIST: any = {
  FaGrip,
  FaVideo,
  FaExplosion,
  FaChartSimple,
  FaTrafficLight,
  FaPersonWalking,
  FaBolt,
  FaTv,
  FaCarTunnel,
  FaTruckFast
}

const Side: React.FC<Props> = (props) => {
  const { } = props

  const Icon = useCallback((iconName: any, { ...props }) => {
    const IconResult = ICON_LIST[iconName]
    if (typeof IconResult !== 'undefined') {
      return <IconResult {...props} />
    }
    return
  }, [])

  const renderMenu = useMemo(() => {
    return menu['ADMIN'].map((item) => {
      return {
        ...item,
        icon: Icon(item.icon, {}),
        children: []
      }
    })
  }, [Icon])

  return (
    <>
      <header className='flex items-center justify-center py-3'>
        <Image
          src={DPT_LOGO}
          alt='dpt-logo'
          width={50}
          height={50}
        />
      </header>
      <main>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={renderMenu}
        />
      </main>
    </>
  )
}

export default React.memo<Props>(Side)
