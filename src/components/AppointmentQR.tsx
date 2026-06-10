import { QRCodeSVG } from 'qrcode.react';

const AppointmentQR: React.FC = () => {
const qrCodeLink = "https://drjerin.vercel.app";

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
