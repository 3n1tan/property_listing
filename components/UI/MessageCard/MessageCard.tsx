import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import React from "react";

const MessageCard = ({ message }: any) => {
  return (
    <>
      <h1 className="lg:text-2xl font-semibold mb-5">Your Messages</h1>
      <Card>
        <CardHeader>
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
              {new Date(message.createdAt).toDateString()}
            </li>
          </ul>
        </CardBody>
        <CardFooter>
          <button>Reply</button>
          <button>Mark as Read</button>
        </CardFooter>
      </Card>
    </>
  );
};

export default MessageCard;
