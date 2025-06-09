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
    question: 'How is HIV transmitted?',
    answer: 'HIV is mainly transmitted through unprotected sexual contact, through blood (such as sharing needles for drug injection, unscreened blood transfusions), and from mother to child during pregnancy, childbirth, or breastfeeding.',
  },
  {
    id: 2,
    question: 'Can HIV infection be prevented?',
    answer: 'Yes, there are many effective ways to prevent HIV, such as using condoms correctly, not sharing needles, regular HIV testing, and using pre-exposure (PrEP) or post-exposure (PEP) prophylaxis.',
  },
  {
    id: 3,
    question: 'What is ARV treatment and how does it work?',
    answer: 'ARV (antiretroviral) treatment is the use of medication to control the development of HIV in the body. This helps reduce the amount of virus, strengthen the immune system, improve health, and reduce the risk of transmitting HIV to others.',
  },
  {
    id: 4,
    question: 'Can people living with HIV stay healthy?',
    answer: 'With advances in modern medicine and proper adherence to ARV treatment, people living with HIV can stay healthy, have a near-normal life expectancy, and enjoy a high quality of life.',
  },
  {
    id: 5,
    question: 'How can I get psychological and community support?',
    answer: 'You can seek psychological support from health professionals, join support groups for people living with HIV, or contact community organizations specializing in HIV/AIDS for counseling and connection.',
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
      py: 14,
    }}>
      <Container maxWidth="md">
        <Typography variant="h3" align="center" component="h2" gutterBottom sx={{ mb: 6, fontWeight: 'bold', color: 'primary.main', fontSize: { xs: 32, md: 40 } }}>
          Frequently Asked Questions
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