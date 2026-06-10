import { QRCodeSVG } from "qrcode.react";

type AppointmentQRProps = {
  data: string;
};

const AppointmentQR: React.FC<AppointmentQRProps> = ({ data }) => {
  const qrCodeLink = data || "https://drjerin.vercel.app";

  return (
    <div className="appointment-qr-container">
      <QRCodeSVG
        value={qrCodeLink}
        size={256}
        level="H"
        includeMargin={true}
      />
      <p>Scan this QR code to view your appointment details.</p>
    </div>
  );
};

export default AppointmentQR;
