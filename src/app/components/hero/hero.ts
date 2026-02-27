import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private platformId = inject(PLATFORM_ID);
  private particles: Particle[] = [];
  private mouse = { x: -9999, y: -9999 };
  private raf = 0;
  private typingTimer!: ReturnType<typeof setTimeout>;
  private resizeHandler!: () => void;
  private mouseMoveHandler!: (e: MouseEvent) => void;

  displayText = signal('');

  private readonly words = [
    'Fullstack Developer',
    'Angular Specialist',
    '.NET Engineer',
    'Cloud Architect',
  ];
  private wordIdx = 0;
  private charIdx = 0;
  private deleting = false;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.setupCanvas();
    this.type();
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.raf) cancelAnimationFrame(this.raf);
    if (this.typingTimer) clearTimeout(this.typingTimer);
    if (this.resizeHandler) window.removeEventListener('resize', this.resizeHandler);
    if (this.mouseMoveHandler) window.removeEventListener('mousemove', this.mouseMoveHandler);
  }

  private setupCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      this.initParticles(canvas.width, canvas.height);
    };

    setSize();

    this.resizeHandler = setSize;
    this.mouseMoveHandler = (e: MouseEvent) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    };

    window.addEventListener('resize', this.resizeHandler);
    window.addEventListener('mousemove', this.mouseMoveHandler);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.updateAndDraw(ctx, canvas.width, canvas.height);
      this.raf = requestAnimationFrame(draw);
    };

    draw();
  }

  private initParticles(w: number, h: number): void {
    const count = Math.min(130, Math.floor((w * h) / 9000));
    this.particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.45 + 0.1,
    }));
  }

  private updateAndDraw(ctx: CanvasRenderingContext2D, w: number, h: number): void {
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const d = Math.sqrt(dx * dx + dy * dy);

      if (d < 200 && d > 0) {
        const f = ((200 - d) / 200) * 0.28;
        p.vx += (dx / d) * f;
        p.vy += (dy / d) * f;
      }

      p.vx *= 0.96;
      p.vy *= 0.96;
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) { p.x = 0; p.vx *= -1; }
      if (p.x > w) { p.x = w; p.vx *= -1; }
      if (p.y < 0) { p.y = 0; p.vy *= -1; }
      if (p.y > h) { p.y = h; p.vy *= -1; }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,212,255,${p.alpha})`;
      ctx.fill();

      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx2 = p.x - p2.x;
        const dy2 = p.y - p2.y;
        const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0,212,255,${0.14 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  private type(): void {
    const word = this.words[this.wordIdx];
    if (!this.deleting) {
      this.displayText.set(word.slice(0, this.charIdx + 1));
      this.charIdx++;
      if (this.charIdx === word.length) {
        this.deleting = true;
        this.typingTimer = setTimeout(() => this.type(), 2200);
        return;
      }
    } else {
      this.displayText.set(word.slice(0, this.charIdx - 1));
      this.charIdx--;
      if (this.charIdx === 0) {
        this.deleting = false;
        this.wordIdx = (this.wordIdx + 1) % this.words.length;
      }
    }
    this.typingTimer = setTimeout(() => this.type(), this.deleting ? 50 : 105);
  }

  scrollToSection(id: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}
