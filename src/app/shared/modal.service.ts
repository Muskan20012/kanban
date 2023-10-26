// modal.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private errorMessageSubject = new BehaviorSubject<string>(''); // Initialize with an empty string
  errorMessage = this.errorMessageSubject.asObservable();

  constructor() {}

  setErrorMessage(message: string): void {
    this.errorMessageSubject.next(message);
  }
}
