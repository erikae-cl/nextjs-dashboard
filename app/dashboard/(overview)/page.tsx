import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { RevenueChartSkeleton, 
          LatestInvoicesSkeleton,
          CardsSkeleton 
        } from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/dashboard/cards';
import { Button } from "@/app/ui/button"
import Link from 'next/link';
import clsx from 'clsx';

export default async function Page() {

  return (
    <main>
      <div className ={'flex gap-5'}>
        <h1 className={`${lusitana.className} text-left mb-4 text-xl md:text-2xl mt-4`}>
          Your Impact Portfolios
        </h1>
        <Link
            key={'Create a Portfolio'}
            href={'/dashboard/createportfolio'}
            className="flex h-[50px] w-[142px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3" style={{ border: "1px solid black" }}
          >
            <p className="hidden md:block">{'Create a Portfolio'}</p>
          </Link>
      </div>
      
    </main>
  );
}