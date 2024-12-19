import { useEffect, useState } from 'react';
import { createStyles, Container, Group, Burger, Paper, Transition, Grid, Text, Menu, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Heroimg from "./../../images/hero_logo.svg";
import { FaSignOutAlt, FaCogs } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import { IoIosNotifications } from "react-icons/io";
import DefaultImg from "./../../images/default.svg";

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',


    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    height: '100%',
    paddingTop: "4rem",
    paddingBottom: "2rem",
    borderBottom: "2px solid #36BB93",
    margin: 0,
  },
  grid_menu: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    marginTop: -110,
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    color: "#36BB93",


    '&:hover': {
      backgroundColor: "white",
      color: "green",
    },
    '&:active': {
      backgroundColor: "green",
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },

  },
  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
  hero_img: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    background: '#36BB93',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    [theme.fn.smallerThan('sm')]: {
      display: "none",
    },
  },
  logo_img: {
    width: '100px',
    [theme.fn.smallerThan('sm')]: {
      display: "none",
    },
  },
  profile_img: {
    width: '100px',
    [theme.fn.largerThan('sm')]: {
      display: "none",
    },
    [theme.fn.smallerThan('sm')]: {
      display: "block",
    },
  }


}));


interface HeaderResponsiveProps {
  links: { link: string; label: string }[];
}

const PageHeader = ({ links }: HeaderResponsiveProps) => {
  const [opened, { toggle, close }] = useDisclosure(false);


  const { classes, cx } = useStyles();

  const items = links.map((link, index) => (
    <NavLink
      key={link.label}
      to={link.link}
      className={cx(classes.link)}
    >
      {link.label}
    </NavLink>
  ));
  const [userData, setData] = useState<any>(null);
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    window.location.href = "/";
  };
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("user");
  const fetchUserInfo = async () => {
    const response = await fetch(`http://localhost:3000/api/user/${userId}`);
    const data = await response.json();
    setData(data);
  }
  useEffect(() => {
    fetchUserInfo();;
  }, [])
  return (
    <div className={classes.header}>
      <Container>
        <Grid style={{ color: 'white' }} className={classes.grid_menu}>
          <img src={Heroimg} className={classes.logo_img} />
          {token && <Menu shadow="md" width={200}>
            {userData ? <><Menu.Target>
              {userData.user.image.length > 0 ? <img src={userData.user.image[0].url} alt="profile image" className={classes.profile_img} /> : <img src={DefaultImg} alt="profile image" className={classes.profile_img} />}
            </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item >Notification</Menu.Item>
                <Link to="/profile"><Menu.Item>Profile</Menu.Item></Link>
                <Menu.Item onClick={handleLogout}><FaSignOutAlt />Logout</Menu.Item>
                <Link to="/editprofile"><Menu.Item><FaCogs />Settings</Menu.Item></Link>
              </Menu.Dropdown></> : <></>}
          </Menu>}
          <Group style={{ padding: "5px" }} className={classes.links}>
            {items}
            {token && <Link to="" className="notification">
            </Link>}
            {token && <Menu shadow="md" width={200}>
              {userData ? <><Menu.Target>
                {userData.user.image.length > 0 ? <img src={userData.user.image[0].url} alt="profile image" className={classes.hero_img} /> : <img src={DefaultImg} alt="profile image" className={classes.hero_img} />}
              </Menu.Target>
                <Menu.Dropdown>
                  <Link to="/profile"><Menu.Item>Profile</Menu.Item></Link>
                  <Menu.Item onClick={handleLogout}><FaSignOutAlt />Logout</Menu.Item>
                  <Link to="/editprofile"><Menu.Item><FaCogs />Settings</Menu.Item></Link>
                </Menu.Dropdown></> : <></>}
            </Menu>}
          </Group>
          <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
          <Transition transition="pop-top-right" duration={200} mounted={opened}>
            {(styles) => (
              <Paper className={classes.dropdown} withBorder style={styles}>
                {items}
              </Paper>
            )}
          </Transition>

        </Grid>
      </Container>

    </div>
  );
}

export default PageHeader;