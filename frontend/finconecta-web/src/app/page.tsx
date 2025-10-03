export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-8 bg-base-100">
      <h1 className="text-5xl font-bold">🚀 Welcome to Finconecta</h1>
      <p className="text-lg text-gray-600 max-w-md">
        Demo platform for the Fullstack Assessment (Next.js + Spring Boot)
      </p>

      <div className="flex gap-4">
        <a href="/auth/signin" className="btn btn-primary btn-lg">
          Log In
        </a>
      </div>
    </div>
  );
}
