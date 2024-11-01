export type UserType = {
  id: string;
  email: string;
  name: string;
  photoURL: string;
  chats: string[];
};

export type RegisterValues = {
  name: string;
  email: string;
  password: string;
  photo?: string;
};

export type LoginValues = {
  email: string;
  password: string;
};

export type InfoValues = {
  name?: string;
  photo?: any;
};
