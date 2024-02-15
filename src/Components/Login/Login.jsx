import { useAuth0 } from "@auth0/auth0-react";

export const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <button
        className='rounded-md border-2 border-blue-600 px-6 py-1 font-medium text-blue-600 transition-colors hover:bg-blue-600 hover:text-white'
        onClick={() => loginWithRedirect()}>
        Login
      </button>
    </>
  );
};
