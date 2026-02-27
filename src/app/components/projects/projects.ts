import { AfterViewInit, Component, ElementRef, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  demo: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class ProjectsComponent implements AfterViewInit {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);

  readonly projects: Project[] = [
    {
      title: 'Recruiting App',
      description: 'Aplicación de reclutamiento con gestión de postulantes, entrevistas y seguimiento de procesos de selección.',
      image: '/assets/imagenes/hiringapp.png',
      technologies: ['Angular 15', '.NET Core 7'],
      github: 'https://github.com/nietotomas1645/AppRecruit-Front',
      demo: '',
    },
    {
      title: 'Login & Dashboard',
      description: 'Challenge de entrevista técnica con autenticación y dashboard con métricas y gestión de datos.',
      image: '/assets/imagenes/challengeapp.png',
      technologies: ['Angular'],
      github: 'https://github.com/nietotomas1645/challenge',
      demo: '',
    },
    {
      title: 'Breaking Bad API',
      description: 'Aplicación que consume la API de Breaking Bad para mostrar personajes, citas y episodios.',
      image: '/assets/imagenes/breakingbad.PNG',
      technologies: ['Angular 13'],
      github: 'https://github.com/nietotomas1645/breakingBad',
      demo: '',
    },
    {
      title: 'Clients Register',
      description: 'Sistema de registro y gestión de clientes con ABM completo, búsqueda y paginación.',
      image: '/assets/imagenes/clientes.PNG',
      technologies: ['Angular 13', '.NET Core 6'],
      github: 'https://github.com/nietotomas1645/RegistroClientes-Frontend',
      demo: '',
    },
    {
      title: 'New Portfolio',
      description: 'Versión anterior de mi portfolio personal desarrollado con Angular.',
      image: '/assets/imagenes/newportfolio.PNG',
      technologies: ['Angular 13'],
      github: 'https://github.com/nietotomas1645/Portfolio2',
      demo: '',
    },
    {
      title: 'BlackJack',
      description: 'Juego de BlackJack por consola con lógica completa de cartas, apuestas y turnos.',
      image: '/assets/imagenes/blackjack.png',
      technologies: ['Python'],
      github: 'https://github.com/nietotomas1645/Blackjack-Python',
      demo: '',
    },
    {
      title: 'Crud Students',
      description: 'Aplicación de escritorio para gestión de alumnos con operaciones CRUD completas.',
      image: '/assets/imagenes/proyectoabm.PNG',
      technologies: ['C#', '.NET', 'Windows Forms'],
      github: 'https://github.com/nietotomas1645/Crud',
      demo: '',
    },
    {
      title: 'Cousins Web',
      description: 'Sitio web para un emprendimiento familiar, con diseño responsivo y catálogo de productos.',
      image: '/assets/imagenes/cousins.PNG',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/nietotomas1645/Cousins-Web',
      demo: '',
    },
    {
      title: 'Old Portfolio',
      description: 'Primera versión de mi portfolio personal, desarrollado con HTML, CSS y JavaScript puro.',
      image: '/assets/imagenes/portfolioo.PNG',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/nietotomas1645/Portfolio',
      demo: '',
    },
  ];

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const cards = this.el.nativeElement.querySelectorAll('.project-card') as NodeListOf<HTMLElement>;

    cards.forEach((card, i) => {
      card.classList.add('reveal');
      card.style.transitionDelay = `${i * 100}ms`;
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
}
