"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AuthButtons() {
  return (
    <>
      <Link href="/login">
        <Button variant="ghost" size="sm">
          Sign in
        </Button>
      </Link>
      <Link href="/register">
        <Button variant="default" size="sm">
          Sign up
        </Button>
      </Link>
    </>
  );
}
