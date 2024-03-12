import React, { FC } from 'react'


interface SingleListProps {
    params: {
        id: string
    }
}

async function fetchListing(params: {id: string}) {
    const res= await fetch (`${process.env.NEXT_PUBLIC_API_DOMAIN}/listing/${params.id}`, {cache: "no-store"});
    if(!res.ok) {
      throw new Error ("Fetching Listings failed")
    }
    return res.json();
  }

const SingleListPage: FC<SingleListProps> = ({params}) => {
    
  return (
    <div>
        {params.id}
    </div>
  )
}

export default SingleListPage