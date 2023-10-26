// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-error-modal',
//   templateUrl: './error-modal.component.html',
//   styleUrls: ['./error-modal.component.css']
// })
// export class ErrorModalComponent {

// }
// error-modal.component.ts
// import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
// import { ModalService } from 'src/app/shared/modal.service';

// @Component({
//   selector: 'app-error-modal',
//   templateUrl: './error-modal.component.html',
//   styleUrls: ['./error-modal.component.css']
// })
// export class ErrorModalComponent implements DoCheck {
//   errorMessage!: string;

//   constructor(private modalService: ModalService) { }

//   ngDoCheck(): void {
//     this.modalService.errorMessage.subscribe((message) => {
//       this.errorMessage = message;
//       $('#errorModal').modal('show'); // Show the modal when an error message is set
//     });
//   }

//   closeErrorModal() {
//     $('#errorModal').modal('hide'); // Close the modal
//   }
// }
// error-modal.component.ts
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/modal.service';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent implements OnInit {
  errorMessage: string = '';
  showMessage: boolean = false; // Add a flag to control when to show the modal

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    this.modalService.errorMessage.subscribe((message) => {
      this.errorMessage = message;

      // Set the flag to true only if there is a non-empty error message
      this.showMessage = !!message;

      // Show or hide the modal based on the flag
      if (this.showMessage) {
        $('#errorModal').modal('show');
      } else {
        $('#errorModal').modal('hide');
      }
    });
  }

  closeErrorModal() {
    // Hide the modal and set the flag to false
    $('#errorModal').modal('hide');
    this.showMessage = false;
  }
}

