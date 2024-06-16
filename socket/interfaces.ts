export type SocketContextType = {
  socket: any | null;
  roomId: string | null;
  room: IRoom | null;
  isConnected: boolean;
};

export interface IInvite {
  from: string;
  roomId: string;
}

export interface IRoom {
  players: string[];
  board: (string | null)[];
  turn: string;
  timer: number;
}
