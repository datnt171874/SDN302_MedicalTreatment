import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link as MuiLink,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        color: "#FFFFFF",
        py: 6,
        mt: "auto",
        borderTop: "1px solid",
        borderColor: "primary.light",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#FFFFFF" }}
            >
              Medical Treatment
            </Typography>
            <Typography variant="body2" color="#FFFFFF" sx={{ mb: 2 }}>
              Nâng cao chất lượng cuộc sống cho người nhiễm HIV thông qua thông
              tin và hỗ trợ toàn diện.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton sx={{ color: "#FFFFFF" }} aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton sx={{ color: "#FFFFFF" }} aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton sx={{ color: "#FFFFFF" }} aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton sx={{ color: "#FFFFFF" }} aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#FFFFFF" }}
            >
              Liên kết nhanh
            </Typography>
            <MuiLink
              href="/"
              color="#FFFFFF"
              display="block"
              sx={{ mb: 1, "&:hover": { color: "secondary.main" } }}
            >
              Trang chủ
            </MuiLink>
            <MuiLink
              href="/services"
              color="#FFFFFF"
              display="block"
              sx={{ mb: 1, "&:hover": { color: "secondary.main" } }}
            >
              Dịch vụ
            </MuiLink>
            <MuiLink
              href="/about"
              color="#FFFFFF"
              display="block"
              sx={{ mb: 1, "&:hover": { color: "secondary.main" } }}
            >
              Giới thiệu
            </MuiLink>
            <MuiLink
              href="/testimonial"
              color="#FFFFFF"
              display="block"
              sx={{ mb: 1, "&:hover": { color: "secondary.main" } }}
            >
              Phản hồi
            </MuiLink>
            <MuiLink
              href="/contact"
              color="#FFFFFF"
              display="block"
              sx={{ mb: 1, "&:hover": { color: "secondary.main" } }}
            >
              Liên hệ
            </MuiLink>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#FFFFFF" }}
            >
              Hỗ trợ
            </Typography>
            <MuiLink
              href="/faq"
              color="#FFFFFF"
              display="block"
              sx={{ mb: 1, "&:hover": { color: "secondary.main" } }}
            >
              Câu hỏi thường gặp
            </MuiLink>
            <MuiLink
              href="/privacy"
              color="#FFFFFF"
              display="block"
              sx={{ mb: 1, "&:hover": { color: "secondary.main" } }}
            >
              Chính sách bảo mật
            </MuiLink>
            <MuiLink
              href="/terms"
              color="#FFFFFF"
              display="block"
              sx={{ mb: 1, "&:hover": { color: "secondary.main" } }}
            >
              Điều khoản dịch vụ
            </MuiLink>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#FFFFFF" }}
            >
              Bản tin của chúng tôi
            </Typography>
            <Typography variant="body2" color="#FFFFFF" sx={{ mb: 2 }}>
              Đăng ký để nhận thông tin mới nhất về các tiến bộ điều trị HIV.
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <input
                type="email"
                placeholder="Nhập email của bạn"
                style={{
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid background.paper",
                  width: "100%",
                  boxSizing: "border-box",
                  backgroundColor: "background.paper",
                  color: "text.primary",
                }}
              />
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ color: "#FFFFFF" }}
              >
                Đăng ký
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, backgroundColor: "rgba(255, 255, 255, 0.2)" }} />

        <Typography variant="body2" align="center" color="#FFFFFF">
          © {new Date().getFullYear()} Medical Treatment. Tất cả quyền được bảo
          lưu. Thiết kế bởi Medical Treatment.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
