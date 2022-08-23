/** @jsx jsx */
import { jsx, Image } from 'theme-ui';
import { Link } from 'components/link';

export default function Logo({ src, ...rest }) {
  return (
    
    <Link
      path="/"
      sx={{
        variant: 'links.logo',
        height: '40px',
        display: 'flex',
        cursor: 'pointer',
        mr: 15,
      }}
      { ...src }
    >
      <Image src={src} alt="geome7ric logo" />
    </Link>
  );
}
