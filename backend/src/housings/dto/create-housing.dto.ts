import { IsNumber, IsString, Length } from "class-validator";

export class CreateHousingDto {
    
    @IsString()
    owner_full_name:string;
    
    @IsString()
    owner_birthday:string;

    @IsString()
    @Length(11)
    owner_cpf:string;

    @IsNumber()
    authId:number

    @IsNumber()
    locationId:number


}
