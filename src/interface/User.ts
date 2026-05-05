export interface User {
  _id: string;
  name: {
    firstName: string;
    lastName: string;
  };
  phone: string;
  email: string;
  address: {
    state?: string;
    country: string;
    city?: string;
    street?: string;
    houseNumber: number;
    zip: number;
  };
  isAdmin: boolean;
  createdAt?: string;
  updatedAt?: string;
}
