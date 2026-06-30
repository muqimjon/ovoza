import { DOCUMENT, inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class JsonLdService {
  private readonly doc = inject(DOCUMENT);

  set(graph: object[], id = 'ld-graph'): void {
    this.doc.getElementById(id)?.remove();
    const script = this.doc.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.text = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
    this.doc.head.appendChild(script);
  }
}
