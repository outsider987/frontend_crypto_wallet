import Input from "../Input";
const Account = ({ validator }) => {
  return (
    <div className="flex flex-col space-y-5 ">
      <Input
        name="email"
        label="Account"
        className="text-white"
        type="text"
        onChange={validator.noWhiteSpaceChange}
        value={validator.values.email}
        placeholder="Account"
      />
      <span className=" text-orange-500">{validator.errors.email.message}</span>

      <Input
        name="password"
        label="Password"
        className="text-white"
        type="text"
        onChange={validator.noWhiteSpaceChange}
        value={validator.values.password}
        placeholder="Password"
      />
      <span className=" text-orange-500">
        {validator.errors.password.message}
      </span>
    </div>
  );
};

export default Account;
