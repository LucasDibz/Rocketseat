import { Router } from 'express';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateMessageController } from './controllers/CreateMessageController';
import { GetLast3MessagesController } from './controllers/GetLast3MessagesController';
import { ProfileUserController } from './controllers/ProfileUserController';

const router = Router();

const githubClientId = process.env.GITHUB_CLIENT_ID;

router.get('/github', (request, response) => {
  response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${githubClientId}`,
  );
});

router.get('/signin/callback', (request, response) => {
  const { code } = request.query;

  return response.json(code);
});

router.post('/authenticate', AuthenticateUserController().handle);

// Messages
router.post('/messages', ensureAuthenticated, CreateMessageController().handle);
router.get('/messages/last3', GetLast3MessagesController().handle);

// User
router.get('/profile', ensureAuthenticated, ProfileUserController().handle);
export { router };
