import { Menu, MenuItemProps } from 'antd'
import React, { useCallback, useMemo } from 'react'
import menu from '@/menu';
import Image from 'next/image';
import DPT_LOGO from '@/public/image/dpt-logo.png'
import {
  // USER
  // --- PUT ICON HERE
  // ADMIN
  FaGrip,
  FaVideo,
  FaExplosion,
  FaChartSimple,
  FaTrafficLight,
  FaPersonWalking,
  FaBolt,
  FaTv,
  FaCarTunnel,
  FaTruckFast,
  // DEVELOPER
  FaPaperPlane,
  FaPaperclip,
  FaDatabase,
  FaPlug
} from "react-icons/fa6";
import { useAppSelector } from '@/lib/hooks';

interface Props {
}

const ICON_LIST: any = {
  // USER
  // --- PUT ICON HERE
  // ADMIN
  FaGrip,
  FaVideo,
  FaExplosion,
  FaChartSimple,
  FaTrafficLight,
  FaPersonWalking,
  FaBolt,
  FaTv,
  FaCarTunnel,
  FaTruckFast,
  // DEVELOPER
  FaPaperPlane,
  FaPaperclip,
  FaDatabase,
  FaPlug
}

const Side: React.FC<Props> = (props) => {
  const { } = props
  const { role } = useAppSelector(state => state.auth.credential)

  const Icon = useCallback((iconName: any, { ...props }) => {
    const IconResult = ICON_LIST[iconName]
    if (typeof IconResult !== 'undefined') {
      return <IconResult {...props} />
    }
    return
  }, [])

  const renderMenu = useMemo(() => {
    if (!menu[role as keyof typeof menu]) return []

    return menu[role].map((item: MenuItemProps) => {
      console.log(menu[role].find(item => item))
      if (!item.children) {
        return {
          ...item,
          icon: Icon(item.icon, {}),
        }
      }
      // RETURN
      return {
        ...item,
        icon: Icon(item.icon, {}),
        children: []
      }
    })
  }, [Icon, role])

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
