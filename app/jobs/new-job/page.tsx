// app/new-job/page.jsx
import NewJobForm from "@/components/NewJobForm";

export default function NewJobPage() {
  return (
    <div className="min-h-full bg-[#161c25]">
      <main className="pb-10">
        <div className="my-20 container mx-auto">
          <NewJobForm />
        </div>
      </main>
    </div>
  );
}
