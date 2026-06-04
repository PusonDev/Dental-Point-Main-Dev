"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const defaultClassName =
  "text-[#f0f6ff]/80 hover:text-white transition-colors";

type NavSignUpProps = {
  className?: string;
  onClick?: () => void;
};

export default function NavSignUp({
  className = defaultClassName,
  onClick,
}: NavSignUpProps) {
  const { t } = useLanguage();

  return (
    <Link href="/auth/signup" className={className} onClick={onClick}>
      {t.nav.signup}
    </Link>
  );
}
