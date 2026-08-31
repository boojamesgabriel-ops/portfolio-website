import Image from "next/image";

type DigitalHandProps = {
  side: "left" | "right";
};

export default function DigitalHand({ side }: DigitalHandProps) {
  return (
    <div className="digital-hand" data-side={side} aria-hidden="true">
      <Image
        className="digital-hand__image"
        src={side === "left" ? "/images/contact-hand-left.png" : "/images/contact-hand-right.png"}
        alt=""
        fill
        sizes="(min-width: 1200px) 34vw, 56vw"
      />
      <span className="digital-hand__scan" />
      <span className="digital-hand__interference" />
    </div>
  );
}
