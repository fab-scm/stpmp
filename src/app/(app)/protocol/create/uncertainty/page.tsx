import { Separator } from "@/components/ui/separator";
import { UncertaintyForm } from "@/components/uncertainty-form";


export default function UncertaintyFormPage() {
  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div>
        <div>
          <h3 className="text-lg font-medium">Uncertainty</h3>
          <p className="text-sm text-muted-foreground">
            Here you provide information about the predition uncertainty of your model.
          </p>
        </div>
        <Separator className="mt-2 mb-5"/>
        <UncertaintyForm />
      </div>
    </main>
  );
}
