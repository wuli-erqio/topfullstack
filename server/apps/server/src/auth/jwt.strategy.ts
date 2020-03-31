import { Strategy, StrategyOptions, ExtractJwt} from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { InjectModel } from 'nestjs-typegoose'
import { User } from '@libs/db/models/user.model'
import { ReturnModelType } from '@typegoose/typegoose'

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User) private userModel: ReturnModelType<typeof User> 
    ) {
      // as明确标记前边的参数
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECERT
    } as StrategyOptions)
  }
  async validate(id) {
    return await this.userModel.findById(id)
  }
}