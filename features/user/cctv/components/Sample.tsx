import React from 'react'

interface Props {

}

const Sample: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div>index</div>
  )
}

export default React.memo<Props>(Sample)
