import React from 'react'
import type {NextPage} from 'next'
import Fold1 from '../pageComponents/Home/Fold1'
import Fold2 from '../pageComponents/Home/Fold2/Fold2'

const Home: NextPage = () => {
  return (
    <>
      <Fold1 />
      <Fold2 />
    </>
  )
}

export default Home
