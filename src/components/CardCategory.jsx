const CardCategory = ({ item }) => {
    return (
      <div
        style={{ backgroundImage: `url(${item.imageUrl})` }}
        className="w-full relative rounded-[26px] flex flex-col items-start justify-end pt-[539px] px-12 pb-10 box-border  bg-cover bg-no-repeat bg-[top] leading-[normal] tracking-[normal]"
      >
        <section className="self-stretch flex flex-col items-start justify-start gap-[17px] max-w-full text-left text-[28px] text-white font-playfair-display">
          <div className="self-stretch relative font-medium mq450:text-[22px]"></div>
          <div className="self-stretch flex flex-row items-center justify-start gap-[16px] max-w-full text-[24px] font-rubik">
            <img
              className="relative w-6 h-6 overflow-hidden shrink-0"
              loading="lazy"
              alt=""
              src="/images/location.png"
              width={24}
              height={24}
            />
  
            <div className="flex-1 relative inline-block max-w-[calc(100%_-_40px)] mq450:text-[19px]">
              {item.name}
            </div>
          </div>
        </section>
      </div>
    );
  };
  export default CardCategory;
  