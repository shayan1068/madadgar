import React, { useEffect, useState } from 'react'
import Header from './../../components/includes/header';
import Footer from './../../components/includes/footer';
import { links, data } from './../../components/includes/commons';
import { Button, Container, Grid, Text } from '@mantine/core';
import "./../../css/style.css";
import { Field, Form, Formik } from 'formik';
import { Link, useSearchParams } from 'react-router-dom';
import swal from 'sweetalert';
import { fetchPostData, updateDataOfPost } from './editProfile/profileDataHandler';
function EditPostDetail() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [getData, setData] = useState<any>();
    const [getCount,setCount] = useState<any>(0);
    const getDataHandler = async (id: any) => {
        await fetchPostData(id).then((response) => {
            setData(response);
        })
    }
    useEffect(() => {
        getDataHandler(id);
    }, [getCount])
    return (
        <>
            <Header links={links} />
            <Container fluid className='root'>
                <Grid className="editPage mt-2 mb-2">
                    <Grid.Col lg={12} md={12} sm={12} >
                        <h1 className="editHeading">Edit Post</h1>
                    </Grid.Col>
                </Grid>
                <Grid className="BottomPage mb-2">
                    <Grid.Col>
                        {getData&&(
                            <Formik
                            initialValues={{
                                title: getData?.title  ,
                                email: getData?.email ,
                                location: getData?.location ,
                                city: getData?.city ,
                                phone: getData?.phone ,
                                description: getData?.description 
                            }}
                            onSubmit={async(values) => {
                               await updateDataOfPost(values.title,values.email,values.phone,values.city,values.location,values.description).then((response)=>{
                                swal(response,{
                                    buttons:{},
                                    icon:"success",
                                    timer:3000,
                                  }).then(e=>setCount(getCount+1));
                               })
                            }
                            }
                        >
                            {({ isSubmitting,values,handleChange }) => (
                                <Form>
                                    {getData && getData.title?
                                     <Grid>
                                     <Grid.Col lg={4} md={6} sm={12}>
                                         <Text className='text-edit'>Your Title:</Text>
                                         <Field type="text" name="title" className="form-control"   placeholder={getData && getData.title || ''} />
                                     </Grid.Col>
                                 </Grid>:<></>}
                                    
                                    <Grid>
                                        <Grid.Col lg={6} md={6} sm={12}>
                                            <Text className='text-edit'>Your Email:</Text>
                                            <Field type="email" name="email" className="form-control" placeholder={getData && getData.email || ''} />
                                        </Grid.Col>
                                        <Grid.Col lg={6} md={6} sm={12}>
                                            <Text className='text-edit'>Your Location:</Text>
                                            <Field type="text" name="location" className="form-control" placeholder={getData && getData.location || ''} />
                                        </Grid.Col>
                                        <Grid.Col lg={6} md={6} sm={12}>
                                            <Text className='text-edit'>Your City:</Text>
                                            <Field type="text" name="city" className="form-control" placeholder={getData && getData.city || ''} />
                                        </Grid.Col>
                                        <Grid.Col lg={6} md={6} sm={12}>
                                            <Text className='text-edit'>Your Phone Number:</Text>
                                            <Field type="tel" name="phone" className="form-control" placeholder={getData && getData.phone || ''} />
                                        </Grid.Col>
                                        <Grid.Col lg={12} md={12} sm={12}>
                                            <Text className='text-edit'>Your Description:</Text>
                                            <Field name="description" id="description" as="textarea" rows={10} cols={20} className='w-100 bg-textarea' placeholder={getData && getData.description || ''} />
                                        </Grid.Col>
                                        <Grid.Col lg={12} md={12} sm={12}>
                                            <Button type="submit" className="edit-btn">Send</Button>
                                            <Link to="/profile"><Button type="button" className="edit-close">Close</Button></Link>
                                        </Grid.Col>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                        )}
                    </Grid.Col>
                </Grid>
            </Container>
            <Footer data={data} />
        </>
    )
}

export default EditPostDetail