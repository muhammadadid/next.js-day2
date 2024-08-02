import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const token = useSelector((state) => state.auth.token);
    const router = useRouter();

    useEffect(() => {
      if (!token) {
        router.push('/Login'); 
      }
    }, [token, router]);

    return token ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

export default withAuth;
