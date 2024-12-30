import React, { useEffect } from 'react';
import { Grid, Card, Typography, Avatar } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PaymentIcon from '@mui/icons-material/Payment';
import Title from '../../components/helmet/Title';

// Team members data
const teamMembers = [
  {
    name: 'John Smith',
    position: 'CEO & Founder',
    image:
      'https://ui-avatars.com/api/?name=John+Smith&background=0D8ABC&color=fff',
    description: 'Visionary leader with 15+ years of e-commerce experience.',
  },
  {
    name: 'Sarah Johnson',
    position: 'Head of Operations',
    image:
      'https://ui-avatars.com/api/?name=Sarah+Johnson&background=BC0D8A&color=fff',
    description: 'Operations expert ensuring smooth service delivery.',
  },
  {
    name: 'Michael Chen',
    position: 'Tech Lead',
    image:
      'https://ui-avatars.com/api/?name=Michael+Chen&background=8ABC0D&color=fff',
    description: 'Innovation driver behind our technical solutions.',
  },
  {
    name: 'Emma Davis',
    position: 'Customer Relations',
    image:
      'https://ui-avatars.com/api/?name=Emma+Davis&background=0DBC8A&color=fff',
    description: 'Dedicated to exceptional customer experience.',
  },
];

// Features data
const features = [
  {
    icon: (
      <LocalShippingIcon sx={{ fontSize: 40 }} className="text-primary-500" />
    ),
    title: 'Fast Delivery',
    description: 'Quick and reliable shipping to your doorstep',
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 40 }} className="text-primary-500" />,
    title: 'Secure Shopping',
    description: 'Your security is our top priority',
  },
  {
    icon: (
      <SupportAgentIcon sx={{ fontSize: 40 }} className="text-primary-500" />
    ),
    title: '24/7 Support',
    description: 'Round-the-clock customer assistance',
  },
  {
    icon: <PaymentIcon sx={{ fontSize: 40 }} className="text-primary-500" />,
    title: 'Easy Payments',
    description: 'Multiple secure payment options',
  },
];

const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container mx-auto my-10 lg:my-16 px-2">
      <Title title="About" content="This is about page." />
      {/* Hero Section */}
      <div className="text-center mb-16">
        <Typography variant="h4" className="font-bold mb-4">
          About Our Company
        </Typography>
        <Typography variant="subtitle1" className="text-gray-600 mx-auto">
          We're dedicated to providing the best shopping experience with quality
          products and exceptional service.
        </Typography>
      </div>

      {/* Mission & Vision */}
      <Grid container spacing={4} className="mb-16">
        <Grid item xs={12} md={6}>
          <Card className="p-6 h-full hover:shadow-lg transition-shadow">
            <Typography
              variant="h5"
              className="font-bold mb-4 text-primary-500"
            >
              Our Mission
            </Typography>
            <Typography className="text-gray-600">
              To provide customers with a seamless shopping experience, offering
              high-quality products at competitive prices while maintaining
              exceptional customer service and satisfaction.
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className="p-6 h-full hover:shadow-lg transition-shadow">
            <Typography
              variant="h5"
              className="font-bold mb-4 text-primary-500"
            >
              Our Vision
            </Typography>
            <Typography className="text-gray-600">
              To become the leading e-commerce platform, recognized for our
              innovation, reliability, and customer-centric approach, while
              contributing positively to the communities we serve.
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Features Section */}
      <div className="mb-16">
        <Typography variant="h4" className="text-center font-bold mb-8">
          Why Choose Us
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card className="p-6 text-center h-full hover:shadow-lg transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <Typography variant="h6" className="font-bold mb-2">
                  {feature.title}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  {feature.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      {/* Team Section */}
      <div>
        <Typography variant="h4" className="text-center font-bold mb-8">
          Meet Our Team
        </Typography>
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <Avatar
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 mx-auto mb-4"
                />
                <Typography variant="h6" className="font-bold mb-1">
                  {member.name}
                </Typography>
                <Typography
                  variant="subtitle2"
                  className="text-primary-500 mb-2"
                >
                  {member.position}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  {member.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default About;
