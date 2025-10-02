import React from 'react'
import { Sample } from '../components'

interface Props {

}

const DashboardScreen: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div>
      <Sample />
    </div>
  )
}

export default React.memo<Props>(DashboardScreen)
