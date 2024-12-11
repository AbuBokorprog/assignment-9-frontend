import { jwtDecode } from 'jwt-decode';

export const JwtDecode = (token: string) => {
  const decode = jwtDecode(token);

  return decode;
};
