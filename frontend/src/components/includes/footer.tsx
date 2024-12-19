import { createStyles, Text, Container, ActionIcon, Group } from '@mantine/core';
import Heroimg from './../../images/user-fun/logo c.svg';
import "./../../css/style.css";
import {FaFacebookF,FaTwitter,FaGooglePlus} from 'react-icons/fa';

const useStyles = createStyles((theme) => ({
  footer: {
    paddingTop: theme.spacing.xl * 2,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
  heroImg:{
    width:'130px',
  },

  logo: {
    maxWidth: 200,
    textAlign: 'center',
    [theme.fn.smallerThan('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  description: {
    marginTop: 5,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[0],
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xs,
      textAlign: 'center',
    },
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  groups: {
    display: 'flex',
    flexWrap: 'wrap',

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  wrapper: {
    width: 160,
  },

  link: {
    display: 'block',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[3],
    fontSize: theme.fontSizes.sm,
    paddingTop: 3,
    paddingBottom: 3,

    '&:hover': {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[0],
    },
  },

  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xs / 2,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0]:theme.colors.gray[0],
  },

  afterFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0]:theme.colors.gray[0],
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[0]
    }`,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  social: {
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xs,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0]:theme.colors.gray[0],
    },
  },
  footerHeading:{
    fontSize:"1.5rem",
    fontWeight:"bold",
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0]:theme.colors.gray[0],
    textAlign: 'center',
    lineHeight:"15px",
  },
  footerDescription:{
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0]:theme.colors.gray[0],
  }
}));

interface FooterLinksProps {
  data: {
    title: string;
    links: { label: string; link: string }[];
  }[];
}

export default function FooterLinks({ data }: FooterLinksProps) {
  const { classes } = useStyles();

  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<'a'>
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <div className="footerBackgroundColor">
    <footer className={classes.footer}>
      <Container  className={classes.inner}>
        <div className={classes.logo}>
        <Text className={classes.footerHeading}>MADADGAR</Text>
        <Text className={classes.footerDescription}>APP KI MADAD K ZAMEDAR</Text>
          <img src={Heroimg} alt="madadgar logo" className={classes.heroImg}/>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text color="" size="sm">
          © 2022 Madadgar. All rights reserved.
        </Text>

        <Group spacing={0} className={classes.social} position="right" noWrap>
          <ActionIcon size="lg">
            <FaFacebookF/>
          </ActionIcon>
          <ActionIcon size="lg">
           <FaTwitter/>
          </ActionIcon>
          <ActionIcon size="lg">
           <FaGooglePlus/>
          </ActionIcon>
        </Group>
        
      </Container>
    </footer>
    </div>
  );
}