
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedBackgroundProps {
  className?: string;
  intensity?: "light" | "medium" | "strong";
  color?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  className,
  intensity = "light",
  color = "primary",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const intensityValues = {
    light: { particles: 25, opacity: 0.2, size: 5 },
    medium: { particles: 40, opacity: 0.3, size: 6 },
    strong: { particles: 70, opacity: 0.4, size: 7 },
  };
  
  const colorValues = {
    primary: "var(--primary)",
    accent: "var(--accent)",
    muted: "var(--muted-foreground)",
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let animationFrameId: number;
    let particles: { x: number; y: number; radius: number; vx: number; vy: number; opacity: number }[] = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    
    const initParticles = () => {
      particles = [];
      const { particles: particleCount } = intensityValues[intensity];
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * intensityValues[intensity].size + 1,
          vx: Math.random() * 0.2 - 0.1,
          vy: Math.random() * 0.2 - 0.1,
          opacity: Math.random() * 0.5 + intensityValues[intensity].opacity,
        });
      }
    };
    
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(var(--${color}), ${particle.opacity})`;
        ctx.fill();
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -1;
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -1;
        }
      });
      
      animationFrameId = requestAnimationFrame(drawParticles);
    };
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    drawParticles();
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity, color]);
  
  return (
    <canvas
      ref={canvasRef}
      className={cn("fixed inset-0 -z-10 animate-fade-in", className)}
    />
  );
};

export default AnimatedBackground;
