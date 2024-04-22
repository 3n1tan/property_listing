'use client';
import { Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import React, {useState, useEffect} from "react";
import { toast } from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import { useGlobal } from "@/context/GlobalContext";

const MessageCard = ({ message }: any) => {
    const [isRead, setIsRead] = useState(message.read);
    const [isDeleted, setIsDeleted] = useState(false);

    const { setCount } = useGlobal();

    const handleReadClick = async () => {
        try {
            const response = await fetch(`/api/messages/${message._id}`, {
                method: 'PUT',
            });

            if(response.status === 200) {
                const { read } = await response.json();
                setIsRead(read);
                setCount((prev: number) => read ? prev - 1 : prev + 1);
                if(read) {
                    toast.success('Message marked as read');               
                }
                else {
                    toast.success('Message marked as unread');
                }
            }
        } catch (error) {
            console.log(error);
            toast.error('Error marking message as read');
        }
    }

    const handleDeleteClick = async () => { 
      const confirmed = window.confirm(
        "Are you sure you want to delete this message?"
      );
      if (!confirmed) return;
        try {
            const response = await fetch(`/api/messages/${message._id}`, {
                method: 'DELETE',
            });

            if(response.status === 200) {
                setIsDeleted(true);
                toast.success('Message deleted successfully');
            }
        } catch (error) {
            console.log(error);
            toast.error('Error deleting message');
        }
    }

    if(isDeleted) {
        return null;
    }
  return (
    <>
      <Card className="lg:mt-9 lg:max-w-[50rem] max-w-fit mx-auto">
        <CardHeader>
            {!isRead && (
                <div className="absolute top-2 right-2 bg-yellow-400 text-white px-2 py-1 rounded-md">New Message</div>
            )}
          <h2 className="font-semibold text-lg">Property Inquiry: </h2>
          <span className="italic text-red-400 lg:ml-3 font-semibold">
            {message.listing.name}
          </span>
        </CardHeader>
        <CardBody>
          <ul className="list-none">
            <li className="mb-9">
              <p>{message.message}</p>
            </li>

            <li className="">
              <strong className="inline">From:</strong>
              <span className=""> {message.sender.username}</span>
            </li>

            <li>
              <a href={`mailto:${message.email}`}>
                <strong className="inline">Reply Email:</strong> {message.email}
              </a>
            </li>

            <li>
              <a href={`tel:${message.phone}`}>
                <strong className="inline">Reply Phone:</strong> {message.phone}
              </a>
            </li>

            <li>
              <strong className="inline">Received:</strong>{" "}
              {new Date(message.createdAt).toUTCString()}
            </li>
          </ul>
        </CardBody>
        <CardFooter className="gap-9">
            <Button className="bg-red-500 text-white rounded-md p-2" onPress={handleDeleteClick}>
                <DeleteIcon />
                Delete          
            </Button>
            <Button className={`${isRead ? 'bg-gray-300 text-black' : 'bg-blue-500 text-white'} rounded-md p-2`} onClick={handleReadClick}>
                <MarkAsUnreadIcon />
                {isRead ? 'Mark as New' : 'Mark as Read'}
            </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default MessageCard;
