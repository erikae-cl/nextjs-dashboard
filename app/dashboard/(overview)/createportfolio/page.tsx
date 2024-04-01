'use client'

import { lusitana } from "@/app/ui/fonts";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetchImpactPortfolios } from "@/app/lib/data";
import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default async function Page() {
  const impactPortfolios =  await fetchImpactPortfolios();
    return(
      <div className = "flex h-full flex-col items-center  gap-2">
        <h1 className = {`${lusitana.className}`}>
          Edit Name
        </h1>
        <Input type="string" id="name" placeholder="Portfolio Name" />
        <div className = 'flex gap-2'>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
          <Button asChild>
            <Link href="/login">Copy Existing Impact Portfolio</Link>
          </Button>
          <Button asChild>
            <Link href="/login">Add Nonprofits</Link>
          </Button>
          <Button asChild>
            <Link href="/login">Save</Link>
          </Button>
          </div>
      </div>
    );
  }