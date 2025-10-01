import { useAppDispatch } from '@/lib/hooks';
import { setLoading } from '@/store/features/layoutSlice';
import { Button, Checkbox, Col, Input, Modal, Row, Select } from 'antd';
import React, { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'

interface Props {

}

interface FieldType {
  main_name: string;
  sub_name: string;
  role: string | null;
  has_sub: boolean;
}

const FormCreateModule: React.FC<Props> = (props) => {
  const { } = props
  const dispatch = useAppDispatch()
  const [modal, contextHolder] = Modal.useModal()

  const form = useForm<FieldType>({
    defaultValues: {
      main_name: '',
      sub_name: '',
      role: null,
      has_sub: false
    }
  })

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors }
  } = form

  const onSubmit = useCallback(async (value: FieldType) => {
    dispatch(setLoading(true))
    try {
      const api = await fetch('/api/create/module', {
        method: 'POST',
        body: JSON.stringify(value),
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
          content: response.response || 'Internal Server Error',
          okText: 'ยืนยัน',
          onOk: () => Modal.destroyAll()
        })
      }
    } catch (error) {
      if (error instanceof Error) {
        modal.error({
          title: 'ผิดพลาด',
          content: error.message || 'Internal Server Error',
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
                required: 'กรุณาระบุชื่อ Module หลัก'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ชื่อ Module หลัก <span className='text-red-500'>*</span></label>
                    <Input
                      {...field}
                      name={field.name}
                      placeholder='กรุณาระบุชื่อ Module หลัก'
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
          {watch('has_sub') &&
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <Controller
                name='sub_name'
                control={control}
                rules={{
                  required: 'กรุณาระบุชื่อ Module ย่อย'
                }}
                render={({ field }) => {
                  return (
                    <fieldset>
                      <label>ชื่อ Module ย่อย <span className='text-red-500'>*</span></label>
                      <Input
                        {...field}
                        name={field.name}
                        placeholder='กรุณาระบุชื่อ Module ย่อย'
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
          }
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Controller
              name='role'
              control={control}
              rules={{
                required: 'กรุณาเลือก Role'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>Role <span className='text-red-500'>*</span></label>
                    <Select
                      {...field}
                      allowClear
                      showSearch
                      placeholder='กรุณาเลือก Role'
                      options={[
                        {
                          id: 'USER',
                          name: 'ผู้ใช้งาน'
                        },
                        {
                          id: 'ADMIN',
                          name: 'ผู้ดูแลระบบ'
                        },
                        {
                          id: 'DEVELOPER',
                          name: 'ผู้พัฒนา'
                        },
                      ]}
                      fieldNames={{
                        label: 'name',
                        value: 'id'
                      }}
                      filterOption={(input, option) => {
                        return option ? option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false;
                      }}
                      className='w-full'
                      size='large'
                      style={{
                        fontFamily: 'Noto Sans Thai'
                      }}
                    />
                    {!!errors.role &&
                      <p className='text-red-500'>{errors.role.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Controller
              name='has_sub'
              control={control}
              render={({ field }) => {
                return (
                  <Checkbox
                    {...field}
                    name={field.name}
                    onChange={(e) => {
                      field.onChange(e)
                      setValue('sub_name', '')
                    }}
                  >
                    มี Module ย่อย
                  </Checkbox>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Button
              htmlType='submit'
              type='primary'
            >
              สร้าง Module
            </Button>
          </Col>
        </Row>
      </form>
      {contextHolder}
    </>
  )
}

export default React.memo<Props>(FormCreateModule)
