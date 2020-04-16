import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-control-error',
  templateUrl: './control-error.component.html',
  styleUrls: ['./control-error.component.scss']
})
export class ControlErrorComponent implements OnInit {
  @Input() errors: any;
  @Input() messages: any;
  constructor() { }

  ngOnInit(): void {
  }

  get message() {
    let _message = '';
    if (typeof this.errors !== 'undefined' && typeof this.messages !== 'undefined') {
      for (const error in this.errors) {
        if (this.errors.hasOwnProperty(error) && this.messages.hasOwnProperty(error)) {
          _message = this.messages[error];
          break;
        }
      }
    }
    return _message;
  }

}
