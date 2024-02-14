import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthApi from "~/api/auth";
import Button from "~/components/Button";
import Input from "~/components/Input";
import { store } from "~/store";
import { setAlertDialog } from "~/store/global";

const ResetPasswordMail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { POST_PASSWORD_EMAIL } = useAuthApi();

  const onClickResetPassword = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!email) {
      store.dispatch(
        setAlertDialog({
          show: true,
          msg: "pls enter email",
          title: "Error",
        })
      );
      return;
    }
    const res = await POST_PASSWORD_EMAIL(email);
    if (res.data.success) {
      store.dispatch(
        setAlertDialog({
          show: true,
          msg: "pls check your email",
          title: "Success",
        })
      );
      navigate("/");
    }
  };

  return (
    <div className="w-screen">
      <div className="flex justify-center flex-col max-w-xl m-auto">
        <Input
          label="Email"
          type="text"
          placeholder="Email"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <Button onClick={onClickResetPassword}>Reset Password</Button>
      </div>
    </div>
  );
};

export default ResetPasswordMail;
