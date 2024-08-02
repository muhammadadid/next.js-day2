import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { useRouter } from 'next/router';
import 'primereact/resources/themes/saga-blue/theme.css';  // Change theme as needed
import 'primereact/resources/primereact.min.css';


const SideBar = () => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const handleHome =() => {
    router.push("/");
  }
  return (
    <div className="flex card justify-content-center">
    <Sidebar className='bg-khaki-100 bg-opacity-90 w-60' visible={visible} onHide={() => setVisible(false)}>
    <div className="flex flex-row items-center justify-start mb-12 ml-4">
        <b className="relative text-3xl  font-bold inline-block min-w-[116px] mq450:text-base mq450:leading-[24px]">
          Infinity Travel
        </b>
      </div>
      <div className="flex flex-col items-start justify-start gap-[64px] text-base ml-4">
        <nav className="m-0 flex flex-col items-start justify-start gap-[32px] text-left text-base text-dark font-semibold">
          <div className="flex flex-row items-center justify-start gap-[16px]  hover:bg-lime-200 w-32 p-2 rounded-xl">
            <img
              className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
              loading="lazy"
              alt=""
              src="/images/user.png"
            ></img>

            <a 
            href="/dashboard/ListUser"
            className="relative no-underline text-dark font-semibold inline-block min-w-[90px]">
              User
            </a>
          </div>
          <div className="flex flex-row items-center justify-start gap-[16px] hover:bg-lime-200 w-32 p-2 rounded-xl">
            <img
              className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
              loading="lazy"
              alt=""
              src="/images/image.png"
            ></img>

            <div className="relative  inline-block min-w-[45px] ">
              <a
              className='font-semibold no-underline text-dark'
              href="/dashboard/Banner">Banner</a>
            </div>
          </div>
          <div className="flex flex-row items-center justify-start gap-[15px] hover:bg-lime-200 w-32 p-2 rounded-xl">
            <img
              className="h-6 w-6 relative min-h-[24px]"
              loading="lazy"
              alt=""
              src="/images/discount.png"
            ></img>

            <div className="relative tracking-[0.5px] leading-[150%] inline-block min-w-[91px]">
              <a 
              className='font-semibold no-underline text-dark'
              href="/dashboard/Promo">Promo</a>
            </div>
          </div>
          <div className="flex flex-row items-center justify-start gap-[15px] hover:bg-lime-200 w-32 p-2 rounded-xl">
            <img
              className="h-6 w-6 relative min-h-[24px]"
              loading="lazy"
              alt=""
              src="/images/tag.png"
            ></img>

            <div className="relative tracking-[0.5px] leading-[150%] inline-block min-w-[56px]">
              <a 
              className='font-semibold no-underline text-dark'
              href="/dashboard/Category">Category</a>
            </div>
          </div>
          <div className="flex flex-row items-center justify-start gap-[16px] hover:bg-lime-200 w-32 p-2 rounded-xl">
            <img
              className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
              loading="lazy"
              alt=""
              src="/images/ticketflight.png"
            ></img>

            <div className="relative tracking-[0.5px] leading-[150%] inline-block min-w-[77px]">
              <a 
              className='font-semibold no-underline text-dark'
              href="/dashboard/actifity/Actifity">Actifity</a>
            </div>
          </div>
          <div 
          onClick={handleHome}
          className="flex flex-row items-center justify-start gap-[16px] cursor-pointer hover:bg-lime-200 w-32 p-2 rounded-xl">
            <img
              className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
              loading="lazy"
              alt=""
              src="/images/rumah.png"
            ></img>

            <div className="relative tracking-[0.5px] leading-[150%] inline-block min-w-[77px]">
              Home
            </div>
          </div>
        </nav>
      </div>
    </Sidebar>
    <Button className='fixed z-10 rounded-tr-xl rounded-br-xl bg-opacity-40 mt-28 bg-khaki-200'  onClick={() => setVisible(true)}>
      <img src="/images/logo.png" alt="logo" className='w-8 h-8 mq450:' />
      </Button> 
</div>
  );
};

export default SideBar;
