import { UserModel } from 'models/User.model';
import { RequestMethod } from '../utils/constant/RequestMethod';
import { requestJson } from '../utils/helpers/api';

// Auth
export function signup(body: UserModel) {
  return requestJson<UserModel>('/signup', RequestMethod.Post, body);
}

export function signin(body: UserModel) {
  return requestJson<UserModel>('/login', RequestMethod.Post, body);
}
