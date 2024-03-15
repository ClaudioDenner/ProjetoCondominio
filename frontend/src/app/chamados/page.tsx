import { Requests, columns } from "./columns"
import { DataTable } from "@/components/DataTable";
import FormChamados from "@/components/formChamados";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { query } from "@/scripts/query";

async function getData(): Promise<Requests[]> {
  // Fetch data from your API here.
  const data = await (await (await query('requests','GET')).data).query
  return data
}

export default async function Chamados() {

  const response = await getData()
  const data = response === undefined ? [] : response
  
  return (
        <div className="w-full flex h-full items-start justify-center bg-white text-center text-5xl font-bold shadow-md">
          <Tabs defaultValue="list" className="w-5/6">
            <TabsList>
              <TabsTrigger value="list">Lista de Chamados</TabsTrigger>
              <TabsTrigger value="new">Novo Chamado</TabsTrigger>
            </TabsList>
            <TabsContent value="list"><DataTable columns={columns} data={data} /></TabsContent>
            <TabsContent value="new"><FormChamados /></TabsContent>
          </Tabs>
          
        </div>
      
  );
}
