import React, { useEffect, useRef } from 'react'

interface Props {

}

const IndexPage: React.FC<Props> = (props) => {
  const { } = props
  const navigateRef = useRef<boolean>(false)


  useEffect(() => {
    if (navigateRef.current) return
    // SET REF
    navigateRef.current = true
    window.location.replace('/auth/login')
  }, [])

  return (
    <></>
  )
}

export default React.memo<Props>(IndexPage)
