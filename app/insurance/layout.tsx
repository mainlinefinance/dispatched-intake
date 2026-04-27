import TcpaScripts from "@/components/quote/TcpaScripts";

export default function InsuranceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <TcpaScripts />
    </>
  );
}
