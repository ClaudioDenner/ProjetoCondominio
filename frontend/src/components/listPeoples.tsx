import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { ItemText } from "@radix-ui/react-select"
import React from "react"
import { IPeoples } from "@/types/IPeoples"

interface Data{
  data:IPeoples[]
}

export function ListPeoples({data}:Data){
    return(
        <Table className="w-full">
        <TableCaption>Lista de Pessoas Cadastradas</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nome Completo</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead className="text-right">Tipo</TableHead>
            <TableHead className="text-right">Documento</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            data?.map((item)=>
            <TableRow key={item.id}>
            <TableCell className="font-medium">{item.full_name}</TableCell>
            <TableCell>{item.cpf}</TableCell>
            <TableCell>{item.type}</TableCell>
            <TableCell className="text-right">{item.pathDocument}</TableCell>
          </TableRow>)
          }
        </TableBody>
      </Table>
    )
}