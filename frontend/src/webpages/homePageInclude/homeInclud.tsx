import {Grid,Text,Button,Image,Card,Group} from '@mantine/core';
import Loginside from "./../../images/user-fun/loginImage.svg"; 
import Rectangleshap from "./../../images/homepage/Rectangle 66.svg";
import Job from "./../../images/homepage/job.svg";
import Donation from "./../../images/homepage/donation.svg";
import Hospital from "./../../images/homepage/hospital.svg";
import Books from "./../../images/homepage/book.svg";
import Flower from "./../../images/homepage/hand.svg";
import Education from "./../../images/homepage/education.svg";
import Job_img from "./../../images/homepage/job_img.svg";
import Hospital_img from "./../../images/homepage/health.svg";
import Donation_img from "./../../images/homepage/donation_img.svg";
import swal from "sweetalert";

import "./../../css/style.css";
import { Link, useNavigate } from 'react-router-dom';

function Banner() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');
  function HandleJob(){
    if(token==null){
      swal({
        title: "Error",
        text: "you need to login first to access this service", 
        icon: "error",
        dangerMode: true,
        buttons:{},
        timer:3000,
      }).then(()=>{
        navigate("/signin");
      })
    }else{
      navigate("/job")
    }
  }
  function medicalHandler(){
    if(token==null){
      swal({
        title: "Error",
        text: "you need to login first to access this service", 
        icon: "error",
        dangerMode: true,
        buttons:{},
        timer:3000,
      }).then(()=>{
        navigate("/signin");
      })
    }else{
      navigate("/health")
    }
  }
  function DonationHandler(){
    if(token==null){
      swal({
        title: "Error",
        text: "you need to login first to access this service", 
        icon: "error",
        dangerMode: true,
        buttons:{},
        timer:3000,
      }).then(()=>{
        navigate("/signin");
      })
    }else{
      navigate("/donation")
    }
  }
  function EductionHandler(){
    if(token==null){
      swal({
        title: "Error",
        text: "you need to login first to access this service", 
        icon: "error",
        dangerMode: true,
        buttons:{},
        timer:3000,
      }).then(()=>{
        navigate("/signin");
      })
    }else{
      navigate("/education")
    }
  }
  return (
    
    <div className="root">
        <Grid className="banner">
          <Grid.Col lg={6} sm={12} md={12}>
            <Text className="banner-heading">Your Home For Help</Text>
            <Text className="banner-description">When we give cheerfully and accept gratefully, everyone is blessed.</Text>
            <Text className="banner-descriptionMore">The community to give and take.</Text>
           {token?null:<Link to="/signin"> <Button color="teal" radius="xl" size="xl">
              Sign In
            </Button></Link>}
          </Grid.Col>
          <Grid.Col lg={6} sm={12} md={12}>
            <Image src={Loginside}  alt="Banner image"/>
          </Grid.Col>
        </Grid>
        <Grid >
          <div className="rectangle display">
            <Image src={Rectangleshap} alt="rectangle shape" className="img img-fluid"/>
            <div className="rectangle-text">
              <Text className="text">How do you want to Help</Text>
            </div>
            <div className="group">
              <Group spacing="xl" className="img-group">
                <img src={Education}  className="img img-fluid img-setting me-5" data-aos="fade-right"/>
                <img src={Hospital_img}  className="img img-fluid img-setting me-5" data-aos="fade-up"/>
                <img src={Job_img}  className="img img-fluid img-setting me-5" data-aos="fade-up"/>
                <img src={Donation_img}  className="img img-fluid img-setting me-5" data-aos="fade-left"/>
              </Group>
            </div>
          </div>
        </Grid>
        <Grid className="row-services">
          <Grid.Col lg={6} md={12} sm={12} className="col-services"  data-aos="fade-right">
              <Card withBorder shadow="sm" radius="md" className="col-card">
                <Text className="job">Job</Text>
                <Card.Section>
                <Image
                  src={Job}
                  alt="job"
                  className='img img-fluid img-padd'
                />
                </Card.Section>
                <Button mt="md" radius="xl" className="card-btn" data-aos="fade-up" onClick={()=>{HandleJob()}}>
                  Job
                </Button>
              </Card>
          </Grid.Col>
          <Grid.Col lg={6} md={12} sm={12} className="col-services" data-aos="fade-left">
              <Text className="card-textone">If you are looking for a job or if you want to hire someone for a job.</Text>
              <Text className="card-texttwo">Want to help or want help.</Text>
              <Text className="card-textthree">click on <span className='text-black'>Job button</span> to find what you are looking for.</Text>
          </Grid.Col>
        </Grid>
        <Grid className="row-services">
          <Grid.Col lg={6} md={12} sm={12} className="col-services" data-aos="fade-up">
              <Text className="card-textdonationone">Want to help by donating something then this is the best place to do that.</Text>
              <Text className="card-texttwo">Get started by clicking on <span className="text-black">Donate button</span></Text>
          </Grid.Col>
          <Grid.Col lg={6} md={12} sm={12} className="col-services" data-aos="fade-left">
              <Card withBorder shadow="sm" radius="md" className="col-card">
                <Text className="job" data-aos="fade-down">Donation and Funds</Text>
                <Card.Section>
                <Image
                  src={Donation}
                  alt="job"
                  className='img img-fluid img-padd'
                />
                </Card.Section>
                <Button mt="md" radius="xl" className="card-btn" data-aos="fade-up" onClick={()=>{DonationHandler()}}>
                  Donate
                </Button>
              </Card>
          </Grid.Col>
        </Grid>
        <Grid className="row-services" data-aos="fade-right">
          <Grid.Col lg={6} md={12} sm={12} className="col-services">
              <Card withBorder shadow="sm" radius="md" className="col-card">
                <Text className="job">Health</Text>
                <Card.Section>
                <Image
                  src={Hospital}
                  alt="job"
                  className='img img-fluid img-padd'
                />
                </Card.Section>
                <Button mt="md" radius="xl" className="card-btn" onClick={()=>{medicalHandler()}}>
                  Health
                </Button>
              </Card>
          </Grid.Col>
          <Grid.Col lg={6} md={12} sm={12} className="col-services" data-aos="fade-down" >
              <Text className="card-textone">If you want to help someone with health problems </Text>
              <Text className="card-texttwo">OR</Text>
              <Text className="card-textthree">Help them with medication.</Text>
              <Text className="card-textthree">Click on <span className='text-black'>Health button</span></Text>
          </Grid.Col>
        </Grid>
        <Grid className="row-services">
          <Grid.Col lg={6} md={12} sm={12} className="col-services d-grid align-items-center" data-aos="fade-right">
              <Text className="card-textone">Wanting to help children or people to get education who can not afford to get education.<br/><br/>Then click one <span className='text-black'>Education button</span></Text>
              <Text className="card-textthree"></Text>
          </Grid.Col>
          <Grid.Col lg={6} md={12} sm={12} className="col-services" data-aos="fade-left">
              <Card withBorder shadow="sm" radius="md" className="col-card">
                <Text className="job">Education</Text>
                <Card.Section>
                <Image
                  src={Books}
                  alt="job"
                  className='img img-fluid img-padd'
                />
                </Card.Section>
                <Button mt="md" radius="xl" className="card-btn" onClick={()=>{EductionHandler()}}>
                  Education
                </Button>
              </Card>
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col lg={12} md={12} sm={12}>
            <div className="rectangletwo">
              <Image src={Rectangleshap} alt="rectangle shape" className="img img-fluid img-rectangle" data-aos="fade-in"/>
              <div className="rectangle-texttwo" data-aos="fade-up">
                Our community help those who needs it the most.<br/>
                by helping people and giving them what they needs is the most we can do for them .<br/>
                Help by donating clothes, accessories and others needy things.<br/>
                By offering jobs and giving education and medical facilities.
              </div>
            </div>
          </Grid.Col>
        </Grid>
        {token?null:<div className="card-center" data-aos="fade-up">
          <div className='signin-card'>
                <div className="text" data-aos="fade-right">
                    <p>Sign in or Register to start your give and take journey.</p>
                    <Link to="/signin"><Button className="signin-btn me-4" radius="xl" data-aos="fade-up">Sign in</Button></Link>
                    <Button className="signin-btn" radius="xl" data-aos="fade-down">Register</Button>
                </div>
                <div className="image" data-aos="fade-left">
                  <img src={Flower} className="img img-fluid img-width"/>
                </div>
          </div>
         </div>}
    </div>

  )
}

export default Banner