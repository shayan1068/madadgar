import {createStyles} from "@mantine/core";
const UseStyle = createStyles((theme)=>({
  Container:{
    padding:'0',
    margin:'5%',
  },
    Card:{
      boxShadow:theme.shadows.lg,
      backgroundColor:'#d3d3d3',
      padding:"20px",
      width:"100%",
      
    },
    title:{
      textAlign:'left',
      fontWeight:'bold',
      fontSize:'18px',
      textTransform:'uppercase',
      padding: '20px 25px 10px',
    },
    card_body:{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 50px 0px',
      color:'#999999',
      fontWeight:'bold',
    }, 
    line:{
      height:"0.5px",
      backgroundColor:'#ffc400',
      width:"75px",
      padding: '0px 25px 2px',
      position:'absolute',
      left:'20px',
    },
    subcategoryTitle:{
      display:'flex',
      justifyContent: 'space-between',
      padding: '10px 75px 20px',
      color:'#999999',
    },
    cardLink:{
      color:'#999999',
      textDecoration:'none',
      '&:hover':{
        textDecoration:'none',
        color:'#000',
        fontWeight:'bold',
      }
    },
    pages_title:{
      textAlign:'left',
      fontWeight:'bold',
      fontSize:'18px',
      textTransform:'uppercase',
      padding: '0px 25px 0px',
    },
    ProductCard:{
      marginTop:"10px",
    },
    
    cardDescription:{
      textAlign:'center',
      color:'#999999',
      fontWeight:700,
      cursor:'pointer',
      '&:hover':{
        color:'#000',
      }
    },
 
   
    
}))

export default UseStyle;