import {
  ChevronRightIcon,
  HomeIcon,
  MapPinIcon,
  ReceiptIcon,
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
} from "lucide-react";
import React from "react";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";

// Define product data for reuse
const amdProcessors = [
  {
    id: 1,
    name: "AMD Ryzen 9 9950X - 16c/32t @4.3GHz - 5.7GHz",
    price: "Rp 9.000.000",
    image: "/image.png",
  },
  {
    id: 2,
    name: "AMD Ryzen 7 9800X - 16c/32t @4.5GHz - 5.7GHz",
    price: "Rp 9.000.000",
    image: "/image-1.png",
  },
  {
    id: 3,
    name: "AMD Ryzen 5 7950X - 16c/32t @4.5GHz - 5.7GHz",
    price: "Rp 9.000.000",
    image: "/image-2.png",
  },
];

const intelProcessors = [
  {
    id: 1,
    name: "Intel Core i9-14900K",
    price: "Rp 10.000.000",
    image: "/image-5.svg",
  },
  {
    id: 2,
    name: "Intel Core i7-14700K",
    price: "Rp 10.000.000",
    image: "/image-3.svg",
  },
  {
    id: 3,
    name: "Intel Core i5-14500K",
    price: "Rp 10.000.000",
    image: "/image-4.svg",
  },
];

