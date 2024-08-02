const Footer = () => {
    return (
      <footer className="self-stretch bg-gray-400 flex flex-col items-start justify-start py-[140px] px-8 box-border text-left text-5xl text-white font-rubik h-auto w-full mt-[-115px] mq450:py-[91px] ">
    <div className="grid grid-cols-5 gap-[44px] mq450:grid-cols-1">
      <div className="flex flex-col items-start justify-start gap-[16px] text-[14px]">
        <h1 className="relative text-5xl text-white font-rubik">Infinity Travel</h1>
        <div className="relative">
          Copyright © Infinity Travel 2024 All rights reserved
        </div>
      </div>
      <div className="flex flex-col items-start justify-start gap-[16px]">
        <div className="relative font-medium">Menu</div>
        <div className="flex flex-col items-start justify-start gap-[12px] text-lg text-slate-400">
          <a className="[text-decoration:none] relative text-[inherit]">Home</a>
          <a className="[text-decoration:none] relative text-[inherit]">Explore</a>
          <a className="[text-decoration:none] relative text-[inherit]">Travel</a>
          <div className="relative">Blog</div>
          <a className="[text-decoration:none] relative text-[inherit]">Pricing</a>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start gap-[16px]">
        <div className="relative font-medium">Information</div>
        <div className="flex flex-col items-start justify-start gap-[12px] text-lg text-slate-400">
          <div className="relative">Destinations</div>
          <div className="relative">Supports</div>
          <a className="[text-decoration:none] relative text-[inherit] leading-[22px]">Terms & Conditions</a>
          <a className="[text-decoration:none] relative text-[inherit]">Privacy</a>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start gap-[16px]">
        <div className="relative font-medium">Contact Info</div>
        <div className="flex flex-col items-start justify-start gap-[12px] text-lg text-slate-400">
          <div className="relative">08756902345</div>
          <div className="relative">info@infinity.com</div>
          <div className="relative">Surakarta, Jawa Tengah</div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start gap-[16px]">
        <div className="relative font-medium">Follow us on</div>
        <div className="flex flex-row items-center justify-between gap-[20px]">
          <img className="w-8 h-8 overflow-hidden" loading="lazy" alt="Facebook" src="/images/fb.png" />
          <img className="w-8 h-8 overflow-hidden" loading="lazy" alt="Instagram" src="/images/instagram.png" />
          <img className="w-8 h-8 overflow-hidden" loading="lazy" alt="Twitter" src="/images/twitter.png" />
        </div>
      </div>
    </div>
  </footer>
  
    );
  };
  
  export default Footer;
  