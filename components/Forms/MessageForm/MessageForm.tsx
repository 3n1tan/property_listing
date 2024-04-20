"use client";
import { Button, Input, Textarea } from "@nextui-org/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
  recipient: any;
  listing: any;
};

const MessageForm = ({ listing }: any) => {
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

  const { register, handleSubmit, reset } = form;

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data }),
        }
      );

      if (res.status === 200) {
        toast.success("Message sent successfully");
      } else if (res.status === 400 || res.status === 401) {
        const dataObj = await res.json();
        toast.error(dataObj.message);
      } else {
        toast.error("Error sending form");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error sending form");
    } finally {
      reset();
      router.refresh(); 
    }
  };

  return (
    <section>
      <div>
        <h1 className="text-center lg:text-2xl text-lg mb-[4rem]">Send Message To Listing Manager</h1>
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          // encType="application/json"
        >
          <div className="flex flex-col gap-10">
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
                classNames={{
                  base: "max-w-full",
                  label: "text-lg font-semibold",
                }}
                labelPlacement="outside"
                size="lg"
                required
                {...register("message")}
              />
            </div>

            <div className="pt-9 max-w-full flex">
              <Button type="submit" className="flex-grow bg-green-400">
                Send Message
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default MessageForm;
