import Input from './Input';
import Button from './Button';
import { useState } from 'react';
import useAuthApi from '~/api/auth';
import { store } from '~/store';
import { setToken } from '~/store/auth';

export const LoginInitial = {
  email: '',
  password: ''
};

const Login = () => {
  const [login, setLogin] = useState(LoginInitial);
  const { POST_LOGIN } = useAuthApi();
  const onLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const loginColunm = [
    {
      label: 'Email',
      type: 'text',
      placeholder: 'Email',
      name: 'email',
      value: login.email
    },
    {
      label: 'Password',
      type: 'text',
      placeholder: 'Password',
      name: 'password',
      value: login.password
    }
  ];

  const onClickLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const res = await POST_LOGIN(login);
    if (res.data.success && res.data.data.accessToken) {
      store.dispatch(setToken(res.data.data));
      window.location.reload();
    }
  };

  return (
    <form className="">
      {loginColunm.map((item) => (
        <Input
          key={item.name}
          label={item.label}
          type={item.type}
          placeholder={item.placeholder}
          value={item.value}
          name={item.name}
          onChange={onLoginChange}
        />
      ))}
      <Button onClick={onClickLogin}>Login in</Button>
    </form>
  );
};

export default Login;
