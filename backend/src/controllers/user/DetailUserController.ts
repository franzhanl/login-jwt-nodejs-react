import { Request, Response } from 'express'
import { DetailUserService } from '../../services/user/DetailUserService'

class DetailUserController {
    handle(req: Request, res: Response){
        
        const detailUserService = new DetailUserService()

        const user = detailUserService.execute()

        return res.json(user)
    }
}

export { DetailUserController }