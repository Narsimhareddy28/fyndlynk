import {
  ArrowRightIcon,
  AtSignIcon,
  MapPinIcon,
  PhoneIcon,
} from "lucide-react";
import React from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

export const ContactFormSection = (): JSX.Element => {
  // Contact information data
  const contactInfo = [
    {
      icon: <AtSignIcon className="w-10 h-9" />,
      title: "Email us",
      value: "fyndlynk.4@gmail.com",
    },
    {
      icon: <PhoneIcon className="w-10 h-9" />,
      title: "Call us",
      value: "+91 77992 23744",
    },
    {
      icon: <MapPinIcon className="w-10 h-9" />,
      title: "Location",
      value: "17.414665, 78.5747660",
    },
  ];

  return (
    <section className="relative w-full bg-black py-12 md:py-16">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-8 w-full">
          {/* Left side - Contact information */}
          <div className="w-full lg:w-1/2 flex flex-col space-y-6">
            <div className="mb-2">
              <span className="text-white rounded-[3px] border border-light border-border bg-[#222121] px-3 py-0.5 w-fit text-sm inline-block border-[0.5px]">Contact</span>
            </div>

            <h2 className="font-semibold text-3xl md:text-4xl text-white">Let&apos;s Talk!</h2>
            <p className="font-medium text-neutral-400 text-base ">Send us a message and we will get back<br />to you within 24 hours to arrange a call</p>
            <div className="space-y-3">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center bg-black border border-neutral-700 rounded-lg p-3">
                  <div className="w-7 h-7 bg-[#222121] text-white rounded-md border border-neutral-700 flex items-center justify-center mr-3">
                    {React.cloneElement(info.icon, { className: 'w-5 h-5' })}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white text-sm mb-0.5">{info.title}</p>
                    <p className="font-medium text-neutral-400 text-sm">{info.value}</p>
                  </div>
                  <button className="ml-3 w-9 h-9 flex items-center justify-center rounded-md bg-neutral-900 border border-neutral-700 text-white hover:bg-neutral-800 transition-colors">
                    <ArrowRightIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>     
          </div>
          
          {/* Right side - Contact form */}
          <div className="w-full lg:w-1/2    flex items-start">
            <Card className="bg-black rounded-lg border border-neutral-700 p-3 w-full">
              <CardContent className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    className="bg-neutral-900 rounded-md border border-neutral-700 h-10 px-5  py-6 text-white placeholder:text-white text-sm"
                    placeholder="First Name"
                  />
                  <Input
                    className="bg-neutral-900 rounded-md border border-neutral-700 h-10 px-3 py-6 text-white placeholder:text-white text-sm"
                    placeholder="Last Name"
                  />
                </div>
                <Input
                  className="bg-neutral-900 rounded-md border border-neutral-700 h-10 px-3 py-6 text-white placeholder:text-white w-full text-sm"
                  placeholder="Email"
                />
                <Textarea
                  className="bg-neutral-900 rounded-md border border-neutral-700 min-h-[100px] px-3 py-16 text-white placeholder:text-white w-full resize-none text-sm"
                  placeholder="Official"
                />
                <Button className="w-full h-10 bg-red-600 hover:bg-red-700 rounded-md font-bold text-white text-base">
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
