import SideNav from '@/app/ui/dashboard/sidenav';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-col md:overflow-hidden">
      <SideNav />
      <div className=" flex-grow p-2 pl-10 md:overflow-y-auto md:pl-5 ">{children}</div>
    </div>
  );
}