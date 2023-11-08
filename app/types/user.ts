export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
};

export type Address = {
  street: string;
  suite: string;
  city: string;
};
