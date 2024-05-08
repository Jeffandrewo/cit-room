import React from 'react';
import { Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import './aboutusPage.css';

export default function AboutUsPage() {

  const features = [
    {
      title: "Real-time Room Tracking",
      image: "https://cit.edu/wp-content/uploads/2023/07/GLE-Building.jpg",
      description: "Track the availability and details of rooms in our building in real-time, including information like room number, teacher, section, subject, and time schedule."
    },
    {
      title: "Event Reservation",
      image: "https://cit.edu/wp-content/uploads/2023/07/Case-Room.jpg",
      description: "Request for events or meetings to be held in our building through the website. Await approval from the admin for confirmation."
    },
    {
      title: "News Updates",
      image: "https://th.bing.com/th/id/OIP.DT0aUg84feftKA3koGwsxwHaE8?rs=1&pid=ImgDetMain",
      description: "Stay informed about school-related news and updates through our dedicated news page."
    }
    
  ];

  const teamMembers = [
    { name: "Jeffery Andrew Ouano", role: "Lead Developer", image: "https://z-p3-scontent.fceb6-1.fna.fbcdn.net/v/t1.15752-9/433960707_3293673487604806_5019268868274207248_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEm6smG6EM23GL_LXtoiUTlzF-BjErQ7RXMX4GMStDtFR5_XNn8DBrlRZTYnC1sEZVBDr79GAKhhQMpF37RB4zx&_nc_ohc=jPb3NTsM-nAQ7kNvgFhE36E&_nc_ht=z-p3-scontent.fceb6-1.fna&oh=03_Q7cD1QE8AytbB7RT_S5bPMAvtQ5GGdCnzfzbz72PK91yY7FZnQ&oe=6661CD03" },
    { name: "John Elbert Necesario", role: "Backend Developer", image: "https://z-p3-scontent.fceb2-2.fna.fbcdn.net/v/t1.15752-9/439563766_462037039724899_6344146485784793455_n.jpg?stp=dst-jpg_p1080x2048&_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeG12X7bOyAeeW7JHb8GLV2yyMfj1fSFmG_Ix-PV9IWYbzonbvsYNK5apOqwqYRvNnigTP5wHR5thCIzmBnkG4YM&_nc_ohc=H8nSXKVyO5UQ7kNvgFeWA-J&_nc_ht=z-p3-scontent.fceb2-2.fna&oh=03_Q7cD1QHdRQpJWJqPmCerqS6Fs30IfRhdrFFjQnAzvKcp-hqGvg&oe=6661BB01" },
    { name: "Rgeane Tisoy", role: "Backend Developer", image: "https://th.bing.com/th/id/OIP.X-hqlJA8LbeclRPJmd0EMQAAAA?rs=1&pid=ImgDetMain" },
    { name: "Kirk Dave Navarro", role: "UX/UI Designer", image: "https://z-p3-scontent.fceb2-2.fna.fbcdn.net/v/t1.15752-9/217578408_221457983207997_2347036370390111482_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGpV_NLdnjcrpxtJEHulpLdnd9euc5A5YOd3165zkDlg4v4CMDWd9NYQ3WB1F5wpv9vnh69kh8TMhNGprB63Xxg&_nc_ohc=2J-97iGXrg8Q7kNvgETsahT&_nc_ht=z-p3-scontent.fceb2-2.fna&oh=03_Q7cD1QFt_RDUKMB1njF-mY_98DBCxRb5vl9ctzlL4jIxasT2qA&oe=6661CE5B" },
    { name: "Elther John Rabanes", role: "UX/UI Designer", image: "https://z-p3-scontent.fceb2-2.fna.fbcdn.net/v/t1.15752-9/439720143_793088592429321_4373828883577717663_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFjInckyKIYkVa7Uuo_g9pIBuHPcSpKB_sG4c9xKkoH-23HjU-QvRFV9NuM7xmLkiO5hC2DdbsYQsD561L9H2e_&_nc_ohc=YQKQC58522cQ7kNvgFhVZv-&_nc_ht=z-p3-scontent.fceb2-2.fna&oh=03_Q7cD1QFUTTAz1xlYLmlbEHHrTIdZ0C_6tS4tBmrWmVz5jMkIBQ&oe=6661E191" }
    
  ];

  return (
    <div className="about-us-container">
      <Typography variant="h3" gutterBottom className="title">About Us</Typography>

      <section className="section" style={{ textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>Our Services</Typography>
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="feature-card">
                <CardMedia
                  className="card-media"
                  component="img"
                  image={feature.image}
                  alt={feature.title}
                />
                <CardContent>
                  <Typography variant="h6" color="textPrimary">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </section>

      <section className="section mission-section" style={{ textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom className="mission-text">Our Mission</Typography>
        <Typography variant="body1" className="mission-description">
          At CIT Room Checker, our mission is to provide a comprehensive platform for students, teachers, and administrators to efficiently manage and utilize the resources within our building. We strive to enhance collaboration and productivity by offering real-time room tracking, event reservation, and timely news updates.
        </Typography>
      </section>

      <section className="section team-section" style={{ textAlign: 'center', marginTop: '60px' }}>
        <Typography variant="h5" gutterBottom className="team-heading">Meet Our Team</Typography>
        <Grid container spacing={3}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="team-member-card">
                <div className="member-image-container">
                  <CardMedia
                    className="card-media"
                    component="img"
                    image={member.image}
                    alt={member.name}
                  />
                </div>
                <CardContent className="member-details">
                  <Typography variant="subtitle1" color="textPrimary" className="member-name">{member.name}</Typography>
                  <Typography variant="body2" color="textSecondary" className="member-role">{member.role}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </section>

    </div>
  );
}
