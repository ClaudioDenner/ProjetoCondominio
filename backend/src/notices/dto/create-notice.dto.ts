import { IsString, IsNumber } from "class-validator";
export class CreateNoticeDto {

    @IsString()
    title:string;

    @IsString()
    body:string;



}
