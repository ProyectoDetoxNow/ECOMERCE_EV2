"use client";
import Image from "next/image";

export default function MediosDePago() {
  return (
    <div className="d-flex gap-3 align-items-center mt-2">
      <Image
        src="https://img.icons8.com/color/48/000000/visa.png"
        alt="Visa"
        width={40}
        height={40}
      />
      <Image
        src="https://img.icons8.com/color/48/000000/mastercard.png"
        alt="Mastercard"
        width={40}
        height={40}
      />
      <Image
        src="https://img.icons8.com/ios-filled/48/000000/paypal.png"
        alt="PayPal"
        width={40}
        height={40}
      />
    </div>
  );
}
