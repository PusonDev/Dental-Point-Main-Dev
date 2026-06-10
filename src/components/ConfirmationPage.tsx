import AppointmentQR from './AppointmentQR';

const ConfirmationPage: React.FC = () => {
  return (
    <div className="confirmation-page-container">
      <AppointmentQR data="https://drjerin.vercel.app" />
    </div>
  );
};

export default ConfirmationPage;
