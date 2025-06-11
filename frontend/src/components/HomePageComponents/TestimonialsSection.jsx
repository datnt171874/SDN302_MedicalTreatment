import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  IconButton,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const testimonials = [
  {
    id: 1,
    name: 'Nguyễn Thị Lan',
    title: 'Bệnh nhân',
    avatar: 'https://via.placeholder.com/100?text=Lan',
    feedback: 'Tôi rất biết ơn sự hỗ trợ và chăm sóc tận tình từ đội ngũ. Họ đã giúp tôi vượt qua giai đoạn khó khăn và sống tích cực hơn.',
  },
  {
    id: 2,
    name: 'Trần Văn Hùng',
    title: 'Bệnh nhân',
    avatar: 'https://via.placeholder.com/100?text=Hung',
    feedback: 'Thông tin chính xác và sự động viên kịp thời là những gì tôi nhận được. Nhờ đó, tôi đã hiểu rõ hơn về tình trạng của mình và có kế hoạch điều trị hiệu quả.',
  },
  {
    id: 3,
    name: 'Lê Thị Mai',
    title: 'Bệnh nhân',
    avatar: 'https://via.placeholder.com/100?text=Mai',
    feedback: 'Các bác sĩ rất tận tâm và chuyên nghiệp.',
  },
  {
    id: 4,
    name: 'Nguyễn Văn B',
    title: 'Bệnh nhân',
    avatar: 'https://via.placeholder.com/100?text=B',
    feedback: 'Dịch vụ rất tốt, tôi cảm thấy an tâm khi điều trị tại đây.',
  },
  {
    id: 5,
    name: 'Lê Thị C',
    title: 'Bệnh nhân',
    avatar: 'https://via.placeholder.com/100?text=C',
    feedback: 'Tôi cảm thấy không đơn độc khi có sự đồng hành của cộng đồng và các chuyên gia ở đây. Đây thực sự là một nơi an toàn và đáng tin cậy.',
  },
  {
    id: 6,
    name: 'Phạm Văn D',
    title: 'Bệnh nhân',
    avatar: 'https://via.placeholder.com/100?text=D',
    feedback: 'Tôi được tư vấn kỹ lưỡng và hỗ trợ nhiệt tình.',
  },
];

const TestimonialsSection = () => {
  const groupSize = 3;
  const [groupIndex, setGroupIndex] = useState(0);
  const maxGroup = Math.ceil(testimonials.length / groupSize);

  const handlePrev = () => {
    setGroupIndex((prev) => (prev - 1 + maxGroup) % maxGroup);
  };
  const handleNext = () => {
    setGroupIndex((prev) => (prev + 1) % maxGroup);
  };

  const start = groupIndex * groupSize;
  const currentTestimonials = testimonials.slice(start, start + groupSize);

  return (
    <Box sx={{
      backgroundColor: 'background.default',
      py: 14,
    }}>
      <Container maxWidth={false} sx={{ px: { xs: 5, md: 12 } }}>
        <Typography 
          variant="h3" 
          component="h2" 
          align="center" 
          gutterBottom 
          sx={{ mb: 6, fontWeight: 'bold', color: 'primary.main', fontSize: { xs: 32, md: 40 } }}
        >
          Our Patients' Feedback
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
          <IconButton onClick={handlePrev} sx={{ mx: 2, bgcolor: 'primary.main', color: '#fff', '&:hover': { bgcolor: 'primary.dark' } }}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <Grid container spacing={4} justifyContent="center">
            {currentTestimonials.map((testimonial) => (
              <Grid item key={testimonial.id} xs={12} sm={6} md={4}>
                <Card elevation={1} sx={{
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  borderRadius: '8px',
                  minHeight: 220,
                  height: '100%',
                  bgcolor: 'background.paper',
                }}>
                  <Avatar 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    sx={{ width: 80, height: 80, mb: 2, border: '3px solid', borderColor: 'primary.main' }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    {testimonial.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {testimonial.title}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {testimonial.feedback}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
          <IconButton onClick={handleNext} sx={{ mx: 2, bgcolor: 'primary.main', color: '#fff', '&:hover': { bgcolor: 'primary.dark' } }}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;
