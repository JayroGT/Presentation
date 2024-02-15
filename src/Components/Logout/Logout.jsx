import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { createUser } from "../../redux/actions";

const Logout = () => {
  const { logout, isAuthenticated, user } = useAuth0();

  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthentication = async () => {
      while (!isAuthenticated) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      if (isAuthenticated) {
        dispatch(createUser(user.email, user.name, user.picture));
      }
    };

    checkAuthentication();
  }, [isAuthenticated, user, dispatch]);

  return (
    <div className='flex items-center justify-center'>
      <div className='h-10 w-10 flex-shrink-0'>
        <img className='h-full w-full rounded-full' src={user.picture} alt='' />
      </div>
      <span className='px-2 font-semibold text-sm text-black'>
        {user.nickname}
      </span>
      <button
        className='rounded-md border-amber-600 px-4 py-1 font-medium hover:font-medium text-amber-600  hover:border-none hover:bg-amber-600 hover:text-white'
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }>
        Logout
      </button>
    </div>
  );
};

export default Logout;
