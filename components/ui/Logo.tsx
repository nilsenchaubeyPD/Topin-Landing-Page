import Image from 'next/image';

type Props = { variant?: 'default' | 'white'; className?: string; priority?: boolean };

/** Topin logo exported from the brand book (Figma "Logo / topin.tech"). Never redraw. */
export function Logo({ variant = 'default', className, priority }: Props) {
  return (
    <Image
      src={variant === 'white' ? '/logo-white.svg' : '/logo.svg'}
      alt="topin.tech"
      width={152}
      height={29}
      priority={priority}
      className={className}
    />
  );
}
