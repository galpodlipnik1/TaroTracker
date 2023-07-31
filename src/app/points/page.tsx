'use client'

import React, { useEffect } from 'react'
import getActiveGame from '@/actions/getActiveGame'
import { useRouter } from 'next/navigation'

const Points = () => {
  const router = useRouter()
  useEffect(() => {
    getActiveGame().then((res: any) => {
      router.push(`/points/${res.id}`)
    })
  }, [])

  return (
    <div className='w-screen h-screen bg-pallete'>Redirecting...</div>
  )
}

export default Points