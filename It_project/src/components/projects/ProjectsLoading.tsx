// components/projects/ProjectsLoading.tsx
export function ProjectsLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-12 h-12 border-4 border-cta border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-copy-secondary">Загрузка проектов...</p>
      </div>
    </div>
  );
}
