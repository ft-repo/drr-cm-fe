import React from 'react'

interface Props {

}

const TestScreen: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div>index</div>
  )
}

export default React.memo<Props>(TestScreen)
