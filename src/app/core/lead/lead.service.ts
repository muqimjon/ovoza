import { Injectable } from '@angular/core';

export interface LeadPayload {
  name: string;
  phone: string;
  telegram?: string;
  business?: string;
  message?: string;
  quizSummary?: string;
  quizAnswers?: string[];
  lang: string;
}

@Injectable({ providedIn: 'root' })
export class LeadService {
  async submit(payload: LeadPayload): Promise<boolean> {
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return res.ok;
    } catch {
      return false;
    }
  }
}
