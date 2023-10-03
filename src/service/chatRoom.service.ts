import { CHAT_ROOM_PATH, PLURAL } from '../utils/constant/ApiPath';
import { RequestMethod } from '../utils/constant/RequestMethod';
import { requestJson } from '../utils/helpers/api';

// chat room
export async function sendMessage(body: RoomModel) {
  return requestJson<RoomModel>(CHAT_ROOM_PATH + '/message', RequestMethod.Post, body);
}

export async function getChatRoom(id: string) {
  return requestJson<RoomModel>(CHAT_ROOM_PATH + '/' + id);
}

export async function getChatRoomByUser(customerId: string) {
  return requestJson<RoomModel>(CHAT_ROOM_PATH, RequestMethod.Post, { customerId });
}

export async function getChatRooms() {
  return requestJson<RoomModel[]>(CHAT_ROOM_PATH + PLURAL);
}

export async function removeChatRoom(id: string) {
  return requestJson<boolean>(CHAT_ROOM_PATH + '/' + id, RequestMethod.Delete);
}