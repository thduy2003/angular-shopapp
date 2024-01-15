import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmitService {
  userChanged = new EventEmitter<void>();
  constructor() { }
  notifyUserChanged(): void {
    this.userChanged.emit();
  }
}
