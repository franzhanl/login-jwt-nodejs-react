import { Router } from 'express'
import { CreateUserController } from './controllers/user/CreateUserController'
import { DetailUserController } from './controllers/user/DetailUserController'
import { AuthUserController } from './controllers/user/AuthUserController'

//MIDDLEWARE
import { isAuthenticated } from './middlewares/isAuthenticated'

const router = Router()


//USER
router.post('/user/new', new CreateUserController().handle)

router.get('/user', isAuthenticated, new DetailUserController().handle)

//LOGIN
router.post('/session', new AuthUserController().handle)

export { router }