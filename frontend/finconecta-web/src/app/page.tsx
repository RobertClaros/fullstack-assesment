import { ThemeSwitcher } from "./(protected)/components/ThemeSwitcher";

export default function Home() {
  return (
    <>
      <div className="absolute top-0 right-0 p-6 z-10">
        <ThemeSwitcher />
      </div>
      <div className="flex flex-col items-center justify-center h-screen text-center space-y-8">
        <h1 className="text-5xl font-bold">🚀 Welcome to Finconecta</h1>
        <p className="text-lg max-w-md">
          Demo platform for the Fullstack Assessment (Next.js + Spring Boot)
        </p>

        <div className="flex gap-4">
          <a href="/auth/signin" className="btn btn-primary btn-lg">
            Log In
          </a>
        </div>
      </div>
    </>
  );
}
