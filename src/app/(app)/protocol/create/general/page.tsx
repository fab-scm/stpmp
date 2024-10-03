import { Separator } from "@/components/ui/separator";
import { GeneralForm } from "@/components/general-form";


export default function SettingsProfilePage() {
  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div>
        <div>
          <h3 className="text-lg font-medium">General</h3>
          <p className="text-sm text-muted-foreground">
            Here you provide general information about your model.
          </p>
        </div>
        <Separator className="mt-2 mb-5"/>
        <GeneralForm />
      </div>
    </main>
  );
}
