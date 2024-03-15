'use client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "./ui/form"
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useForm } from "react-hook-form"
import { useState, useContext } from "react"
import { Loader2 } from 'lucide-react'
import { useRouter } from "next/navigation"
import { query } from '@/scripts/query'
import { setCookie } from '@/scripts/setCookie'
import { useToast } from './ui/use-toast'
import { Textarea } from "@/components/ui/textarea"

export default function FormChamados(){

    const router = useRouter()
    const { toast } = useToast()
    const [isLoading, setLoading] = useState(false)


    const formSchema = z.object({
        title: z.string().min(5,{message:'O título deve conter no mínimo 5 caracteres'}),
        description: z.string().min(10,{message: 'Descrição muito curta'})
      })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          title: "",
          description: "",
        },
      })
    

    async function onSubmit(values:z.infer<typeof formSchema>){
        setLoading(true)
        const fetch = await query('requests','post', JSON.stringify(values))
        const data = await fetch.data
        if(fetch.statusCode !== 201) {
            toast({
                variant: "destructive",
                title: "Falha ao enviar Chamado",
                description: data.message,
            })
        }
        
        if(fetch.statusCode === 201){
            toast({
                variant: "default",
                title: "Postagem enviada com sucesso!",
                description: data.message,
            })
        }
        
        form.reset()
        setLoading(false)


    }

    
    return(
        <div className="w-full mt-10">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <FormField
                    control={form.control}
                    name="title"
                    disabled={isLoading}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Título</FormLabel>
                            <FormControl>
                                <Input placeholder="" type="text"{...field}  />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}/>
                    
                    <FormField
                    control={form.control}
                    name="description"
                    disabled={isLoading}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descrição</FormLabel>
                            <FormControl>
                                <Textarea {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>

                    <Button type="submit" disabled={!form.formState.isDirty || !form.formState.isValid || isLoading}>
                        Enviar
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    </Button>
                </form>
            </Form>
            
        </div>
    )

}