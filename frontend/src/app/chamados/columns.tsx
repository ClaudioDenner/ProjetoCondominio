"use client"
 
import { ColumnDef } from "@tanstack/react-table"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Requests = {
  id: number,
  title:string,
  description:string,
  status:string,
  housingId: number,
  timestamp_col: string
}
 
export const columns: ColumnDef<Requests>[] = [
  {
    accessorKey: "timestamp_col",
    header: "Data",
    cell:({row})=>{
      const formatted = new Date(row.getValue("timestamp_col")).toLocaleString('pt-BR')
 
      return <div className="text-left text-sm">{formatted}</div>
    }
  },
  {
    accessorKey: "title",
    header: "Título",
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell:({row})=>{
      const description:React.ReactNode = row.getValue("description")

      return <div className="text-left text-sm">{description}</div>
    }
  },
  {
    accessorKey: "status",
    header: "Status",
  }
]