export const IphonePro = (): JSX.Element => {
  return (
    <div className="bg-black flex flex-row justify-center w-full">
      <div className="bg-black overflow-hidden w-[400px] h-[870px] relative">
        {/* Status Bar */}
        <div className="absolute w-[400px] h-[50px] top-0 left-0 flex items-center justify-between px-10">
          <div className="[font-family:'SF_Pro_Display-Semibold',Helvetica] font-normal text-white text-lg text-center tracking-[-0.36px] leading-[18px]">
            19:02
          </div>
          <div className="flex items-center gap-2">
            <img
              className="w-[18px] h-[11px]"
              alt="Reception"
              src="/reception.svg"
            />
            <img className="w-[18px] h-[13px]" alt="Wifi" src="/wifi.svg" />
            <div className="relative h-3">
              <img
                className="w-5 h-[9px] absolute top-0.5 left-0.5"
                alt="Fill"
                src="/fill.svg"
              />
              <img className="w-[27px] h-3" alt="Outline" src="/outline.svg" />
            </div>
          </div>
        </div>

        {/* SearchIcon Bar and Notification */}
        <div className="absolute w-[400px] h-[60px] top-[50px] left-0 bg-black flex items-center justify-between px-5">
          <div className="relative w-[310px] h-10 bg-[#2e2e2e] rounded-lg border border-solid border-neutral-600 flex items-center">
            <Input
              className="h-10 bg-transparent border-none text-neutral-600 text-lg tracking-[-0.36px] leading-[18px] [font-family:'Public_Sans',Helvetica] pl-[15px]"
              placeholder="SearchIcon product"
            />
            <div className="absolute right-1 w-7 h-[30px] bg-white rounded-[7px] flex items-center justify-center">
              <SearchIcon className="w-[22px] h-[22px] text-black" />
            </div>
          </div>

          <div className="relative w-7 h-8">
            <img
              className="absolute w-6 h-[30px] top-0 left-0"
              alt="Vector"
              src="/vector-3.svg"
            />
            <Badge className="absolute w-4 h-[15px] top-[17px] left-3 bg-[#ff6868] rounded-[9px] p-0 flex items-center justify-center">
              <span className="[font-family:'Public_Sans',Helvetica] font-bold text-black text-xs text-center tracking-[-0.24px] leading-3">
                5
              </span>
            </Badge>
          </div>
        </div>

        {/* Location */}
        <div className="absolute w-[197px] h-5 top-[115px] left-6 flex items-center">
          <MapPinIcon className="w-4 h-5 text-white" />
          <div className="ml-2 [font-family:'Public_Sans',Helvetica] font-normal text-white text-sm tracking-[-0.28px] leading-[14px]">
            Ship to Cibeber
          </div>
        </div>

        {/* Carousel Banner */}
        <div className="absolute w-[360px] h-[125px] top-[145px] left-5 rounded-[7px] overflow-hidden">
          <div className="absolute w-[360px] h-[125px] top-0 left-0 rounded-[7px] [background:linear-gradient(226deg,rgba(255,16,16,1)_0%,rgba(153,9,9,1)_100%)]" />

          {/* Pagination Dots */}
          <div className="absolute w-[110px] h-[15px] top-[105px] left-[245px] bg-[#00000080] rounded-[20px] flex items-center justify-around px-3">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className={`${index === 1 ? "w-4" : "w-[9px]"} h-[9px] bg-[#ffffff57] rounded-[9px]`}
              />
            ))}
          </div>
        </div>

        {/* Off-screen Banners (for carousel effect) */}
        <div className="absolute w-[355px] h-[115px] top-[150px] left-[390px] rounded-[7px] [background:linear-gradient(45deg,rgba(47,255,0,1)_0%,rgba(7,99,0,1)_100%)]" />
        <div className="absolute w-[355px] h-[115px] top-[150px] left-[-345px] rounded-[7px] [background:linear-gradient(55deg,rgba(0,64,255,1)_0%,rgba(60,109,255,1)_100%)]" />

        {/* AMD Processors Section */}
        <div className="absolute top-[294px] left-5 flex items-center">
          <h2 className="[font-family:'Public_Sans',Helvetica] font-bold text-white text-xl tracking-[-0.40px] leading-5">
            New AMD Processors
          </h2>
          <ChevronRightIcon className="w-[7px] h-3 ml-1 text-white" />
        </div>

        <ScrollArea className="absolute w-[380px] h-[195px] top-[325px] left-5">
          <div className="flex space-x-4 pb-4">
            {amdProcessors.map((processor) => (
              <Card
                key={processor.id}
                className="w-[145px] h-[195px] bg-[#2e2e2e] rounded-[7px] border border-solid border-neutral-600 flex-shrink-0"
              >
                <CardContent className="p-1">
                  <img
                    className="w-[135px] h-[135px] object-cover"
                    alt={processor.name}
                    src={processor.image}
                  />
                  <div className="w-[135px] mt-1 [font-family:'Public_Sans',Helvetica] font-normal text-white text-[10px] tracking-[-0.20px] leading-[12.5px]">
                    {processor.name}
                  </div>
                  <div className="mt-1 text-center [font-family:'Public_Sans',Helvetica] font-bold text-white text-[10px] tracking-[-0.20px] leading-[10px]">
                    {processor.price}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Intel Processors Section */}
        <div className="absolute top-[534px] left-5 flex items-center">
          <h2 className="[font-family:'Public_Sans',Helvetica] font-bold text-white text-xl tracking-[-0.40px] leading-5">
            New Intel Processors
          </h2>
          <ChevronRightIcon className="w-[7px] h-3 ml-1 text-white" />
        </div>

        <ScrollArea className="absolute w-[380px] h-[195px] top-[565px] left-5">
          <div className="flex space-x-4 pb-4">
            {intelProcessors.map((processor) => (
              <Card
                key={processor.id}
                className="w-[145px] h-[195px] bg-[#2e2e2e] rounded-[7px] border border-solid border-neutral-600 flex-shrink-0"
              >
                <CardContent className="p-1">
                  <img
                    className="w-[135px] h-[135px] object-cover"
                    alt={processor.name}
                    src={processor.image}
                  />
                  <div className="w-[135px] mt-1 [font-family:'Public_Sans',Helvetica] font-normal text-white text-[10px] tracking-[-0.20px] leading-[12.5px]">
                    {processor.name}
                  </div>
                  <div className="mt-1 text-center [font-family:'Public_Sans',Helvetica] font-bold text-white text-[10px] tracking-[-0.20px] leading-[10px]">
                    {processor.price}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Bottom Navigation */}
        <div className="absolute w-[400px] h-[78px] bottom-0 left-0 bg-black border-t border-[#5c5c5c] flex items-center justify-around">
          <div className="flex flex-col items-center">
            <HomeIcon className="w-9 h-9 text-white" />
            <div className="[font-family:'Inter',Helvetica] font-bold text-white text-[10px] text-center tracking-[-0.20px] mt-1">
              HomeIcon
            </div>
          </div>

          <div className="flex flex-col items-center">
            <ReceiptIcon className="w-6 h-6 text-[#c4c4c4]" />
            <div className="[font-family:'Inter',Helvetica] font-normal text-[#c4c4c4] text-[10px] text-center tracking-[-0.20px] mt-1">
              Transactions
            </div>
          </div>

          <div className="flex flex-col items-center">
            <ShoppingCartIcon className="w-6 h-6 text-[#c4c4c4]" />
            <div className="[font-family:'Inter',Helvetica] font-normal text-[#c4c4c4] text-[10px] text-center tracking-[-0.20px] mt-1">
              Cart
            </div>
          </div>

          <div className="flex flex-col items-center">
            <UserIcon className="w-6 h-6 text-[#c4c4c4]" />
            <div className="[font-family:'Inter',Helvetica] font-normal text-[#c4c4c4] text-[10px] text-center tracking-[-0.20px] mt-1">
              Profile
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
