import { useEffect, useState } from 'react';
import useUserApi from '~/api/user';

const UserStatistics = () => {
  const [statistics, setStatistics] = useState({
    usersSignedUp: '',
    usersTodayActive: '',
    usersThisWeekActive: ''
  });
  const { GET_STATISTICS } = useUserApi();

  useEffect(() => {
    GET_STATISTICS().then((res) => {
      console.log(res.data.data);
      setStatistics(res.data.data);
    });
  }, []);

  return (
    <div>
      <h1>User Statistics </h1>
      <table>
        <thead>
          <tr className="space-x-3">
            <th className="px-3">Number of users </th>
            <th className="px-3">
              Number of users with active sessions today.
            </th>
            <th className="px-3">users count last 7 days rolling.</th>
          </tr>
        </thead>
        <tbody>
          <tr className=" space-x-3">
            <td>{statistics.usersSignedUp}</td>
            <td>{statistics.usersTodayActive}</td>
            <td>{statistics.usersThisWeekActive}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserStatistics;
