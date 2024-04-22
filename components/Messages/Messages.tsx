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
                    // console.log(data);
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
  return loading ? (<Spinner />) : (
    <>
    {messages.length === 0 ? (
        <h1>No messages</h1>
    ):(
        messages.map((message) => {
            return  <MessageCard key={message._id} message={message} />
        })
    )}
    </>
  )
}

export default Messages