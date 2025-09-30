import React from 'react'
import { FormCreatePage } from '../components'

interface Props {

}

const PageScreen: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div>
      <FormCreatePage />
    </div>
  )
}

export default React.memo<Props>(PageScreen)
