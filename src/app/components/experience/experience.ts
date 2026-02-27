import { AfterViewInit, Component, ElementRef, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Experience {
  company: string;
  logo: string;
  role: string;
  period: string;
  location: string;
  description: string;
  technologies: string[];
  current: boolean;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class ExperienceComponent implements AfterViewInit {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);

  readonly experiences: Experience[] = [
    {
      company: 'Sidesys IT Solutions',
      logo: '/assets/sidesys.jpg',
      role: 'Full Stack Developer',
      period: 'Oct 2023 — Presente',
      location: 'Remoto, Argentina',
      description:
        'Desarrollo de plataforma de streaming con Angular y .NET 8. Implementación de sistemas de videollamadas y gestión de turnos. Creación de formularios dinámicos y componentes reutilizables. Participación en librería de diseño interna y optimización de rendimiento.',
      technologies: ['Angular', '.NET 8', 'TypeScript', 'SignalR', 'SQL Server'],
      current: true,
    },
    {
      company: 'Rockstar Solution',
      logo: '/assets/rockstar.png',
      role: 'Full Stack Developer',
      period: 'Oct 2022 — Sep 2023',
      location: 'Remoto, Argentina',
      description:
        'Desarrollo de sistemas de gestión de stock e implementación de e-commerce completos. Desarrollo de procesos de web scraping y trabajo con Angular 14 y .NET Core 5.',
      technologies: ['Angular 14', '.NET Core 5', 'TypeScript', 'Web Scraping', 'SQL Server'],
      current: false,
    },
    {
      company: 'E3Stores',
      logo: '/assets/e3.jpg',
      role: 'Full Stack Developer',
      period: 'Oct 2021 — Sep 2022',
      location: 'Remoto, Argentina',
      description:
        'Desarrollo de e-commerce con C# y .NET. Implementación de sistemas de inventario e integración de MercadoPago Checkout Pro. Desarrollo con Razor Pages, JavaScript y SQL Server.',
      technologies: ['C#', '.NET', 'Razor Pages', 'JavaScript', 'SQL Server', 'MercadoPago'],
      current: false,
    },
  ];

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const items = this.el.nativeElement.querySelectorAll('.exp-item') as NodeListOf<HTMLElement>;

    items.forEach((item, i) => {
      item.classList.add('reveal');
      item.style.transitionDelay = `${i * 120}ms`;
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

    items.forEach((item) => observer.observe(item));
  }
}
