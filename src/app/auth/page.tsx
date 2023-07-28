import AuthForm from './components/AuthForm';

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-pallete flex flex-col justify-center items-center">
      <div>
        <h2 className="mt-6 text-center text-4xl font-extrabold text-black">
          Sign in to your account
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
