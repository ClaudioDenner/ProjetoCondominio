import { IsString, IsNumber } from "class-validator";

export class CreateRequestDto {

    @IsString()
    title:string;

    @IsString()
    description:string;



}
