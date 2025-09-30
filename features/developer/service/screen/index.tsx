import React from 'react'
import { FormCreateService } from '../components'

interface Props {

}

const ServiceScreen: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div>
      <FormCreateService />
    </div>
  )
}

export default React.memo<Props>(ServiceScreen)
