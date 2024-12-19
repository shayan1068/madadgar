import React from 'react'
import { Container, Grid,Text,Button,Image, Group} from '@mantine/core';
import Header from "./../../components/includes/header";
import Footer from "./../../components/includes/footer";
import {links,data} from './../../components/includes/commons';
import Hero_img from "./../../images/health/hero_image.svg";
import Health1 from "./../../images/health/health1.svg";
import Health2 from "./../../images/health/health2.svg";
import "./../../css/style.css";
import { Link, NavLink } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
  

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 2000, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});
function health() {
  return (
    <Container fluid className='root'>
        <Header links={links} />
        <Grid className='jobpage-row mt-2'>
            <Grid className="job-col">
                <Grid.Col lg={12} md={12} sm={12} >
                    <Group>
                        <NavLink to="/medicalReport" className="job-btn"><Button radius="xl" className="job-btn">Medical Report</Button></NavLink>
                        <NavLink to="/findmedicalreport" className="job-btn"><Button radius="xl" className="job-btn">Find Report</Button></NavLink>
                    </Group>
                </Grid.Col>
            </Grid>
            <Group>
            <Grid className="job-row-text">
                    <Grid.Col lg={6} md={6} sm={12}>
                        <Text className="job-banner-text2">Need medical help which you can not afford 
                        <br/> OR <br/>
                                Want to help someone who needs medical help.
                                Get started by clicking on the button.
                        </Text>
                    </Grid.Col>
                    <Grid.Col lg={6} md={6} sm={12}>
                        <Image src={Hero_img}  alt="banner image of jobs"/>
                    </Grid.Col>
                </Grid>  
            </Group>
            <Grid>
        </Grid>
        </Grid>
            <Container className="container-area"> 
                <Text className="container-text"><h3>Help to offer Treatment and Help to get.</h3></Text>
                <Grid>
                    <Grid.Col lg={6} md={6} sm={12} className="container-offer" data-aos="fade-right">
                        <Text className="container-text-offer">Offer your help to someone in need of medical treatment by clicking on<br/>
                                <span className="text-black fw-bold"> Find Report Button</span></Text>
                                <NavLink to="/medicalReport" className="job-btn"><Button radius="xl" className="offer-btn">Find Report</Button></NavLink>
                    </Grid.Col>
                    <Grid.Col lg={6} md={6} sm={12} data-aos="fade-left">
                        <Image src={Health1} alt="job offer image" className="img img-fluid w-75"/>
                    </Grid.Col>
                </Grid>
                <Grid className="mt-5 offer-img">
                    <Grid.Col lg={6} md={6} sm={12} className="img-padd" data-aos="fade-right">
                        <Image src={Health2} alt="job offer image" className="img img-fluid w-100"/>
                    </Grid.Col>
                    <Grid.Col lg={6} md={6} sm={12} className="container-offer2" data-aos="fade-left">
                        <Text className="container-text-offer">Need medical help then make your medical report by clicking on <br/>
                            <span className="text-black fw-bold"> Medical Report Button</span></Text>
                        <NavLink to="/findmedicalreport"><Button radius="xl" className="offer-btn">Medical Report</Button></NavLink>
                    </Grid.Col>
                </Grid>
            </Container>
        
        <Footer data={data} />
    </Container>
  )
}

export default health