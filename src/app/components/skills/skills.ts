import { AfterViewInit, Component, ElementRef, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Skill {
  name: string;
  icon: string;
  custom: boolean;
  customKey?: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class SkillsComponent implements AfterViewInit {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);

  readonly skills: Skill[] = [
    { name: 'Angular', icon: 'devicon-angularjs-plain colored', custom: false },
    { name: 'TypeScript', icon: 'devicon-typescript-plain colored', custom: false },
    { name: 'HTML5', icon: 'devicon-html5-plain colored', custom: false },
    { name: 'CSS3', icon: 'devicon-css3-plain colored', custom: false },
    { name: 'JavaScript', icon: 'devicon-javascript-plain colored', custom: false },
    { name: 'Bootstrap', icon: 'devicon-bootstrap-plain colored', custom: false },
    { name: '.NET', icon: 'devicon-dotnetcore-plain colored', custom: false },
    { name: 'C#', icon: 'devicon-csharp-plain colored', custom: false },
    { name: 'SQL Server', icon: 'devicon-microsoftsqlserver-plain colored', custom: false },
    { name: 'Azure', icon: 'devicon-azure-plain colored', custom: false },
    { name: 'Git', icon: 'devicon-git-plain colored', custom: false },
    { name: 'GitHub', icon: 'devicon-github-original', custom: false },
    { name: 'Claude AI', icon: 'claude', custom: true, customKey: 'claude' },
    { name: 'ChatGPT', icon: 'chatgpt', custom: true, customKey: 'chatgpt' },
    { name: 'IIS', icon: 'iis', custom: true, customKey: 'iis' },
  ];

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const cards = this.el.nativeElement.querySelectorAll('.skill-card') as NodeListOf<HTMLElement>;

    cards.forEach((card, i) => {
      card.classList.add('reveal');
      card.style.transitionDelay = `${i * 45}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    cards.forEach((card) => observer.observe(card));
  }

  onTilt(e: MouseEvent): void {
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg) translateZ(10px) scale(1.04)`;
  }

  onTiltLeave(e: MouseEvent): void {
    const card = e.currentTarget as HTMLElement;
    card.style.transition = 'transform 0.45s ease';
    card.style.transform = '';
    setTimeout(() => {
      card.style.transition = '';
    }, 450);
  }
}
