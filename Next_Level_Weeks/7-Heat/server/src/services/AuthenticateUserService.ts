import axios from 'axios';
import { sign } from 'jsonwebtoken';
import prismaClient from '../../prisma';

interface IAccessTokenResponse {
  access_token: string;
}

interface IUserResponse {
  id: number;
  avatar_url: string;
  login: string;
  name: string;
}

export function AuthenticateUserService() {
  return {
    async execute(code: string) {
      const url = 'https://github.com/login/oauth/access_token';

      const { data: accessTokenResponse } =
        await axios.post<IAccessTokenResponse>(url, null, {
          params: {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
          },
          headers: {
            accept: 'application/json',
          },
        });

      const response = await axios.get<IUserResponse>(
        'https://api.github.com/user',
        {
          headers: {
            Authorization: `Bearer ${accessTokenResponse.access_token}`,
          },
        },
      );

      const { avatar_url, id, login, name } = response.data;

      let user = await prismaClient.user.findFirst({
        where: {
          github_id: id,
        },
      });

      if (!user)
        user = await prismaClient.user.create({
          data: {
            github_id: id,
            avatar_url,
            login,
            name,
          },
        });

      const token = sign(
        {
          user: {
            name: user.name,
            avatar: user.avatar_url,
            id: user.id,
          },
        },
        process.env.JWT_SECRET,
        {
          subject: user.id,
          expiresIn: '1d',
        },
      );

      return { user, token };
    },
  };
}
