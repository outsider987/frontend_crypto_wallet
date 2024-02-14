import { APIResponse, privateApi } from './base';


const subPath = 'user';
const useUserApi = () => {

  const privateAuthApi = privateApi(subPath);

  const POST_USER_CHANGE_NAME = async (userName ) => {
    const resp = await privateAuthApi.post<APIResponse>('changeName', {
        userName 
    });

    return resp;
  }

  const GET_USER_DASHBOARD = async () => {
    const resp = await privateAuthApi.get<APIResponse>('dashboard');
    return resp;
  }

  const GET_STATISTICS = async () => {
    const resp = await privateAuthApi.get<APIResponse>('statistics');
    return resp;
  }

  return { POST_USER_CHANGE_NAME ,GET_USER_DASHBOARD,GET_STATISTICS};
};

export default useUserApi;
