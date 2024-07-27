import {  useRouter } from "next/router"
const FormPromo = ({ promo }) => {
  const router = useRouter();
  const toggleClick = () => {
    router.push(`/promo/${promo.id}`);
  }
  const formatToIDR = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };
  return (
    <div className="flex flex-col items-start justify-start max-w-full">
      <img
        className="self-stretch h-[286px] rounded-t-7xl rounded-b-none max-w-full overflow-hidden shrink-0 object-cover "
        loading="lazy"
        alt={promo?.title}
        src={promo?.imageUrl}
      />

      <div className="h-80 self-stretch rounded-t-none rounded-b-7xl  flex flex-col items-start justify-start py-10 pr-0 pl-6 box-border gap-[22px] w-full bg-darkslateblue ">
        <div className="w-[449px] flex flex-col items-start justify-start gap-[8px] max-w-[109%] shrink-0 font-mulish">
          <h3 className="relative self-stretch m-0 font-normal text-white text-19xl mq450:text-3xl">
            {promo?.title}
          </h3>
        </div>
        <div className="w-[389.3px] relative text-lg  inline-block max-w-full text-slate-500 ">
          {promo?.description}
        </div>
        <div className="w-[389.3px] flex flex-row items-center justify-between max-w-full gap-[20px] text-xl mq450:flex-wrap">
          <div className="flex flex-row items-center justify-start gap-[7px]">
            <div className="relative inline-block min-w-[49px] mq450:text-base text-white">
            Savings
            </div>
            <div className="relative text-13xl text-yellowgreen-100 inline-block min-w-[105px] whitespace-nowrap mq800:text-13xl mq450:text-5xl ">
              {formatToIDR(promo?.promo_discount_price)}
            </div>
          </div>
          <button 
          onClick={toggleClick}
          className="cursor-pointer [border:none] py-5 px-10 bg-coral-200 rounded-xl flex flex-row items-center justify-center hover:bg-firebrick-200 bg-greenyellow">
            <div className="relative text-xl uppercase font-rubik text-black text-left inline-block min-w-[79px] mq450:text-base">
              Details
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
export default FormPromo;
