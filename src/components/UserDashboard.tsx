import { useEffect, useState } from 'react';
import useUserApi from '~/api/user';
import moment from 'moment';

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const { GET_USER_DASHBOARD } = useUserApi();

  useEffect(() => {
    GET_USER_DASHBOARD().then((res) => {
      console.log(res.data.data);
      setUsers([...res.data.data]);
    });
  }, []);

  return (
    <div>
      <h1>User Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th className="px-3">User Name </th>
            <th className="px-3">Login Count</th>
            <th className="px-3">Sign-Up Timestamp</th>
            <th className="px-3">Last Session Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="space-x-3">
              <td>{user.userName}</td>
              <td>{user.loginInformation.loginCount}</td>
              <td>
                {moment(user.loginInformation.createdAt).format(
                  'YYYY-MM-DD HH:mm:ss'
                )}
              </td>
              <td>
                {moment(user.loginInformation.updatedAt).format(
                  'YYYY-MM-DD HH:mm:ss'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDashboard;
