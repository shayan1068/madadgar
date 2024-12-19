import React, { useState, useEffect } from 'react'
import { Button, Container, Grid, Group, Text, Image } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import "./../../../css/style.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Header from "./../../../components/includes/header";
import { links, data } from './../../../components/includes/commons';
import Footer from "./../../../components/includes/footer";
import DonatedPicture from "./../../../images/Donation/donatedPicture.svg";
import {PostDataToDb} from "./../donationhandler/donationHandler";
import swal from "sweetalert";
function DonateItems() {
  const userId = sessionStorage.getItem('user');
  const [image, setImage] = useState({ preview: '', data: '' });
  const [updateCount, setUpdateCount] = useState(0);
  const handleFileChange = (e: any) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }
  return (
    <Container fluid className="root">
    <Header links={links} />
    <Grid className='jobpage-row mt-2'>
      <Group>
        <Grid className="job-row-text">
          <Grid.Col lg={6} md={6} sm={12}>
            <Grid.Col lg={12} md={12} sm={12} >
              <Group className='d-flex justify-content-center mt-3'>
                <NavLink to="/donationItem" className="job-btn me-5"><Button radius="xl" className="job-btn">Donate Items</Button></NavLink>
                <NavLink to="/needDonation"><Button radius="xl" className="job-btn">Need Donation</Button></NavLink>
              </Group>
            </Grid.Col>
            <Text className="job-banner-text">Donate Stuff for those who do not have many things to affort.
            </Text>
          </Grid.Col>
          <Grid.Col lg={6} md={6} sm={12}>
            <Image src={DonatedPicture} alt="banner image of jobs" className="img img-fluid mt-4" />
          </Grid.Col>
        </Grid>
      </Group>
      <Grid>
      </Grid>
    </Grid>
    <Container className="containerpostajob-area">
      <Grid className="postajob-heading-area">
        <Grid.Col lg={12} md={12} sm={12}>
          <Text className='postajob-heading'>Donate Stuff</Text>
        </Grid.Col>
      </Grid>
      <Grid className="requirements">
       
      </Grid>
      <Grid>
        <Grid.Col lg={12} md={12} sm={12}>
          <div className="container">

            <Formik
              initialValues={{  itemType:'',size:'option1',gender:'',email: '', Phone: '', location: '', foo: '', file: '', city: 'option1',}}
              onSubmit={async (values) => {
                await PostDataToDb(userId!,values.itemType,values.size,values.gender,values.email,values.Phone,values.city,values.location,values.foo,image.data)
                .then((response: any) => {
                  swal("donation form submitted successfully", {
                    icon: "success",
                    buttons: {},
                    timer: 3000,
                  }).then(() => { setUpdateCount(updateCount + 1); })
                })
              }}
            >
              <Form className='form-center mt-5'>
                <div className="row form-set">
                  <div className="col-lg-6">
                    <span className="fw-bold">Item Type</span>
                  </div>
                  <div className="col-lg-6">
                    <Field name="itemType" type="text" className="col-text" placeholder="Item type" required/>
                  </div>
                </div>
                <div className="row form-set">
                  <div className="col-lg-6">
                    <span className="fw-bold">Size:</span>
                  </div>
                  <div className="col-lg-6">
                  <Field name="size" component="select" className="col-text">
                      <option value="option1" disabled>Please Select Size</option>
                      <option value="large">large</option>
                      <option value="medium">medium</option>
                      <option value="small">small</option>
                    </Field>
                  </div>
                </div>
                <div className="row form-set">
                  <div className="col-lg-6">
                    <span className="fw-bold">Gender:</span>
                  </div>
                  <div className="col-lg-6">
                    <Field name="gender" component="select" className="col-text">
                      <option value="" disabled>Please Select Your Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Field>
                  </div>
                </div>
                <Grid className="requirements">
                  <Grid.Col>
                    <Text className="sub-heading2">Contact Us At</Text>
                  </Grid.Col>
                </Grid>
                <div className="row form-set">
                  <div className="col-lg-6">
                    <span className="fw-bold">Email:</span>
                  </div>
                  <div className="col-lg-6">
                    <Field name="email" type="email" className="col-text" placeholder="Enter email Address" />
                    <ErrorMessage name="email" className='text-danger fs-1' />
                  </div>
                </div>
                <div className="row form-set">
                  <div className="col-lg-6">
                    <span className="fw-bold">Phone Number:</span>
                  </div>
                  <div className="col-lg-6">
                    <Field name="Phone" type="tel" className="col-text" placeholder="Your phone number" />
                    <ErrorMessage name="Phone" className="text-danger fs-1" />
                  </div>
                </div>
                <div className="row form-set">
                  <div className="col-lg-6">
                    <span className="fw-bold">city:</span>
                  </div>
                  <div className="col-lg-6">
                  <Field name="city" component="select" className="col-text">
                      <option value="option1" disabled>Please Select Your City</option>
                      <option className="option" value="Abbottabad">Abbottabad</option>
                      <option className="option" value="Adezai">Adezai</option>
                      <option className="option" value="Ali Bandar">Ali Bandar</option>
                      <option className="option" value="Amir Chah">Amir Chah</option>
                      <option className="option" value="Attock">Attock</option>
                      <option className="option" value="Ayubia">Ayubia</option>
                      <option className="option" value="Bahawalpur">Bahawalpur</option>
                      <option className="option" value="Baden">Baden</option>
                      <option className="option" value="Bagh">Bagh</option>
                      <option className="option" value="Bahawalnagar">Bahawalnagar</option>
                      <option className="option" value="Burewala">Burewala</option>
                      <option className="option" value="Banda Daud Shah">Banda Daud Shah</option>
                      <option className="option" value="Bannu district|Bannu">Bannu</option>
                      <option className="option" value="Batagram">Batagram</option>
                      <option className="option" value="Bazdar">Bazdar</option>
                      <option className="option" value="Bela">Bela</option>
                      <option className="option" value="Bellpat">Bellpat</option>
                      <option className="option" value="Bhag">Bhag</option>
                      <option className="option" value="Bhakkar">Bhakkar</option>
                      <option className="option" value="Bhalwal">Bhalwal</option>
                      <option className="option" value="Bhimber">Bhimber</option>
                      <option className="option" value="Birote">Birote</option>
                      <option className="option" value="Buner">Buner</option>
                      <option className="option" value="Burj">Burj</option>
                      <option className="option" value="Chiniot">Chiniot</option>
                      <option className="option" value="Chachro">Chachro</option>
                      <option className="option" value="Chagai">Chagai</option>
                      <option className="option" value="Chah Sandan">Chah Sandan</option>
                      <option className="option" value="Chailianwala">Chailianwala</option>
                      <option className="option" value="Chakdara">Chakdara</option>
                      <option className="option" value="Chakku">Chakku</option>
                      <option className="option" value="Chakwal">Chakwal</option>
                      <option className="option" value="Chaman">Chaman</option>
                      <option className="option" value="Charsadda">Charsadda</option>
                      <option className="option" value="Chhatr">Chhatr</option>
                      <option className="option" value="Chichawatni">Chichawatni</option>
                      <option className="option" value="Chitral">Chitral</option>
                      <option className="option" value="Dadu">Dadu</option>
                      <option className="option" value="Dera Ghazi Khan">Dera Ghazi Khan</option>
                      <option className="option" value="Dera Ismail Khan">Dera Ismail Khan</option>
                      <option className="option" value="Dalbandin">Dalbandin</option>
                      <option className="option" value="Dargai">Dargai</option>
                      <option className="option" value="Darya Khan">Darya Khan</option>
                      <option className="option" value="Daska">Daska</option>
                      <option className="option" value="Dera Bugti">Dera Bugti</option>
                      <option className="option" value="Dhana Sar">Dhana Sar</option>
                      <option className="option" value="Digri">Digri</option>
                      <option className="option" value="Dina City|Dina">Dina</option>
                      <option className="option" value="Dinga">Dinga</option>
                      <option className="option" value="Diplo, Pakistan|Diplo">Diplo</option>
                      <option className="option" value="Diwana">Diwana</option>
                      <option className="option" value="Dokri">Dokri</option>
                      <option className="option" value="Drosh">Drosh</option>
                      <option className="option" value="Duki">Duki</option>
                      <option className="option" value="Dushi">Dushi</option>
                      <option className="option" value="Duzab">Duzab</option>
                      <option className="option" value="Faisalabad">Faisalabad</option>
                      <option className="option" value="Fateh Jang">Fateh Jang</option>
                      <option className="option" value="Ghotki">Ghotki</option>
                      <option className="option" value="Gwadar">Gwadar</option>
                      <option className="option" value="Gujranwala">Gujranwala</option>
                      <option className="option" value="Gujrat">Gujrat</option>
                      <option className="option" value="Gadra">Gadra</option>
                      <option className="option" value="Gajar">Gajar</option>
                      <option className="option" value="Gandava">Gandava</option>
                      <option className="option" value="Garhi Khairo">Garhi Khairo</option>
                      <option className="option" value="Garruck">Garruck</option>
                      <option className="option" value="Ghakhar Mandi">Ghakhar Mandi</option>
                      <option className="option" value="Ghanian">Ghanian</option>
                      <option className="option" value="Ghauspur">Ghauspur</option>
                      <option className="option" value="Ghazluna">Ghazluna</option>
                      <option className="option" value="Girdan">Girdan</option>
                      <option className="option" value="Gulistan">Gulistan</option>
                      <option className="option" value="Gwash">Gwash</option>
                      <option className="option" value="Hyderabad">Hyderabad</option>
                      <option className="option" value="Hala">Hala</option>
                      <option className="option" value="Haripur">Haripur</option>
                      <option className="option" value="Hab Chauki">Hab Chauki</option>
                      <option className="option" value="Hafizabad">Hafizabad</option>
                      <option className="option" value="Hameedabad">Hameedabad</option>
                      <option className="option" value="Hangu">Hangu</option>
                      <option className="option" value="Harnai">Harnai</option>
                      <option className="option" value="Hasilpur">Hasilpur</option>
                      <option className="option" value="Haveli Lakha">Haveli Lakha</option>
                      <option className="option" value="Hinglaj">Hinglaj</option>
                      <option className="option" value="Hoshab">Hoshab</option>
                      <option className="option" value="Islamabad">Islamabad</option>
                      <option className="option" value="Islamkot">Islamkot</option>
                      <option className="option" value="Ispikan">Ispikan</option>
                      <option className="option" value="Jacobabad">Jacobabad</option>
                      <option className="option" value="Jamshoro">Jamshoro</option>
                      <option className="option" value="Jhang">Jhang</option>
                      <option className="option" value="Jhelum">Jhelum</option>
                      <option className="option" value="Jamesabad">Jamesabad</option>
                      <option className="option" value="Jampur">Jampur</option>
                      <option className="option" value="Janghar">Janghar</option>
                      <option className="option" value="Jati, Jati(Mughalbhin)">Jati</option>
                      <option className="option" value="Jauharabad">Jauharabad</option>
                      <option className="option" value="Jhal">Jhal</option>
                      <option className="option" value="Jhal Jhao">Jhal Jhao</option>
                      <option className="option" value="Jhatpat">Jhatpat</option>
                      <option className="option" value="Jhudo">Jhudo</option>
                      <option className="option" value="Jiwani">Jiwani</option>
                      <option className="option" value="Jungshahi">Jungshahi</option>
                      <option className="option" value="Karachi">Karachi</option>
                      <option className="option" value="Kotri">Kotri</option>
                      <option className="option" value="Kalam">Kalam</option>
                      <option className="option" value="Kalandi">Kalandi</option>
                      <option className="option" value="Kalat">Kalat</option>
                      <option className="option" value="Kamalia">Kamalia</option>
                      <option className="option" value="Kamararod">Kamararod</option>
                      <option className="option" value="Kamber">Kamber</option>
                      <option className="option" value="Kamokey">Kamokey</option>
                      <option className="option" value="Kanak">Kanak</option>
                      <option className="option" value="Kandi">Kandi</option>
                      <option className="option" value="Kandiaro">Kandiaro</option>
                      <option className="option" value="Kanpur">Kanpur</option>
                      <option className="option" value="Kapip">Kapip</option>
                      <option className="option" value="Kappar">Kappar</option>
                      <option className="option" value="Karak City">Karak City</option>
                      <option className="option" value="Karodi">Karodi</option>
                      <option className="option" value="Kashmor">Kashmor</option>
                      <option className="option" value="Kasur">Kasur</option>
                      <option className="option" value="Katuri">Katuri</option>
                      <option className="option" value="Keti Bandar">Keti Bandar</option>
                      <option className="option" value="Khairpur">Khairpur</option>
                      <option className="option" value="Khanaspur">Khanaspur</option>
                      <option className="option" value="Khanewal">Khanewal</option>
                      <option className="option" value="Kharan">Kharan</option>
                      <option className="option" value="kharian">kharian</option>
                      <option className="option" value="Khokhropur">Khokhropur</option>
                      <option className="option" value="Khora">Khora</option>
                      <option className="option" value="Khushab">Khushab</option>
                      <option className="option" value="Khuzdar">Khuzdar</option>
                      <option className="option" value="Kikki">Kikki</option>
                      <option className="option" value="Klupro">Klupro</option>
                      <option className="option" value="Kohan">Kohan</option>
                      <option className="option" value="Kohat">Kohat</option>
                      <option className="option" value="Kohistan">Kohistan</option>
                      <option className="option" value="Kohlu">Kohlu</option>
                      <option className="option" value="Korak">Korak</option>
                      <option className="option" value="Korangi">Korangi</option>
                      <option className="option" value="Kot Sarae">Kot Sarae</option>
                      <option className="option" value="Kotli">Kotli</option>
                      <option className="option" value="Lahore">Lahore</option>
                      <option className="option" value="Larkana">Larkana</option>
                      <option className="option" value="Lahri">Lahri</option>
                      <option className="option" value="Lakki Marwat">Lakki Marwat</option>
                      <option className="option" value="Lasbela">Lasbela</option>
                      <option className="option" value="Latamber">Latamber</option>
                      <option className="option" value="Layyah">Layyah</option>
                      <option className="option" value="Leiah">Leiah</option>
                      <option className="option" value="Liari">Liari</option>
                      <option className="option" value="Lodhran">Lodhran</option>
                      <option className="option" value="Loralai">Loralai</option>
                      <option className="option" value="Lower Dir">Lower Dir</option>
                      <option className="option" value="Shadan Lund">Shadan Lund</option>
                      <option className="option" value="Multan">Multan</option>
                      <option className="option" value="Mandi Bahauddin">Mandi Bahauddin</option>
                      <option className="option" value="Mansehra">Mansehra</option>
                      <option className="option" value="Mian Chanu">Mian Chanu</option>
                      <option className="option" value="Mirpur">Mirpur</option>
                      <option className="option" value="Moro, Pakistan|Moro">Moro</option>
                      <option className="option" value="Mardan">Mardan</option>
                      <option className="option" value="Mach">Mach</option>
                      <option className="option" value="Madyan">Madyan</option>
                      <option className="option" value="Malakand">Malakand</option>
                      <option className="option" value="Mand">Mand</option>
                      <option className="option" value="Manguchar">Manguchar</option>
                      <option className="option" value="Mashki Chah">Mashki Chah</option>
                      <option className="option" value="Maslti">Maslti</option>
                      <option className="option" value="Mastuj">Mastuj</option>
                      <option className="option" value="Mastung">Mastung</option>
                      <option className="option" value="Mathi">Mathi</option>
                      <option className="option" value="Matiari">Matiari</option>
                      <option className="option" value="Mehar">Mehar</option>
                      <option className="option" value="Mekhtar">Mekhtar</option>
                      <option className="option" value="Merui">Merui</option>
                      <option className="option" value="Mianwali">Mianwali</option>
                      <option className="option" value="Mianez">Mianez</option>
                      <option className="option" value="Mirpur Batoro">Mirpur Batoro</option>
                      <option className="option" value="Mirpur Khas">Mirpur Khas</option>
                      <option className="option" value="Mirpur Sakro">Mirpur Sakro</option>
                      <option className="option" value="Mithi">Mithi</option>
                      <option className="option" value="Mongora">Mongora</option>
                      <option className="option" value="Murgha Kibzai">Murgha Kibzai</option>
                      <option className="option" value="Muridke">Muridke</option>
                      <option className="option" value="Musa Khel Bazar">Musa Khel Bazar</option>
                      <option className="option" value="Muzaffar Garh">Muzaffar Garh</option>
                      <option className="option" value="Muzaffarabad">Muzaffarabad</option>
                      <option className="option" value="Nawabshah">Nawabshah</option>
                      <option className="option" value="Nazimabad">Nazimabad</option>
                      <option className="option" value="Nowshera">Nowshera</option>
                      <option className="option" value="Nagar Parkar">Nagar Parkar</option>
                      <option className="option" value="Nagha Kalat">Nagha Kalat</option>
                      <option className="option" value="Nal">Nal</option>
                      <option className="option" value="Naokot">Naokot</option>
                      <option className="option" value="Nasirabad">Nasirabad</option>
                      <option className="option" value="Nauroz Kalat">Nauroz Kalat</option>
                      <option className="option" value="Naushara">Naushara</option>
                      <option className="option" value="Nur Gamma">Nur Gamma</option>
                      <option className="option" value="Nushki">Nushki</option>
                      <option className="option" value="Nuttal">Nuttal</option>
                      <option className="option" value="Okara">Okara</option>
                      <option className="option" value="Ormara">Ormara</option>
                      <option className="option" value="Peshawar">Peshawar</option>
                      <option className="option" value="Panjgur">Panjgur</option>
                      <option className="option" value="Pasni City">Pasni City</option>
                      <option className="option" value="Paharpur">Paharpur</option>
                      <option className="option" value="Palantuk">Palantuk</option>
                      <option className="option" value="Pendoo">Pendoo</option>
                      <option className="option" value="Piharak">Piharak</option>
                      <option className="option" value="Pirmahal">Pirmahal</option>
                      <option className="option" value="Pishin">Pishin</option>
                      <option className="option" value="Plandri">Plandri</option>
                      <option className="option" value="Pokran">Pokran</option>
                      <option className="option" value="Pounch">Pounch</option>
                      <option className="option" value="Quetta">Quetta</option>
                      <option className="option" value="Qambar">Qambar</option>
                      <option className="option" value="Qamruddin Karez">Qamruddin Karez</option>
                      <option className="option" value="Qazi Ahmad">Qazi Ahmad</option>
                      <option className="option" value="Qila Abdullah">Qila Abdullah</option>
                      <option className="option" value="Qila Ladgasht">Qila Ladgasht</option>
                      <option className="option" value="Qila Safed">Qila Safed</option>
                      <option className="option" value="Qila Saifullah">Qila Saifullah</option>
                      <option className="option" value="Rawalpindi">Rawalpindi</option>
                      <option className="option" value="Rabwah">Rabwah</option>
                      <option className="option" value="Rahim Yar Khan">Rahim Yar Khan</option>
                      <option className="option" value="Rajan Pur">Rajan Pur</option>
                      <option className="option" value="Rakhni">Rakhni</option>
                      <option className="option" value="Ranipur">Ranipur</option>
                      <option className="option" value="Ratodero">Ratodero</option>
                      <option className="option" value="Rawalakot">Rawalakot</option>
                      <option className="option" value="Renala Khurd">Renala Khurd</option>
                      <option className="option" value="Robat Thana">Robat Thana</option>
                      <option className="option" value="Rodkhan">Rodkhan</option>
                      <option className="option" value="Rohri">Rohri</option>
                      <option className="option" value="Sialkot">Sialkot</option>
                      <option className="option" value="Sadiqabad">Sadiqabad</option>
                      <option className="option" value="Safdar Abad- (Dhaban Singh)">Safdar Abad</option>
                      <option className="option" value="Sahiwal">Sahiwal</option>
                      <option className="option" value="Saidu Sharif">Saidu Sharif</option>
                      <option className="option" value="Saindak">Saindak</option>
                      <option className="option" value="Sakrand">Sakrand</option>
                      <option className="option" value="Sanjawi">Sanjawi</option>
                      <option className="option" value="Sargodha">Sargodha</option>
                      <option className="option" value="Saruna">Saruna</option>
                      <option className="option" value="Shabaz Kalat">Shabaz Kalat</option>
                      <option className="option" value="Shadadkhot">Shadadkhot</option>
                      <option className="option" value="Shahbandar">Shahbandar</option>
                      <option className="option" value="Shahpur">Shahpur</option>
                      <option className="option" value="Shahpur Chakar">Shahpur Chakar</option>
                      <option className="option" value="Shakargarh">Shakargarh</option>
                      <option className="option" value="Shangla">Shangla</option>
                      <option className="option" value="Sharam Jogizai">Sharam Jogizai</option>
                      <option className="option" value="Sheikhupura">Sheikhupura</option>
                      <option className="option" value="Shikarpur">Shikarpur</option>
                      <option className="option" value="Shingar">Shingar</option>
                      <option className="option" value="Shorap">Shorap</option>
                      <option className="option" value="Sibi">Sibi</option>
                      <option className="option" value="Sohawa">Sohawa</option>
                      <option className="option" value="Sonmiani">Sonmiani</option>
                      <option className="option" value="Sooianwala">Sooianwala</option>
                      <option className="option" value="Spezand">Spezand</option>
                      <option className="option" value="Spintangi">Spintangi</option>
                      <option className="option" value="Sui">Sui</option>
                      <option className="option" value="Sujawal">Sujawal</option>
                      <option className="option" value="Sukkur">Sukkur</option>
                      <option className="option" value="Suntsar">Suntsar</option>
                      <option className="option" value="Surab">Surab</option>
                      <option className="option" value="Swabi">Swabi</option>
                      <option className="option" value="Swat">Swat</option>
                      <option className="option" value="Tando Adam">Tando Adam</option>
                      <option className="option" value="Tando Bago">Tando Bago</option>
                      <option className="option" value="Tangi">Tangi</option>
                      <option className="option" value="Tank City">Tank City</option>
                      <option className="option" value="Tar Ahamd Rind">Tar Ahamd Rind</option>
                      <option className="option" value="Thalo">Thalo</option>
                      <option className="option" value="Thatta">Thatta</option>
                      <option className="option" value="Toba Tek Singh">Toba Tek Singh</option>
                      <option className="option" value="Tordher">Tordher</option>
                      <option className="option" value="Tujal">Tujal</option>
                      <option className="option" value="Tump">Tump</option>
                      <option className="option" value="Turbat">Turbat</option>
                      <option className="option" value="Umarao">Umarao</option>
                      <option className="option" value="Umarkot">Umarkot</option>
                      <option className="option" value="Upper Dir">Upper Dir</option>
                      <option className="option" value="Uthal">Uthal</option>
                      <option className="option" value="Vehari">Vehari</option>
                      <option className="option" value="Veirwaro">Veirwaro</option>
                      <option className="option" value="Vitakri">Vitakri</option>
                      <option className="option" value="Wadh">Wadh</option>
                      <option className="option" value="Wah Cantt">Wah Cantt</option>
                      <option className="option" value="Warah">Warah</option>
                      <option className="option" value="Washap">Washap</option>
                      <option className="option" value="Wasjuk">Wasjuk</option>
                      <option className="option" value="Wazirabad">Wazirabad</option>
                      <option className="option" value="Yakmach">Yakmach</option>
                      <option className="option" value="Zhob">Zhob</option>
                      <option className="option" value="Other">Other</option>
                      </Field>
                    <ErrorMessage name="city" className="text-danger fs-1" />
                  </div>
                </div>
                <div className="row form-set">
                  <div className="col-lg-6">
                    <span className="fw-bold">Location:</span>
                  </div>
                  <div className="col-lg-6">
                    <Field name="location" type="text" className="col-text" placeholder="Type in your location" />
                    <ErrorMessage name="location" className="text-danger fs-1" />
                  </div>
                </div>
                <div className="textarea-container">
                  <Text className="heading">Description</Text>
                  <Field name="foo" as="textarea" rows={10} cols={20} placeholder="description here" />
                  <Field name="file" type="file" className="button" title="Select File Here" onChange={handleFileChange}  />
                </div>
                <div className="div col-lg-12 col-md-12 col-sm-12 col-postajobbtn">
                  <Button type="submit" className="post-btn">Post</Button>
                </div>
              </Form>

            </Formik>

          </div>
        </Grid.Col>
      </Grid>

    </Container>
    <Footer data={data} />
  </Container>
  )
}

export default DonateItems