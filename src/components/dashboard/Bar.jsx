import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserDetails } from '../../Redux/slice/userSlice'; // Adjust path if necessary

const Bar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user); // Adjust to match slice name
  const token = useSelector((state) => state.auth.token); // Ensure this is correctly coming from the right slice

  useEffect(() => {
    if (token) {
      dispatch(fetchUserDetails(token));
    }
  }, [token, dispatch]);

  return (
    <div className="box-border flex flex-row items-start justify-end flex-shrink-0 max-w-full px-8 py-0 pt-4 pb-4 bg-[#9EB23B] rounded-xl">
      <div className="flex-1 flex flex-row items-end justify-between py-0 pr-0 pl-px box-border max-w-full gap-[20px] mq375:flex-wrap">
        <div className="flex flex-col items-start justify-start flex-shrink-0">
          <b className="relative font-semibold text-whitesmoke inline-block min-w-[121px] mq450:text-base">
            Hello, {user ? user.name : 'Guest'}
          </b>
          <div className="relative text-sm inline-block min-w-[106px] z-[1] text-whitesmoke">
            Have a nice day
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bar;
