const Blog = () => {
    return (
        <div className="flex-1 flex flex-col items-start justify-start gap-[100px] max-w-full mq800:gap-[50px] mq450:gap-[25px]">
          <div className="flex flex-col items-start justify-start gap-[29px] max-w-full">
            <div className="flex flex-col items-start justify-start gap-[20px]">
              <h1 className="relative m-0 font-normal text-inherit font-inherit mq800:text-32xl mq450:text-19xl">
                Our Blog
              </h1>
              <div className="w-[153px] h-[3px] relative box-border border-t-[3px] border-solid border-coral-100"></div>
            </div>
            <div className="relative text-5xl font-rubik text-slategray mq450:text-lgi">
              An insight the incredible experience in the world
            </div>
          </div>
          <div className="self-stretch flex flex-row flex-wrap items-center justify-start gap-[32px] max-w-full text-5xl font-rubik mq800:gap-[16px]">
            <img
              className="h-[802px] flex-1 rounded-7xl max-w-full overflow-hidden object-cover min-w-[437px] mq800:min-w-full"
              loading="lazy"
              alt=""
              src="/images/blog.jpg"
              width={437}
              height={802}
            />

            <div className="flex-1 flex flex-col items-start justify-start py-5 px-0 box-border gap-[24px] min-w-[437px] max-w-full mq800:min-w-full">
              <h1 className="m-0 self-stretch relative text-[54px] font-normal font-playfair-display mq800:text-[43px] mq450:text-13xl">
                <p className="m-0">Beautiful Italy</p>
                <p className="m-0">Let’s travel</p>
              </h1>
              <div className="self-stretch relative leading-[52px] mq450:text-lgi mq450:leading-[42px]">
                But I must explain to you how all this mistaken idea of
                denouncing pleasure and praising pain was born and I will give
                you a complete account of the system and expound the actual
                teachings of the great explorer of the truth, the master-
                builder of human happiness. No one rejects, dislike, or avoids
                plasure itself, because it is pleasure, but because those who do
                not know how to pursue pleasure rationally encounter
                consequences that are extremly painful. Nor again is there
                anyone who loves or pursues.
              </div>
            </div>
          </div>
        </div>
    )
}

export default Blog