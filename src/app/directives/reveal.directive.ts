import { AfterViewInit, Directive, ElementRef, Input, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements AfterViewInit {
  @Input() revealDelay = 0;

  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const el: HTMLElement = this.el.nativeElement;
    el.classList.add('reveal');

    if (this.revealDelay > 0) {
      el.style.transitionDelay = `${this.revealDelay}ms`;
    }

    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add('visible');
            obs.unobserve(el);
          }
        }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    obs.observe(el);
  }
}
