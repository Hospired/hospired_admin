"use client";

import * as React from "react";
import Image from "next/image";

interface LogoProps {
    width?: number;
    height?: number;
    }

    export function Logo({ width = 122, height = 32 }: LogoProps) {
    return (
        <Image
        src="/logo.svg"
        alt="Logo"
        width={width}
        height={height}
        priority
        />
    );
}
