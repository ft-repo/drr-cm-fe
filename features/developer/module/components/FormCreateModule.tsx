import { Button, Checkbox, Col, Input, Row } from 'antd';
import React, { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'

interface Props {

}

interface FieldType {
  main_name: string;
  sub_name: string;
  has_sub: boolean;
}

const FormCreateModule: React.FC<Props> = (props) => {
  const { } = props

  const form = useForm<FieldType>({
    defaultValues: {
      main_name: '',
      sub_name: '',
      has_sub: false
    }
  })

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors }
  } = form

  const onSubmit = useCallback((value: FieldType) => {
    console.log(value)
  }, [])

  return (
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
            name='has_sub'
            control={control}
            render={({ field }) => {
              return (
                <Checkbox
                  {...field}
                  name={field.name}
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
  )
}

export default React.memo<Props>(FormCreateModule)
