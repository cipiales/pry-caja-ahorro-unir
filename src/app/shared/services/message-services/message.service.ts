import { Injectable } from '@angular/core';
export type MessageType = 'error' | 'warning' | 'success';

export class MessageService {
  messages: { text: string; type: MessageType }[] = [];

  add(text: string, type: MessageType = 'error') {
    this.messages.push({ text, type });
  }

  clear() {
    this.messages = [];
  }
}
