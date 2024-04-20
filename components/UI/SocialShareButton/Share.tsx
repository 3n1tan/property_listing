'use client'
import React from 'react'
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailShareButton,
    FacebookIcon,
    XIcon,
    WhatsappIcon,
    EmailIcon,
  } from 'react-share';


const SocialShareIcon = ({listing}:any) => {
    const listPageUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/listing/${listing._id}`;

  return (
    <>
    <h3 className='text-xl font-bold text-center pt-2 pb-5'>
      Share This Listing:
    </h3>
    <div className='flex lg:gap-5 gap-3 justify-center pb-5'>
      <FacebookShareButton
        url={listPageUrl}
        hashtag={`#${listing.type.replace(/\s/g, '')}ForRent`}
      >
        <FacebookIcon size={40} round={true} />
      </FacebookShareButton>

      <TwitterShareButton
        url={listPageUrl}
        title={listing.name}
        hashtags={[`${listing.type.replace(/\s/g, '')}ForRent`]}
      >
        <XIcon size={40} round={true} />
      </TwitterShareButton>

      <WhatsappShareButton
        url={listPageUrl}
        title={listing.name}
        separator=':: '
      >
        <WhatsappIcon size={40} round={true} />
      </WhatsappShareButton>

      <EmailShareButton
        url={listPageUrl}
        subject={listing.name}
        body={`Check out this property listing: ${listPageUrl}`}
      >
        <EmailIcon size={40} round={true} />
      </EmailShareButton>
    </div>
  </>
    
  )
}

export default SocialShareIcon