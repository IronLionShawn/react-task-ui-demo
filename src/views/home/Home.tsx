import { Card, CardActions, CardContent, Button, CardMedia, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import * as React from 'react';
import logo from '../../logo.svg';
import './Home.scss';


export interface IAppProps {}

function Home (props: IAppProps) {
  return (
   <Grid className='Home' sx={{ height: '100%' }} container justifyContent='center' alignContent='center'>
        <Card sx={{ width: '35%' }}>
            <CardMedia sx={{ objectFit: 'inherit' }} className='card-logo' component='img' height='200' alt='React Logo' title='React Tasks UI Demo' image={logo} />
            <CardContent>
                <Typography sx={{ textAlign: 'center' }} variant='h4' component='div' gutterBottom>React JS UI Demo</Typography>
                <Typography variant='body1' gutterBottom>This is a React JS Example, it's built on Next.js 14 and Material UI</Typography>
                <Typography variant='body2' gutterBottom>I used a mock api service to show functionality.</Typography>
                <Typography variant='caption'>Developed By Shawn Williams</Typography>
            </CardContent>
            <CardActions>
                <Button size='small' onClick={() => { window.open('https://github.com/IronLionShawn/react-task-ui-demo/blob/master/README.md','_blank'); }} >Learn More</Button>
            </CardActions>
        </Card>
   </Grid>
  );
}

export default Home;
