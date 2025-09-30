import React from 'react'
import { FormCreateModule } from '../components'

interface Props {

}

const ModuleScreen: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div>
      <FormCreateModule />
    </div>
  )
}

export default React.memo<Props>(ModuleScreen)
