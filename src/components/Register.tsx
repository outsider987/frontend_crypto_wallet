import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import useAuthApi from "~/api/auth";
export const RegisterInitial = {
  email: "",
  userName: "",
  password: "",
  confirmPassword: "",
};
const Register = () => {
  const [register, setRegister] = useState(RegisterInitial);
  const { POST_REGISTER } = useAuthApi();

  const onRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const onClickRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await POST_REGISTER({ ...register });
    if (res.data.success) window.location.reload();
  };

  const registerColunm = [
    {
      label: "Email",
      type: "text",
      placeholder: "Email",
      name: "email",
      value: register.email,
    },
    {
      label: "User name",
      type: "text",
      placeholder: "User name",
      name: "userName",
      value: register.userName,
    },
    {
      label: "Password",
      type: "text",
      placeholder: "Password",
      name: "password",
      value: register.password,
    },
    {
      label: "Confirm password",
      type: "text",
      placeholder: "Confirm password",
      name: "confirmPassword",
      value: register.confirmPassword,
    },
  ];
  return (
    <div>
      <form className="">
        {registerColunm.map((item, index) => (
          <Input
            key={index}
            label={item.label}
            type={item.type}
            name={item.name}
            placeholder={item.placeholder}
            value={item.value}
            onChange={onRegisterChange}
          />
        ))}

        <Button onClick={onClickRegister}>Register</Button>
      </form>
    </div>
  );
};
export default Register;
