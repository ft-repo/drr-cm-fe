import React from 'react'
import { FormCreateRedux } from '../components'

interface Props {

}

const ReduxScreen: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div>
      <FormCreateRedux />
    </div>
  )
}

export default React.memo<Props>(ReduxScreen)
