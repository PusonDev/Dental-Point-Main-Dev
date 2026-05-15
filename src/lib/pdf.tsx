import { Document, Page, Text, View, StyleSheet, pdf } from "@react-pdf/renderer";
import type { Visit, Profile } from "@/types";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 11 },
  title: { fontSize: 18, marginBottom: 10, color: "#1E3A8A" },
  subtitle: { fontSize: 12, marginBottom: 20, color: "#666" },
  section: { marginBottom: 12 },
  label: { fontWeight: "bold", marginBottom: 4 },
  row: { marginBottom: 8, paddingBottom: 8, borderBottom: "1px solid #eee" },
});

function VisitHistoryPDF({ profile, visits }: { profile: Profile; visits: Visit[] }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Dr. Jarin&apos;s Dental Point</Text>
        <Text style={styles.subtitle}>Visit History — {profile.full_name}</Text>
        <Text style={styles.section}>Phone: {profile.phone}</Text>
        {visits.map((v) => (
          <View key={v.id} style={styles.row}>
            <Text style={styles.label}>Date: {v.visit_date}</Text>
            {v.chief_complaint && <Text>Complaint: {v.chief_complaint}</Text>}
            {v.treatment_done && <Text>Treatment: {v.treatment_done}</Text>}
            {v.doctor_notes && <Text>Notes: {v.doctor_notes}</Text>}
            {v.prescription && <Text>Prescription: {v.prescription}</Text>}
          </View>
        ))}
      </Page>
    </Document>
  );
}

export async function generateVisitHistoryPdf(profile: Profile, visits: Visit[]) {
  const doc = <VisitHistoryPDF profile={profile} visits={visits} />;
  const blob = await pdf(doc).toBlob();
  return blob;
}
