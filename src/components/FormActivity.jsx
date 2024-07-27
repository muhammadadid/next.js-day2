const FromActivity = ({item}) => {
    return (
      <div 
      style={{ backgroundImage: `url(${item.imageUrls})` }}
      className="w-[497px] rounded-7xl shrink-0 flex flex-col items-start justify-end py-10 px-6 box-border  bg-cover bg-no-repeat bg-[top] min-h-[661px] max-w-full">
        <div className="self-stretch flex flex-col items-start justify-start gap-[17px] max-w-full">
          <h3 className="relative self-stretch m-0 font-medium text-inherit font-inherit mq450:text-3xl">
            {item.title}
          </h3>
          <div className="self-stretch flex flex-row items-center justify-start gap-[16px] max-w-full text-5xl font-rubik">
            <img
              className="relative w-6 h-6 overflow-hidden shrink-0"
              loading="lazy"
              alt=""
              src="/images/location.png"
            />
  
            <div className="flex-1 relative inline-block max-w-[calc(100%_-_40px)] mq450:text-lgi">
              {item.address},{item.province}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default FromActivity;
  