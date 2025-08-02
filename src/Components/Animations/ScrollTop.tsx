import { useState, useEffect } from "react";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { IconButton } from "@mui/material";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 1

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);
      if (scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        if (scrollTop === 0) {
          sessionStorage.setItem('activeNav', 'Home');
          window.dispatchEvent(new Event('activeNavChanged'));
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Set initial progress
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    sessionStorage.setItem('activeNav', 'Home');
    window.dispatchEvent(new Event('activeNavChanged'));
  };

  // Circular progress parameters
  const size = 48;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - scrollProgress);

  return (
    <IconButton
      onClick={scrollToTop}
      sx={{
        position: "fixed",
        right: { xs: "10px", sm: "20px" },
        bottom: { xs: "10px", sm: "20px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: { xs: "40px", sm: "50px" },
        height: { xs: "40px", sm: "50px" },
        backgroundColor: "rgba(4, 0, 255, 0.3)",
        border: "2px solid black",
        visibility: isVisible ? "visible" : "hidden",
        opacity: isVisible ? 1 : 0,
        transition: "visibility 0.3s ease, opacity 0.3s ease",
        zIndex: 3,
        "&:hover": {
          backgroundColor: "rgba(0, 72, 255, 0.6)",
        },
      }}
    >
      {/* Circular progress background */}
      <svg width={size} height={size} style={{ position: 'absolute', pointerEvents: 'none' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e0e0e0"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1976d2"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.2s linear' }}
        />
      </svg>
      <KeyboardDoubleArrowUpIcon fontSize="small" sx={{ color: 'white', position: 'relative', zIndex: 1 }} />
    </IconButton>
  );
};
export default ScrollToTop;