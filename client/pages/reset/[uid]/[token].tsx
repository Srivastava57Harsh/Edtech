import { useRouter } from 'next/router';
import { NextPage } from 'next';

const ResetPassword: NextPage = () => {
  const router = useRouter();
  const { uid, token } = router.query;

  return (
    <>
      <p>Post: {uid}</p>
      <p>Post: {token}</p>
    </>
  );
};

export default ResetPassword;
