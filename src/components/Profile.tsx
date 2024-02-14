import PersonIcon from '@mui/icons-material/Person';
import { useUserInformation } from '~/hooks/useUserInformation';
import EditUserName from './EditUserName';

const Profile = () => {
  const { accessToken } = useUserInformation();

  const onGoogleLogin = () => {
    window.location.href = `${process.env.API_URL}/auth/google`;
  };

  return (
    <div>
      {accessToken ? (
        <div className="">
          <img
            className="w-full rounded-full "
            // src={accessToken.user.image}
          />
          <EditUserName />
        </div>
      ) : (
        <div className="flex  flex-col justify-center items-center">
          <PersonIcon
            className=" rounded-full bg-gray-400"
            style={{ width: '500px', height: '500px', color: 'white' }}
          ></PersonIcon>
          <div
            className=" text-orange-400 font-bold cursor-pointer pt-3"
            onClick={onGoogleLogin}
          >
            Google Login
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
