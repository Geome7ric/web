/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Container, Box, Heading, Text, Image, Button } from 'theme-ui';
import BannerImg from 'assets/banner-thumb.png';
import ShapeLeft from 'assets/shape-left.png';
import ShapeRight from 'assets/shape-right.png';
import { Link } from 'react-scroll';

export default function Banner() {
  return (
    <section sx={styles.banner} id="home">
      <Container sx={styles.banner.container}>
        <Box sx={styles.banner.contentBox}>
          <Heading as="h1" variant="heroPrimary" sx={{ marginTop: '40px', 
          fontFamily: 'ProdigySansBold', 
        }}>
            Transforming business with innovation
          </Heading>
          <Text as="p" variant="heroSecondary" sx={{margin: '20px'}}>
            We make products that make your business better and your customers happy, and we do it with a passion, just like you
          </Text>
          {/* <Button variant="dark"  >Contact us</Button> */}
          <Box 
            sx={{
              
              borderRadius: '5px',
              padding: '10px',
              margin: '20px',
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              textAlign: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              cursor: 'pointer',
              }}
          >
            <Link
                activeClass="active"
                to="contact"
                color='primary'
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                sx={{
                  backgroundColor: 'primary',
                  borderRadius: '5px',
                  width: '20%',
                  padding: '5px',
                  margin: '20px',
                }}

              >
                Contact us
              </Link>
          </Box>
        </Box>

        {/* <Box sx={styles.banner.imageBox}>
          <Image src={BannerImg} alt="banner" />
        </Box> */}
      </Container>
    </section>
  );
}

const styles = {
  banner: {
    pt: ['240px', '145px', '155px', '170px', null, null, '180px', '215px'],
    pb: [2, null, 0, null, 2, 0, null, 5],
    height: '100vh',
    position: 'relative',
    zIndex: 2,
    '&::before': {
      position: 'absolute',
      content: '""',
      bottom: 0,
      right: 120,
      height: '100%',
      width: '100%',
      zIndex: -1,
      backgroundImage: `url(${ShapeLeft})`,
      backgroundRepeat: `no-repeat`,
      backgroundPosition: 'bottom left',
      backgroundSize: '36%',
    },
    '&::after': {
      position: 'absolute',
      content: '""',
      bottom: '40px',
      right: 0,
      height: '100%',
      width: '100%',
      zIndex: -1,
      backgroundImage: `url(${ShapeRight})`,
      backgroundRepeat: `no-repeat`,
      backgroundPosition: 'bottom right',
      backgroundSize: '32%',
    },
    container: {
      minHeight: 'inherit',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    contentBox: {
      width: ['100%', '90%', '535px', null, '57%', '60%', '68%', '60%'],
      mx: 'auto',
      textAlign: 'center',
      mb: ['40px', null, null, null, null, 7],
    },
    imageBox: {
      justifyContent: 'center',
      textAlign: 'center',
      display: 'inline-flex',
      height: '200px',
      mb: [0, null, -6, null, null, '-40px', null, -3],
      img: {
        position: 'relative',
        height: [245, 'auto'],
      },
    },
  },
};
