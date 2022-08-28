/** @jsx jsx */
import { jsx, Box, Grid, Container, Image, Heading, Text, Flex } from 'theme-ui';
import { Link } from 'react-scroll';

import menuItems from '../header/header.data';
import data from './footer.data';
import FooterLogo from 'assets/logos/geome7ric-main-whiteletters.svg';
export default function Footer() {
  return (
    <footer sx={styles.footer}>
      <Container>
        
        {/* <Grid sx={styles.widgets}>
          {data.widgets.map((item) => (
            <Box
              key={`footer-widget--key${item.id}`}
              sx={styles.widgets.widgetItem}
            >
              <Image src={item.iconSrc} alt={item.altText} />
              <Box sx={styles.widgets.infoWrapper}>
                <Heading as="h3">{item.title}</Heading>
                <Text as="p">{item.description}</Text>
              </Box>
            </Box>
          ))}
        </Grid> */}

        {/* End of footer widgets area */}
        
        <Box sx={styles.footer.footerBottomArea}>
          <Link to="/">
            <Image src={FooterLogo} alt="Logo" sx={{height: '50px'}} />
          </Link>
          <Text as="p" sx={{color: 'text', fontSize: '1rem'}}>
                      Prefabricated products, consulting, <br></br>
            customized products, interventions and more.
          </Text>
          <Text as="p" sx={{
              color: 'text', fontSize: '1rem', 
              textAlign: 'center',
              margin: '1rem 0'
              }}
              >
              © {new Date().getFullYear()} Geome7ric
            </Text>
          {/* <Flex as="nav" sx={styles.footer}>
            {menuItems.map(({ path, label }, i) => (
              <Link
                to={path}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                key={i}
                sx={{
                  color: 'text',
                  fontWeight: 'body',
                  py: 4,
                  cursor: 'pointer',
                  mr: 3,
                  '&.active': {
                    color: 'primary',
                  },
                }}
              >
                {label}
              </Link>
            ))}

            
          </Flex> */}
        </Box>
      </Container>
    </footer>
  );
}

const styles = {
  footer: {
    footerBottomArea: {
      borderTop: '1px solid',
      borderTopColor: 'white',
      display: 'flex',
      pt: [7, null, 8],
      pb: ['40px', null, '100px'],
      textAlign: 'center',
      flexDirection: 'column',
    },
    menus: {
      mt: [3, 4],
      mb: 2,
      nav: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
      },
    },

    link: {
      fontSize: [1, '15px'],
      color: 'text',
      fontWeight: '400',
      mb: 2,
      cursor: 'pointer',
      transition: 'all 0.35s',
      display: 'block',
      textDecoration: 'none',
      lineHeight: [1.5, null, 1.8],
      px: [2, null, 4],
      ':hover': {
        color: 'primary',
      },
    },
    copyright: {
      fontSize: [1, '15px'],
      width: '100%',
    },
  },
  widgets: {
    py: [8, null, 9],
    px: [4, 0, 3, null, 7, 10],
    width: ['100%', '80%', '100%'],
    mx: 'auto',
    gridGap: ['40px 0', null, '45px 30px', null, '60px 30px', '50px 90px'],
    gridTemplateColumns: [
      'repeat(1,1fr)',
      null,
      'repeat(2,1fr)',
      'repeat(3,1fr)',
    ],
    widgetItem: {
      textAlign: 'center',
    },
    infoWrapper: {
      mt: [2, 3, null, 2, 4],
      mb: -1,
      h3: {
        fontSize: [3, null, null, 2, 3, 4],
        color: 'heading_secondary',
        lineHeight: 1.4,
        fontWeight: 700,
        mb: [2, null, null, null, '15px'],
      },

      p: {
        fontSize: [1, '15px'],
        fontWeight: 400,
        lineHeight: 2,
      },
    },
  },
};
