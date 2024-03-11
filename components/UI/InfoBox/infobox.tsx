import { Button } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'


interface UIProps {
    title: string,
    description: string,
    button_title: string,
    link: string
    backgroundColor: string

}
const InfoBox = ({title, description, button_title, link, backgroundColor}: UIProps) => {
  return (
    <div className={`${backgroundColor} lg:w-[40rem] rounded-xl`}>
        <div className='px-5 pt-5 pb-4 space-y-3 text-black'>
            <h1 className='text-xl font-bold'>{title}</h1>
            <p>{description}</p>
            <Button className='bg-black text-white'>
                <Link href={link}>
                    {button_title}
                </Link>
            </Button>

        </div>
    </div>
  )
}

export default InfoBox