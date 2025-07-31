import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OfflineService {

  constructor() { }
  isOffLine:WritableSignal<boolean>=signal(false)

}
