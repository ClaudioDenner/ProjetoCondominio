'use client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "./ui/form"
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useForm } from "react-hook-form"
import { useState } from "react"
import { Loader2 } from 'lucide-react'
import { query } from '@/scripts/query'
import { useToast } from './ui/use-toast'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { getCookie } from '@/scripts/getCookie'

export default function FormPeoples(){

    const { toast } = useToast()
    const [isLoading, setLoading] = useState(false)


    const formSchema = z.object({
        full_name: z.string().min(5,{message:'O nome deve conter no mínimo 5 caracteres'}),
        cpf: z.string().length(11,{message: 'CPF inválido'}),
        type: z.string().min(5,{message: 'Descrição muito curta'}),
        file: z.string(),
      })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          full_name: "",
          cpf: "",
          type: "",
          file: "",
        },
      })
    

    async function onSubmit(values:z.infer<typeof formSchema>){
        setLoading(true)
        
        const auth = await getCookie('auth')
        const input:any = document.getElementById(`file`)
        const file = input?.files[0]

        const formData = new FormData()
        formData.append("full_name", String(values.full_name))
        formData.append("cpf", String(values.cpf))
        formData.append("type", String(values.type))
        formData.append("file", file)
        
        const query:any = await fetch(`${process.env.NEXT_PUBLIC_PATH_BACKEND}peoples`,{
            method:'POST',
            headers: {
                Authorization: `Bearer ${auth?.value}`
              },
            body:formData
        })
        .then((res)=> 
            {
                
                return {statusCode: res.status, data:res.json()}
            }
        )
        .catch((err)=>{ return {statusCode:500, data:"Erro inesperado, tente novamente mais tarde."}})
        
        
        //.then((data)=> data)
        /*
        .then((res)=> {
             {
                if(res.statusCode!== 201){
                    toast({
                        variant: "destructive",
                        title: "Falha ao enviar Chamado",
                        description: res.data
                    })
                }
                if(res.statusCode === 201){
                    toast({
                        variant: "default",
                        title: "Postagem enviada com sucesso!",
                        description: res.data
                    })
                }
             }
        })
        */
        
        console.log(query)
        form.reset()
        setLoading(false)
    }

    
    return(
        <div className="w-full mt-10">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2" encType='multipart/form-data'>
                    <FormField
                    control={form.control}
                    name="full_name"
                    disabled={isLoading}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome Completo</FormLabel>
                            <FormControl>
                                <Input placeholder="" type="text" {...field}  />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}/>
                    
                    <FormField
                    control={form.control}
                    name="cpf"
                    disabled={isLoading}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>CPF</FormLabel>
                            <FormControl>
                                <Input type="text" {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>


                    <FormField
                    control={form.control}
                    name="type"
                    disabled={isLoading}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tipo</FormLabel>
                            <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                                <SelectTrigger className="">
                                    <SelectValue placeholder="Selecione uma opção..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="visitante">Visitante</SelectItem>
                                    <SelectItem value="morador">Morador</SelectItem>
                                </SelectContent>    
                            </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>


                    <FormField
                    control={form.control}
                    name="file"
                    disabled={isLoading}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Documento</FormLabel>
                            <FormControl>
                                <Input id='file' type="file" accept="image/*" {...field}  />
                            </FormControl>  
                            <FormMessage />
                        </FormItem>
                    )}/>

                    <Button type="submit" disabled={isLoading}>
                        Salvar
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    </Button>
                </form>
            </Form>
            
        </div>
    )

}