import { CanActivate, ExecutionContext } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

export class optionalGaurd implements CanActivate{
    constructor(
        private readonly jwtService : JwtService,
        private readonly configService:ConfigService
    ){}
   async canActivate(context: ExecutionContext){
        const req = context.switchToHttp().getRequest();
            // console.log(req)
        const auth = req.headers?.authorization;
     
        if(!auth){
             req.user = undefined
             return true;
        }
        const token = auth.split(' ')[1];
  
        if(!token ){
            req.user = undefined
            return true;
        }

       try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret:`${process.env.accessTokenSecret}`,
      });
    console.log(payload)
      req.user = payload;
    } catch {
      req.user = undefined;
    }
        return true;
    }
}