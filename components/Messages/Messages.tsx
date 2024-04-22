'use client';
import React, {useState, useEffect, use} from 'react'
import { Spinner } from '@nextui-org/react';

const Messages = () => {

    const [messages, setMessages] = useState([]);
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
  return (
    <div>Messages</div>
  )
}

export default Messages