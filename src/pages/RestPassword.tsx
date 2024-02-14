import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuthApi from '~/api/auth';
import Button from '~/components/Button';
import Input from '~/components/Input';
import { store } from '~/store';
import { setAlertDialog } from '~/store/global';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const location = useLocation();
  const { POST_RESET_PASSWORD } = useAuthApi();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');

  const onClickResetPassword = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      store.dispatch(
        setAlertDialog({
          show: true,
          msg: 'password and confirm password not match',
          title: 'Error'
        })
      );
      return;
    }
    const res = await POST_RESET_PASSWORD(
      { password, confirmPassword, oldPassword },
      token
    );
    if (res.data.success) {
      store.dispatch(
        setAlertDialog({
          show: true,
          msg: 'reset password success',
          title: 'Success'
        })
      );
      navigate('/');
    }
  };

  useEffect(() => {
    if (!token)
      store.dispatch(
        setAlertDialog({ show: true, msg: 'pls msg to server', title: 'Error' })
      );
  }, []);

  return (
    <div className="flex justify-center items-center space-y-2 flex-col m-auto w-screen">
      <h1>Reset Password</h1>
      <Input
        label="Old Password"
        type="password"
        placeholder="Old Password"
        value={oldPassword}
        name="oldPassword"
        onChange={(e) => setOldPassword(e.target.value)}
      ></Input>
      <Input
        label="Password"
        type="password"
        placeholder="Password"
        value={password}
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      ></Input>
      <Input
        label="Confirm Password"
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        name="confirmPassword"
        onChange={(e) => setConfirmPassword(e.target.value)}
      ></Input>

      <Button onClick={onClickResetPassword}>submit</Button>
    </div>
  );
};

export default ResetPassword;
