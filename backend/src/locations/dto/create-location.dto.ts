import { IsString, IsNumber, IsOptional } from "class-validator";

export class CreateLocationDto {


    @IsString()
    location_name:string;

    @IsString()
    @IsOptional()
    status:string;
}
