import { IsEmail, IsString, IsStrongPassword, isStrongPassword } from "class-validator";

export class CreateAuthDto {

    @IsString()
    name:string;

    @IsString()
    permission:string;
    
    @IsEmail()
    email:string;

    @IsStrongPassword({minLength: 5, minLowercase: 0, minNumbers: 0, minUppercase: 0, minSymbols: 0})
    pass:string;


}
