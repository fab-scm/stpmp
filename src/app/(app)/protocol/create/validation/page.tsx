import { Separator } from "@/components/ui/separator";
import { ValidationForm } from "@/components/validation-form";


export default function ValidationFormPage() {
  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div>
        <div>
          <h3 className="text-lg font-medium">Validation</h3>
          <p className="text-sm text-muted-foreground">
            Here you provide information how you validated your model.
          </p>
        </div>
        <Separator className="mt-2 mb-5"/>
        <ValidationForm />
      </div>
    </main>
  );
}
