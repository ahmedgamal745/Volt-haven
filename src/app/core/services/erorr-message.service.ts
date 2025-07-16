import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErorrMessageService {

  constructor(private MS: MessageService) {}

  showError(detail: string, summary: string = 'Error') {
    this.MS.add({ severity: 'error', summary, detail });
  }

  showSuccess(detail: string, summary: string = 'Success') {
    this.MS.add({ severity: 'success', summary, detail });
  }

  showInfo(detail: string, summary: string = 'Info') {
    this.MS.add({ severity: 'info', summary, detail });
  }

  showWarn(detail: string, summary: string = 'Warning') {
    this.MS.add({ severity: 'warn', summary, detail });
  }
}