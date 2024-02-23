import { IsString, IsNumber, IsOptional, MaxLength } from "class-validator";

export class CreateFinanceDto {

    @IsString()
    description:string;

    @IsString()
    @MaxLength(5)
    reference:string;

    @IsNumber()
    value:number;

    @IsString()
    @IsOptional()
    status?:string;
    
    @IsNumber()
    @IsOptional()
    housingId?:number


}
