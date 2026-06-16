"use client";

import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";

type WebsiteQRProps = {
  url?: string;
};

const WebsiteQR: React.FC<WebsiteQRProps> = ({ url = "https://drjerin.vercel.app" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center gap-6"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative"
      >
        {/* Glow effect background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />

        {/* QR Code container */}
        <div className="relative bg-transparent p-2 rounded-2xl shadow-none z-10">
          <QRCodeSVG
            value={url}
            size={220}
            level="H"
            includeMargin={false}
            bgColor="#ffffff"
            fgColor="#000000"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center"
      >
        <p className="text-white/80 font-medium mb-2">Scan to visit our website</p>
        <p className="text-white/50 text-sm">{url}</p>
      </motion.div>
    </motion.div>
  );
};

export default WebsiteQR;
