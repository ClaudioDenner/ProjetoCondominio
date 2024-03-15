import { number, string } from "zod";

export interface IPeoples{
    id: number;
    full_name: string;
    cpf: string;
    type: string;
    pathDocument: string;
    housingId: number;
    timestamp_col: string;
}