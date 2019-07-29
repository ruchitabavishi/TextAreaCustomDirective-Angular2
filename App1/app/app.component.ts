import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div>
  <h1>
    Welcome to {{ title }}!
  </h1>
  <my-textArea></my-textArea>
  </div>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TextArea App';
}
