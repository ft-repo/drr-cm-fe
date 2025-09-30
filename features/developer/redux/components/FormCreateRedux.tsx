import { useAppDispatch } from '@/lib/hooks';
import { setLoading } from '@/store/features/layoutSlice';
import { Button, Col, Input, Modal, Row } from 'antd';
import React, { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'

interface Props {

}

interface FieldType {
  main_name: string;
}

const FormCreateModule: React.FC<Props> = (props) => {
  const { } = props
  const dispatch = useAppDispatch()
  const [modal, contextHolder] = Modal.useModal()

  const form = useForm<FieldType>({
    defaultValues: {
      main_name: '',
    }
  })

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = form

  const onSubmit = useCallback(async (value: FieldType) => {
    dispatch(setLoading(true))
    try {
      const api = await fetch('/api/create/redux', {
        method: 'POST',
        body: JSON.stringify({
          name: value.main_name
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const response = await api.json()
      if (response.success) {
        modal.success({
          title: 'บันทึกสำเร็จ',
          content: response.response,
          okText: 'ยืนยัน',
          onOk: () => Modal.destroyAll()
        })
      } else {
        modal.error({
          title: 'ผิดพลาด',
          content: response.response,
          okText: 'ยืนยัน',
          onOk: () => Modal.destroyAll()
        })
      }
    } catch (error) {
      if (error instanceof Error) {
        modal.error({
          title: 'ผิดพลาด',
          content: error.message,
          okText: 'ยืนยัน',
          onOk: () => Modal.destroyAll()
        })
      } else {
        console.error(error)
      }
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch, modal])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Controller
              name='main_name'
              control={control}
              rules={{
                required: 'กรุณาระบุชื่อ Redux'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ชื่อ Redux <span className='text-red-500'>*</span></label>
                    <Input
                      {...field}
                      name={field.name}
                      placeholder='กรุณาระบุชื่อ Redux'
                      className='w-full'
                      size='large'
                      style={{
                        fontFamily: 'Noto Sans Thai'
                      }}
                    />
                    {!!errors.main_name &&
                      <p className='text-red-500'>{errors.main_name.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Button
              htmlType='submit'
              type='primary'
            >
              สร้าง Redux
            </Button>
          </Col>
        </Row>
      </form>
      {contextHolder}
    </>
  )
}

export default React.memo<Props>(FormCreateModule)
