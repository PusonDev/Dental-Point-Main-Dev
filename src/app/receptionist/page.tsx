"use client";

import Link from "next/link";

export default function ReceptionistHomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">Reception Desk</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/receptionist/entry" className="card hover:shadow-lg py-8 text-center">
          <span className="text-3xl">✏️</span>
          <p className="font-semibold text-primary mt-2">Patient Entry</p>
        </Link>
        <Link href="/receptionist/appointments" className="card hover:shadow-lg py-8 text-center">
          <span className="text-3xl">📅</span>
          <p className="font-semibold text-primary mt-2">Appointments</p>
        </Link>
      </div>
    </div>
  );
}
