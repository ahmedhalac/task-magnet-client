import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, AppRoutingModule],
  exports: [FooterComponent],
})
export class SharedModule {}
