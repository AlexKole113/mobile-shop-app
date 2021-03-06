import User from '@/user/User';
import APIService from '../../../mocks/APIService';

const getUserDataFromServer = (dataUser?:{[key:string]:{id:string, [key:string]:any}}) => {
  const dataFromServer = APIService.getUserByID(`${User.wasRegistered()}`);
  let user:{userData:{[key:string]:any}};
  if (dataUser?.data) {
    user = new User({ ...dataUser.data, id: dataUser.data?.id });
  } else if (dataFromServer) {
    user = new User(dataFromServer);
  } else {
    user = new User();
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(user.userData);
    }, 100);
  });
};

export default getUserDataFromServer;
