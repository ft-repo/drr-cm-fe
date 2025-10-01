import React, { useCallback } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Dropdown, type MenuProps, Modal } from 'antd';
import { theme } from 'antd';
import { FaArrowRightFromBracket, FaRegUser } from 'react-icons/fa6';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { ROLE } from '@/constants';
import { resetCredential } from '@/store/features/authSlice';

interface Props {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}
const Header: React.FC<Props> = (props) => {
  const { collapsed, setCollapsed } = props
  const {
    token: {
      colorBgContainer,
    },
  } = theme.useToken();
  const [modal, contextHolder] = Modal.useModal()
  const { username, role } = useAppSelector(state => state.auth.credential)
  const dispatch = useAppDispatch()

  const signout = useCallback(async () => {
    try {
      await dispatch(resetCredential())
      location.replace(`/api/auth/logout`)
    } catch (error) {
      if (error instanceof Error) {
        modal.error({
          title: 'ผิดพลาด',
          content: `ไม่สามารถดำเนินการต่อได้`,
          okText: 'ยืนยัน',
          onOk: () => Modal.destroyAll()
        })
      } else {
        console.error(error)
      }
    }
  }, [dispatch, modal])

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'จัดการผู้ใช้งาน',
      icon: <FaRegUser />
    },
    {
      key: '2',
      label: 'ออกจากระบบ',
      icon: <FaArrowRightFromBracket />,
      onClick: () => {
        modal.confirm({
          title: 'ยืนยันการออกจากระบบ',
          content: 'คุณต้องการออกจากระบบหรือไม่',
          okText: 'ออกจากระบบ',
          cancelText: 'ยกเลิก',
          onOk: () => signout(),
          onCancel: () => Modal.destroyAll()
        })
      }
    }
  ];

  return (
    <nav
      className='flex items-center justify-between'
      style={{
        padding: 0,
        background: colorBgContainer
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
      <Dropdown
        menu={{ items }}
        className='flex items-center gap-3 p-3 hover:cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out'
      >
        <div>
          <Avatar
            src='/image/profile-img.png'
            style={{
              backgroundColor: '#99a1af'
            }}
          />
          <div>
            <h5 className='text-black'><strong>{username || 'USERNAME'}</strong></h5>
            <p className='text-black font-light'>{ROLE[role as 'ADMIN' | 'USER'] || 'ROLE'}</p>
          </div>
        </div>
      </Dropdown>
      {contextHolder}
    </nav>
  )
}

export default React.memo<Props>(Header)
