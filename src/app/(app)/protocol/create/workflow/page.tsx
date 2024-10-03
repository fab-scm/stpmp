import { Separator } from "@/components/ui/separator";
import { WorkflowForm } from "@/components/workflow-form";


export default function WorkflowFormPage() {
  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div>
        <div>
          <h3 className="text-lg font-medium">Workflow</h3>
          <p className="text-sm text-muted-foreground">
            Here you provide information about the scientific workflow to derive your model.
          </p>
        </div>
        <Separator className="mt-2 mb-5"/>
        <WorkflowForm />
      </div>
    </main>
  );
}
