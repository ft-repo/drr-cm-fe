import React from 'react'
import { Sample } from '../components'

interface Props {

}

const CctvScreen: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div>
      <Sample />
    </div>
  )
}

export default React.memo<Props>(CctvScreen)
