import Image from 'next/image';
import Link from 'next/link';

export function Brand() {
  return (
    <Link href="/" className="brand-logo" aria-label="El Paraíso Gonzalo home">
      <Image
        src="/brand/el-paraiso-gonzalo-logo.png"
        alt="El Paraíso Gonzalo"
        width={96}
        height={96}
        priority
        className="brand-logo-image"
      />
    </Link>
  );
}
