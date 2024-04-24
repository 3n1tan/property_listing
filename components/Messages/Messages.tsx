'use client';
import React, {useState, useEffect, use} from 'react'
import { Spinner } from '@nextui-org/react';
import MessageCard from '../UI/MessageCard/MessageCard';


interface Message {
    _id: string; 
  }

  
const Messages = () => {

    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch('/api/messages');
                if(response.ok) {
                    const data = await response.json();
                    setMessages(data);
                }
            } catch (error) {
                console.error('Error fetching messages')
            } finally {
                setLoading(false);         
            }
        }

        fetchMessages();
        
    }, []);
  return loading ? (<Spinner className='flex justify-center xl:mt-[10rem]' size='lg' color='secondary'/>) : (
    <section className='w-full min-h-[100lvh] lg:max-w-[90rem] lg:mx-auto lg:px-9 px-4 mx-auto'>
    <h1 className='text-2xl font-semibold text-center my-9'>Your Messages</h1>
    {messages.length === 0 ? (
        <p className='text-center'>Inbox Empty!!!</p>
    ):(
        messages.map((message) => {
            return  <MessageCard key={message._id} message={message} />
        })
    )}
    </section>
  )
}

export default Messages