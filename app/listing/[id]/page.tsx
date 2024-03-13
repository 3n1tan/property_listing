'use client'
import React, { FC, useState, useEffect } from 'react'

interface SingleListProps {
    params: {
        id: string
    }
}

const SingleListPage: FC<SingleListProps> = ({params}) => {
  const [listing, setListing] = useState(null)

  useEffect(() => {
    const fetchListing = async (params: {id: string}) => {
      const res = await fetch (`${process.env.NEXT_PUBLIC_API_DOMAIN}/listing/${params.id}`);
      if(!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      const result = await res.json();
      setListing(result)
    }

    fetchListing(params).catch((e) => {
      console.error("An error occurred while fetching the data: ", e)
    })

  }, [params])
    
  return (
    <div>
        {params.id}
    </div>
  )
}

export default SingleListPage