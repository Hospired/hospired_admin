"use client";

import * as React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <Box
        sx={{
          display: { xs: "flex", lg: "grid" },
          flexDirection: "column",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            justifyContent: "center",
            px: 4,
          }}
        >
          <Box
            sx={{
              maxWidth: 420,
              width: "100%",
              mx: "auto",
              alignItems: "center",
            }}
          >
            <Image
              src="/hospired.png"
              alt="Logo"
              width={300}
              height={300}
              style={{ marginRight: 60, marginLeft: 60 }}
            />
            {children}
          </Box>
        </Box>

        <Box
          sx={{
            alignItems: "center",
            background:
              "radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)",
            color: "white",
            display: { xs: "none", lg: "flex" },
            justifyContent: "center",
            p: 6,
          }}
        >
          <Stack spacing={3} maxWidth={400} textAlign="center">
            <Typography variant="h4" fontWeight="bold">
              Bienvenido a{" "}
              <Box component="span" sx={{ color: "#15b79e" }}>
                Tu Dashboard
              </Box>
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.8 }}>
              Dale Seguimientos a tus citas medicas
            </Typography>
            {/* TODO */}
            {/*<Box component="img" src="/placeholder.png" alt="Auth Widgets" />*/}
          </Stack>
        </Box>
      </Box>
    </>
  );
};
