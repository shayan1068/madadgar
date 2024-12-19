import React from 'react'
import { Container} from '@mantine/core';
import Header from './../components/includes/header';
import Footer from "./../components/includes/footer";
import Banner from "./homePageInclude/homeInclud";
import {links,data} from './../components/includes/commons';
import "./../css/style.css";
import swal from "sweetalert";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';
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
function Index() {
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();
  function HandleJob(){
    if(token==null){
      swal({
        title: "Error",
        text: "you need to login first to access this service", 
        icon: "error",
        dangerMode: true,
        timer:3000,
      }).then(()=>{
        navigate("/signin");
      })
    }
  }
  return (
      <Container fluid className="root">
        {token &&
          <Header links={links} />
        }
          <Banner/>
          <Footer data={data} />
      </Container>
  )
}

export default Index