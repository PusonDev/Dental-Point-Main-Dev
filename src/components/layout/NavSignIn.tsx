"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const defaultClassName =
  "text-[#f0f6ff]/80 hover:text-white transition-colors";

type NavSignInProps = {
  className?: string;
  onClick?: () => void;
};

export default function NavSignIn({
  className = defaultClassName,
  onClick,
}: NavSignInProps) {
  const { t } = useLanguage();

  return (
    <Link href="/auth/login" className={className} onClick={onClick}>
      {t.nav.signIn}
    </Link>
  );
}
