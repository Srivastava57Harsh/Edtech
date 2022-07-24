import { useRouter } from 'next/router';

const ResetPassword = () => {
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
