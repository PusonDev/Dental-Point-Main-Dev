import { QRCodeSVG } from 'qrcode.react';

interface AppointmentQRProps {
  data: string;
}

const AppointmentQR: React.FC<AppointmentQRProps> = ({ data }) => {

  return (
    <div className="appointment-qr-container">
      <QRCodeSVG
        value={data}
        size={256}
        level="H"
        includeMargin={true}
      />
      <p>Scan this QR code to view your appointment details.</p>
    </div>
  );
};

export default AppointmentQR;
