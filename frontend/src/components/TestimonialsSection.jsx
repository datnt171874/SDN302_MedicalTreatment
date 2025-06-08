import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';

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
    feedback: 'Tôi cảm thấy không đơn độc khi có sự đồng hành của cộng đồng và các chuyên gia ở đây. Đây thực sự là một nơi an toàn và đáng tin cậy.',
  },
];

const TestimonialsSection = () => {
  return (
    <Box sx={{
      backgroundColor: 'background.default',
      py: 8,
    }}>
      <Container maxWidth="lg">
        <Typography variant="h3" color="primary.main" component="h2" align="center" gutterBottom sx={{ mb: 6 }}>
          Phản hồi từ bệnh nhân của chúng tôi
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {testimonials.map((testimonial) => (
            <Grid item key={testimonial.id} xs={12} sm={6} md={4}>
              <Card elevation={1} sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                borderRadius: '8px',
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
      </Container>
    </Box>
  );
};

export default TestimonialsSection; 