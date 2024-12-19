import React from 'react'
import Header from "./../../components/includes/header";
import Footer from "./../../components/includes/footer";
import {links,data} from './../../components/includes/commons';
import { Button, Container, Grid,Text,Image } from '@mantine/core';
import BannerImage from "./../../images/Donation/DonationBanner.svg"
import FirstPic from "./../../images/Donation/donationPicture.svg";
import DonatedPicture from "./../../images/Donation/donatedPicture.svg";
import { NavLink } from 'react-router-dom';
function Donation() {
  return (
   <>
        <Header links={links}/>
        <Container fluid className="root">
            <Grid className='backGroudBanner'>
              <Grid.Col lg={6} md={6} sm={12}>
                 <Text className="bannertext">Help people who need your help by donating things like Clothing, Accessories, Toys, Stationaries etc.</Text>
              </Grid.Col>
              <Grid.Col lg={6} md={6} sm={12}>
                  <img src={BannerImage} alt="banner image" className='img img-fluid w-75'/>
              </Grid.Col>
            </Grid>
            <Container className="container-area"> 
                <Text className="container-text"><h3>Donate things to help needy people</h3></Text>
                
                <Grid className="mt-5 offer-img">
                    <Grid.Col lg={6} md={6} sm={12} className="img-padd" data-aos="fade-right">
                        <Image src={DonatedPicture} alt="job offer image" className="img img-fluid w-100"/>
                    </Grid.Col>
                    <Grid.Col lg={6} md={6} sm={12} className="container-offer2" data-aos="fade-left">
                        <Text className="container-text-offer">Check Donated Items to help needy peoples by clicking on<br/>
                            <span className="text-black fw-bold"> Need Donation Button</span></Text>
                        <NavLink to="/needDonation"><Button radius="xl" className="offer-btn">Need Donation</Button></NavLink>
                    </Grid.Col>
                </Grid>
                <Grid>
                    <Grid.Col lg={6} md={6} sm={12} className="container-offer" data-aos="fade-right">
                        <Text className="container-text-offer">Donate Items to help needy peoples by clicking on <br/>
                                <span className="text-black fw-bold">Donated Items Button</span></Text>
                                <NavLink to="/donationItem" className="job-btn"><Button radius="xl" className="offer-btn">Donated Items</Button></NavLink>
                    </Grid.Col>
                    <Grid.Col lg={6} md={6} sm={12} data-aos="fade-left">
                        <Image src={FirstPic} alt="job offer image" className="img img-fluid w-75"/>
                    </Grid.Col>
                </Grid>
            </Container>
        </Container>
        <Footer data={data}/>
   </>
  )
}

export default Donation