import React from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Dropdown, type MenuProps, Modal } from 'antd';
import { theme } from 'antd';
import { FaArrowRightFromBracket, FaRegUser } from 'react-icons/fa6';
import { useRouter } from 'next/router';

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
  const router = useRouter()

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
          onOk: () => router.replace('/auth/login'),
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
            src='https://cdn.discordapp.com/attachments/1389220551616368784/1420377799293931652/Sticker_PPG_20_The_Herta_04.png?ex=68db1c28&is=68d9caa8&hm=7f37d7cbd9fe40e414c3e613a70f2ff47bf77b7b9f9d987eb032e171cb8702f2'
            style={{
              backgroundColor: '#fde3cf'
            }}
          />
          <div>
            <h5 className='text-black'><strong>USERNAME</strong></h5>
            <p className='text-black font-light'>ADMIN</p>
          </div>
        </div>
      </Dropdown>
      {contextHolder}
    </nav>
  )
}

export default React.memo<Props>(Header)
