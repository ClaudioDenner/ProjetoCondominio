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





export default function FormLogin(){
    const router = useRouter()
    const { toast } = useToast()
    const [isLoading, setLoading] = useState(false)


    const formSchema = z.object({
        email: z.string().email({message:'Insira um email válido.'}),
        pass: z.string().min(5,{message: 'Insira um password válido.'})
      })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          pass: "",
        },
      })
    

    async function onSubmit(values:z.infer<typeof formSchema>){
        setLoading(true)
        const fetch = await query('auth/login','post', JSON.stringify(values))
        const data = await fetch.data
        if(fetch.statusCode !== 201) {
            toast({
                variant: "destructive",
                title: "Falha ao realizar autenticação",
                description: data.message,
            })
        }
        
        if(fetch.statusCode === 201){
             setCookie('auth', data.token)
             router.refresh()
        }
        
        form.reset()
        setLoading(false)

    }

    
    return(
        <div className="w-2/5 mt-10">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                    control={form.control}
                    name="email"
                    disabled={isLoading}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="user@condominio.com" type="email"{...field}  />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}/>
                    
                    <FormField
                    control={form.control}
                    name="pass"
                    disabled={isLoading}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}/>
                    <Button type="submit" disabled={!form.formState.isDirty || !form.formState.isValid || isLoading}>
                        Login
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    </Button>
                </form>
            </Form>
            
        </div>
    )
}