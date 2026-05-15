import { CLINIC_INFO } from "@/lib/clinic-info";

export default function BuiltBy() {
  return (
    <p className="text-center text-xs text-gray-400 py-2">{CLINIC_INFO.builder}</p>
  );
}
