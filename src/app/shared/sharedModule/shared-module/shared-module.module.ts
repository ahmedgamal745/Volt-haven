import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { RouterLink,  } from '@angular/router';
import {ReactiveFormsModule } from '@angular/forms';
import {  NgxSpinnerModule } from 'ngx-spinner';
import { AutoFocusModule } from 'primeng/autofocus';

@NgModule({
  declarations: [],
  imports: [
    ReactiveFormsModule, PanelModule, ButtonModule,
    InputTextModule, RouterLink, ToastModule, CommonModule,
    MessagesModule, MessageModule, RouterLink,NgxSpinnerModule,AutoFocusModule
  ],
  exports:[
    ReactiveFormsModule, PanelModule, ButtonModule,
    InputTextModule, RouterLink, ToastModule, CommonModule,
    MessagesModule, MessageModule, RouterLink,NgxSpinnerModule,AutoFocusModule
  ]
})
export class SharedModuleModule { }
