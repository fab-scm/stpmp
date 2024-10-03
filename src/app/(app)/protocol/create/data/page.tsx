import { Separator } from "@/components/ui/separator";
import { DataForm } from "@/components/data-form";


export default function DataFormPage() {
  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div>
        <div>
          <h3 className="text-lg font-medium">Data</h3>
          <p className="text-sm text-muted-foreground">
            Here you provide information about the data your model was trained with.
          </p>
        </div>
        <Separator className="mt-2 mb-5"/>
        <DataForm />
      </div>
    </main>
  );
}
