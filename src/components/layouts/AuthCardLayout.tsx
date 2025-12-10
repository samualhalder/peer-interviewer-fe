function AuthCardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[420px] min-h-[420px] shadow-2xl rounded-xl py-7 px-9 flex flex-col bg-gradient-to-br from-blue-700 via-blue-500 to-blue-300">
      {children}
    </div>
  );
}

export default AuthCardLayout;
