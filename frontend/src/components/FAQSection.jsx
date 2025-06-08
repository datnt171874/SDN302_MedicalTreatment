import React from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

const faqs = [
  {
    id: 1,
    question: 'HIV lây truyền qua những con đường nào?',
    answer: 'HIV lây truyền chủ yếu qua quan hệ tình dục không an toàn, qua đường máu (tiêm chích ma túy dùng chung kim tiêm, truyền máu không được kiểm soát), và từ mẹ sang con trong quá trình mang thai, sinh nở hoặc cho con bú.',
  },
  {
    id: 2,
    question: 'Có thể phòng ngừa lây nhiễm HIV không?',
    answer: 'Có, có nhiều biện pháp phòng ngừa HIV hiệu quả như sử dụng bao cao su đúng cách, không dùng chung kim tiêm, xét nghiệm HIV định kỳ, và sử dụng thuốc dự phòng trước phơi nhiễm (PrEP) hoặc sau phơi nhiễm (PEP).',
  },
  {
    id: 3,
    question: 'Điều trị ARV là gì và có tác dụng như thế nào?',
    answer: 'Điều trị ARV (thuốc kháng retrovirus) là phương pháp dùng thuốc để kiểm soát sự phát triển của virus HIV trong cơ thể. Điều này giúp giảm lượng virus, tăng cường hệ miễn dịch, cải thiện sức khỏe và giảm nguy cơ lây truyền HIV cho người khác.',
  },
  {
    id: 4,
    question: 'Người nhiễm HIV có thể sống khỏe mạnh không?',
    answer: 'Với sự tiến bộ của y học hiện đại và việc tuân thủ điều trị ARV đúng cách, người nhiễm HIV hoàn toàn có thể sống khỏe mạnh, có tuổi thọ gần như người bình thường và có cuộc sống chất lượng cao.',
  },
  {
    id: 5,
    question: 'Làm thế nào để nhận được hỗ trợ tâm lý và cộng đồng?',
    answer: 'Bạn có thể tìm kiếm sự hỗ trợ tâm lý từ các chuyên gia sức khỏe, tham gia các nhóm hỗ trợ người nhiễm HIV, hoặc liên hệ với các tổ chức cộng đồng chuyên về HIV/AIDS để được tư vấn và kết nối.',
  },
];

const FAQSection = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{
      backgroundColor: 'background.default',
      py: 8,
    }}>
      <Container maxWidth="md">
        <Typography variant="h3" color="primary.main" component="h2" align="center" gutterBottom sx={{ mb: 6}}>
          Các câu hỏi thường gặp
        </Typography>

        <Box>
          {faqs.map((faq) => (
            <Accordion 
              key={faq.id} 
              expanded={expanded === `panel${faq.id}`} 
              onChange={handleChange(`panel${faq.id}`)}
              elevation={1}
              sx={{ mb: 2, borderRadius: '8px' }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon color="primary" />}
                aria-controls={`panel${faq.id}bh-content`}
                id={`panel${faq.id}bh-header`}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" color="text.secondary">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FAQSection; 