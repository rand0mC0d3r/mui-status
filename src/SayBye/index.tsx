import React, { useEffect } from 'react'

const SayBye = ({ name }: { name: string }): JSX.Element => {

  useEffect(() => {
    console.log("test effect")
  } , [])

  return <div>Hey {name}, ciao</div>
}

export default SayBye
