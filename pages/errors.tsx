import { ConfigProvider, Modal } from 'antd'
import React, { useEffect, useRef } from 'react'

interface Props {

}

const ErrorPage: React.FC<Props> = (props) => {
  const { } = props
  const [modal, contextHolder] = Modal.useModal()
  const popupRef = useRef<boolean>(false)

  useEffect(() => {
    if (popupRef.current) return
    // SET REF
    popupRef.current = true
    // SHOW POPUP
    modal.error({
      title: 'ไม่สามารถเข้าถึงข้อมูลได้',
      content: 'ไม่สามารถเข้าสู่ระบบได้ กรุณาเข้าสู่ระบบ',
      onOk: () => window.location.replace('/auth/login'),
      okText: 'เข้าสู่ระบบ'
    })
  }, [modal])

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Noto Sans Thai"
        }
      }}
    >
      {contextHolder}
    </ConfigProvider>
  )
}

export default React.memo<Props>(ErrorPage)
