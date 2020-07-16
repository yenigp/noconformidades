
export interface IUser {
  id?: number;
  name?: string;
  middleName?: string;
  lastName?: string;
  username?: string;
  password?: string;
  avatar?: any;
  email?: string;
  ReferingId?: IUser;
  status?: any;
  lastLogout?: any;
  description?: string;
  address?: string;
  phone?: any;
  token?: string;
  roles?: any[];
}
