import '@/app/ui/global.css';
import SideNav from '@/app/ui/dashboard/sidenav';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
        <SideNav />
    
        <body className={'${inter.className} antialiased'}>{children}</body>
    </div>
  );
}