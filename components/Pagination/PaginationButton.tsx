'use client';
import React from 'react'
import { FC } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@nextui-org/react';

interface PaginationButtonProps {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    listingCount: any;
  
}

const PaginationButton: FC<PaginationButtonProps> = (
    {hasNextPage, hasPreviousPage, listingCount}
) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const page = searchParams.get('page') ?? '1';
    const per_page = searchParams.get('per_page') ?? '3';
  return (
    <div className='flex gap-6 self-center justify-center xl:mt-9'>
      {hasPreviousPage ? (
        <Link
          href={`/listing?page=${Number(page) - 1}&per_page=${per_page}`}
          passHref
        >
            <Button className='bg-blue-500 text-white'>
                Prev Page
            </Button>
          {/* <p className='bg-blue-500 text-white'>Prev page</p> */}
        </Link>
      ) : (
        <Button className='bg-gray-300 text-gray-600' disabled>
          Prev page
        </Button>
      )}

      <div className='mt-2'>
        {page} / {Math.ceil(listingCount / Number(per_page))}
      </div>

      {hasNextPage ? (
        <Link
          href={`/listing?page=${Number(page) + 1}&per_page=${per_page}`}
          passHref
        >
            <Button className='bg-blue-500 text-white'>
                Next Page
            </Button>
          {/* <p className='bg-blue-500 text-white'>Next page</p> */}
        </Link>
      ) : (
        <Button className='bg-gray-300 text-gray-600' disabled>
          Next page
        </Button>
      )}
    </div>
  )
}

export default PaginationButton