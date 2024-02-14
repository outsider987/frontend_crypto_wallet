import React from 'react';
const ThridPartySSO = () => {
  const onGoogleClick = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    // const res = await GET_GoogleLogin();
    // console.log(res.data);
    window.open(`${process.env.API_URL}/auth/google`, '_self');
  };
  return (
    <div className="flex w-full flex-col">
      <div className="flex cursor-pointer space-x-1 text-white" onClick={onGoogleClick}>
        <img src={require('~/assets/svg/btn_google_dark_normal_ios.svg')} alt={''} />
        <button>Google Login</button>
      </div>
    </div>
  );
};

export default ThridPartySSO;
