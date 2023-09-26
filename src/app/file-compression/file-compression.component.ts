import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-file-compression',
  templateUrl: './file-compression.component.html',
})
export class FileCompressionComponent {
  selectedFiles: File[] = [];
  showSuccessMessage: boolean = false;

  onFileChange(event: any) {
    this.selectedFiles = event.target.files;
  }

  compressAndDownload() {
    if (this.selectedFiles.length === 0) {
      return;
    }

    const formData = new FormData();

    for (const file of this.selectedFiles) {
      formData.append('files', file);
    }

    axios
      .post('http://localhost:8080/api/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob', // Specify response type as blob
      })
      .then((response) => {
        // Handle success response from the backend
        this.showSuccessMessage = true;



      })
      .catch((error) => {
        // Handle error response from the backend
        console.error(error);
      });
  }
}
