import React, { useCallback } from 'react'
import Image from 'next/image';
import { Button, Input, Modal } from 'antd';
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/router';
import DPT_LOGO from '@/public/image/dpt-logo.png'
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setCredential } from '@/store/features/authSlice';
import { setLoading } from '@/store/features/layoutSlice';

interface Props {

}

interface FieldType {
  username: string;
  password: string;
}

const FormLogin: React.FC<Props> = (props) => {
  const { } = props
  const [modal, contextHolder] = Modal.useModal()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector(state => state.layout)

  const form = useForm<FieldType>({
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const { handleSubmit, control, formState: { errors } } = form

  const onSubmit = useCallback(async (value: FieldType) => {
    dispatch(setLoading(true))
    try {
      // CREATE API REQUEST
      const api = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(value),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      // CHECK RESPONSE
      const response = await api.json()
      if (response.success) {
        // SETUP REDUX
        await dispatch(setCredential({
          credential: {
            username: response.response.username,
            role: response.response.role,
            access_token: response.response.access_token
          }
        }))
        // RETURN SUCCESS
        await modal.success({
          title: 'เข้าสู่ระบบสำเร็จ',
          content: `ชื่อผู้ใช้งาน: ${value.username}`,
          okText: 'ยืนยัน',
          onOk: () => router.replace('/user/test')
        })
      } else {
        modal.error({
          title: 'ไม่สามารถเข้าสู้ระบบได้',
          content: response.response || 'Internal Server Error',
          okText: 'ยืนยัน',
          onOk: () => Modal.destroyAll()
        })
      }
    } catch (error) {
      if (error instanceof Error) {
        modal.error({
          title: 'ไม่สามารถเข้าสู้ระบบได้',
          content: `กรุณากรอกรายละเอียดอีกครั้ง`,
          okText: 'ยืนยัน',
          onOk: () => Modal.destroyAll()
        })
      } else {
        console.error(error)
      }
    } finally {
      dispatch(setLoading(false))
    }
  }, [modal, router, dispatch])

  return (
    <>
      <div className='relative w-full h-full'>
        <div className='h-full w-full max-w-[80%] lg:max-w-[60%] flex flex-col justify-between m-auto py-8'>
          <section className='flex items-center gap-5'>
            <Image
              src={DPT_LOGO}
              alt="dpt-logo"
              className='z-10'
              width={70}
              height={70}
            />
            <div className='flex flex-col'>
              <p className='text-2xl font-bold'>กรมทางหลวงชนบท</p>
              <p className='font-extralight'>DEPARTMENT OF RURAL ROAD</p>
            </div>
          </section>
          <section>
            <div className='mb-10'>
              <h1 className='text-4xl font-semibold'>เข้าสู่ระบบ</h1>
              <p className='text-lg text-[#FFFFFF70]'>DRR Smart Dashboard</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name='username'
                control={control}
                rules={{
                  required: 'กรุณาระบุชื่อผู้ใช้งาน'
                }}
                render={({ field }) => {
                  return (
                    <fieldset>
                      <label>ชื่อผู้ใช้งาน</label>
                      <Input
                        {...field}
                        name={field.name}
                        placeholder='กรุณาระบุชื่อผู้ใช้งาน'
                        size='large'
                        className='w-full !p-2'
                      />
                      {!!errors.username &&
                        <p className='text-red-500'>{errors.username.message}</p>
                      }
                    </fieldset>
                  )
                }}
              />
              <Controller
                name='password'
                control={control}
                rules={{
                  required: 'กรุณาระบุรหัสผ่าน'
                }}
                render={({ field }) => {
                  return (
                    <fieldset className='mt-5'>
                      <label>รหัสผ่าน</label>
                      <Input.Password
                        {...field}
                        name={field.name}
                        placeholder='กรุณาระบุรหัสผ่าน'
                        size='large'
                        className='w-full !p-2'
                      />
                      {!!errors.password &&
                        <p className='text-red-500'>{errors.password.message}</p>
                      }
                    </fieldset>
                  )
                }}
              />
              <div className='mt-5'>
                <Button
                  loading={loading}
                  block
                  htmlType='submit'
                  type='primary'
                  size='large'
                  className='!p-5.5'
                >
                  เข้าสู้ระบบ
                </Button>
              </div>
            </form>
          </section>
          <section className='flex flex-col items-center'>
            <p>มีปัญหาการเข้าสู่ระบบ กรุณาติดต่อ 012-345-6789</p>
            <p className='text-[#FFFFFF50]'>All RIGHTS RESERVED 2026</p>
          </section>
        </div>
      </div>
      {contextHolder}
    </>
  )
}

export default React.memo<Props>(FormLogin)
