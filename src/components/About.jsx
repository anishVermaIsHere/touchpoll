import React from 'react';
import { Box, Container, Paper, CardMedia, Typography } from '@mui/material';
import about from '../assets/images/about.avif';


const About = () => {
  return (
    <Container>
      <Typography variant="h3" p={2}>
        About us 
      </Typography>

      <Box>
        <Paper elevation={1} sx={{ p: 3, display: 'flex', flexDirection:{xs:"column", md:"row"} }}>
          <CardMedia
            component="img"
            height="300"
            image={about}
            alt="about"
          />
          <Box sx={{padding:"0 1.2rem", lineHeight:'1.8'}}>
            <Typography variant="h3" mt={2} mb={2} color="primary">
              Stay up to date with company news and media coverage.
            </Typography>
            <Typography variant="p">
              Touchpoll is an Audience Poll Platform that makes it easier to observe and to be heard. By harnessing the power of together, we help presenters to transform passive audiences into active contributors.

              We are fundamentally changing the culture of presentations, lectures, and workshops in business and education from talking to listening. Whether on-site, remote, or hybrid, Touchpoll creates a unique, transparent, and engaging experience for everyone.

              More than 2 million people have gathered opinions, Q&A’s, Quizzes, and more.
            </Typography>
          </Box>
        </Paper>
      </Box>

    </Container>
  )
}

export default About