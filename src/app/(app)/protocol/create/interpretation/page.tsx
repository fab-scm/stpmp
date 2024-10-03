import { Separator } from "@/components/ui/separator";
import { InterpretationForm } from "@/components/interpretation-form";


export default function InterpretationFormPage() {
  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div>
        <div>
          <h3 className="text-lg font-medium">Interpretation</h3>
          <p className="text-sm text-muted-foreground">
            Here you provide information about how to interpret the results of you model.
          </p>
        </div>
        <Separator className="mt-2 mb-5"/>
        <InterpretationForm />
      </div>
    </main>
  );
}
