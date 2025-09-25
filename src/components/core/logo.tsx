// src/components/core/logo.tsx
"use client";

import * as React from "react";

interface LogoProps {
    color?: "light" | "dark";
    height?: number;
    width?: number;
}

export function Logo({ color = "light", height = 32, width = 122 }: LogoProps) {
    const fill = color === "light" ? "#fff" : "#000";
    return (
        <svg
        width={width}
        height={height}
        viewBox="0 0 122 32"
        xmlns="http://www.w3.org/2000/svg"
        >
        <rect width="100%" height="100%" fill={fill} rx="4" />
        <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy=".35em"
            fontSize="14"
            fill={color === "light" ? "#000" : "#fff"}
        >
            LOGO
        </text>
        </svg>
    );
}
