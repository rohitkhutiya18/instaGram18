import { Transform } from "class-transformer";
import { IsEmail, IsString } from "class-validator";

export class CreateForgetPasswordDto {
    @Transform(({value})=>value.trim)

    @IsEmail()
    @IsString()
    email!:string;

    
}
