import EditIcon from '@mui/icons-material/Edit';
import { useUserInformation } from '~/hooks/useUserInformation';
import useUserApi from '~/api/user';
import Input from './Input';
import { useEffect, useState } from 'react';
import Button from './Button';
import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from 'js-cookie';
import UserDashboard from './UserDashboard';
import UserStatistics from './UserStatistics';
import { setTokenStorage } from '../utils/storage';

const EditUserName = () => {
  const { userName, email } = useUserInformation();
  const [newName, setNewName] = useState<string>(userName);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { POST_USER_CHANGE_NAME } = useUserApi();

  const onEditUserName = () => {
    setIsEdit(true);
  };
  const onChangeUserName = async () => {
    const res = await POST_USER_CHANGE_NAME(newName);
    if (res.data.success) {
      setTokenStorage(res.data.data);
      setIsEdit(false);
    }
    window.location.reload();
  };

  const onLogout = () => {
    localStorage.removeItem('tokens');
    Cookies.remove('accessToken');
    window.location.reload();
  };

  useEffect(() => {
    setNewName(userName);
  }, [isEdit]);
  return (
    <div>
      {isEdit ? (
        <div>
          <Input value={newName} onChange={(e) => setNewName(e.target.value)} />
          <Button onClick={onChangeUserName}>change</Button>
          <Button onClick={() => setIsEdit(false)}>cancel</Button>
        </div>
      ) : (
        <div className="flex justify-center space-x-3">
          <span className="flex justify-center text-center font-bold text-orange-400">
            userName : {userName}
          </span>
          <div className=" cursor-pointer" onClick={onEditUserName}>
            <EditIcon />
          </div>
          <div
            onClick={onLogout}
            className="flex justify-center space-x-2 cursor-pointer"
          >
            logout
            <LogoutIcon />
          </div>
        </div>
      )}
      <div>email: {email}</div>
      <UserDashboard />
      <UserStatistics />
    </div>
  );
};

export default EditUserName;
