'use client'; 
import { Button, Input, Textarea } from "@nextui-org/react";
import React from "react";
import { useForm, Controller, FieldValue } from "react-hook-form";
import { useRouter } from "next/navigation";
import { on } from "events";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
  recipient: any;
  listing: any;
};

const MessageForm = ({listing}: any) => {
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      recipient: listing.owner,
      listing: listing._id,
    },
  });

  const router = useRouter();

  const { register, control, handleSubmit, reset } = form;

  const onSubmit = async (data: FormValues) => {
    console.log(data)
  }

  return (
    <section>
      <div>
        <h1>Send Message To Listing Manager</h1>
        <form 
          action=""
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
          <div className="">
            <Input
              type="text"
              defaultValue=""
              label="Name"
              labelPlacement="outside"
              placeholder="Enter Your Name"
              className="text-lg font-semibold"
              size="lg"
              required
              {...register("name")}
            />
          </div>
          <div className="">
            <Input
              type="email"
              defaultValue=""
              label="Email Address"
              labelPlacement="outside"
              placeholder="Enter Your Email Address"
              className="text-lg font-semibold"
              size="lg"
              required
              {...register("email")}
            />
          </div>
          <div className="">
            <Input
              type="text"
              defaultValue=""
              label="Tel Phone"
              labelPlacement="outside"
              placeholder="Enter Your Phone Number"
              className="text-lg font-semibold"
              size="lg"
              {...register("phone")}
            />
          </div>
          <div>
            <Textarea
              label="Message"
              placeholder="Send a message to the listing manager here."
              defaultValue=""
              minRows={8}
              className="mt-[3rem]"
              classNames={{ base: "max-w-full", label: "text-lg font-semibold" }}
              labelPlacement="outside"
              size="lg"
              required
              {...register("message")}
            />
          </div>

          <div className="pt-9 max-w-full flex">
            <Button type="submit" className="flex-grow bg-green-400">Send Message</Button>
          </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default MessageForm;
