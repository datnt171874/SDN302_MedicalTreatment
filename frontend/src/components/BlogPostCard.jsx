import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box
} from '@mui/material';

const BlogPostCard = ({ post }) => {
  return (
    <Card sx={{
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
      },
      borderRadius: '8px',
      overflow: 'hidden',
      height: '100%',
    }}>
      <CardMedia
        component="img"
        sx={{
          width: { xs: '100%', sm: 160 },
          height: { xs: 180, sm: '100%' },
          objectFit: 'cover',
        }}
        image={post.image}
        alt={post.title}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box>
          <Typography gutterBottom variant="h6" component="div" sx={{ color: 'text.primary', fontWeight: 'bold' }}>
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
            {post.description}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button size="small" color="primary" variant="text">
            Đọc thêm
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BlogPostCard; 