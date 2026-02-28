import { AfterViewInit, Component, ElementRef, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AboutComponent } from "../about/about";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, AboutComponent],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class ContactComponent implements AfterViewInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);

  sending = signal(false);
  sent = signal(false);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(20)]],
  });

  get name() {
    return this.form.get('name')!;
  }

  get email() {
    return this.form.get('email')!;
  }

  get message() {
    return this.form.get('message')!;
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

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

    this.el.nativeElement.querySelectorAll('.reveal').forEach((el: Element) => observer.observe(el));
  }

  private readonly WEB3FORMS_KEY = 'TU_ACCESS_KEY_AQUI';

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.sending.set(true);

    const { name, email, message } = this.form.value;

    this.http
      .post('https://api.web3forms.com/submit', {
        access_key: this.WEB3FORMS_KEY,
        name: name ?? '',
        email: email ?? '',
        message: message ?? '',
      })
      .subscribe({
        next: () => {
          this.sending.set(false);
          this.sent.set(true);
          this.form.reset();
        },
        error: () => {
          this.sending.set(false);
        },
      });
  }
}
