import { ActionDirective } from './action.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ActionDirective],
  imports: [CommonModule],
  exports: [ActionDirective],
})
export class ActionModule {}
