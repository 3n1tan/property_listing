import React, { FC, useState, useEffect } from 'react'
import SingleListCard from '@/components/UI/ListCard/singleListCard'
import ListCard from '@/components/UI/ListCard/listCard';
interface SingleListProps {
    params: {
        id: string
    }

}

async function fetchListing(params: {id: string}) {
  const res= await fetch (`http://localhost:3000/api/listing/${params.id}`, {cache: "no-store"});

  if(!res.ok) {
    console.error("failed, error ", res.status)
    throw new Error ("Fetching Listings failed")
  }

  return res.json();
}

const SingleListPage: FC<SingleListProps> = async ({params}) => {
  let singleList = await fetchListing(params);
  console.log(singleList)
  
    
  return (
    <div className='w-full min-h-[100lvh] lg:max-w-[90rem] lg:mx-auto lg:px-9 px-4 ml-[-10px]'>
      <SingleListCard image={singleList.images[0]}/>

       
    </div>
  )
}

export default SingleListPage