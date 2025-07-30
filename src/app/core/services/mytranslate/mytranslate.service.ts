import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {  inject,  Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MytranslateService {
 private renderer: Renderer2;
  
  private readonly platformId=inject(PLATFORM_ID)
  private readonly document=inject(DOCUMENT)
   constructor(private translateService: TranslateService, private rendererFactory: RendererFactory2,) {
       this.renderer = this.rendererFactory.createRenderer(null, null);
     if (isPlatformBrowser(this.platformId)) {


      this.translateService.setDefaultLang('en');


       const savedLang = localStorage.getItem('lng');


       if (savedLang) {
         this.translateService.use(savedLang);
       }
       
       
     }
   }

   changeLang(lang: string) {
     
     if (isPlatformBrowser(this.platformId)) {
       localStorage.setItem('lng', lang);
     }

     this.translateService.use(lang);

     this.changeDirection()
   }

   changeDirection():void {
    if(localStorage.getItem('lng') === 'en'){

          this.renderer.setAttribute(this.document.documentElement, 'dir', 'ltr');
    }
    else if (localStorage.getItem('lng') === 'ar') {
   
      this.renderer.setAttribute(this.document.documentElement, 'dir', 'rtl');

    }
  }
}
