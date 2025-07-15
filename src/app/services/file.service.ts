import {Injectable} from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FileService {

  constructor(private http: HttpClient) {}
 private url='http://10.0.176.247:8080/fileupload';
 private urlLocal='http://localhost:4200';


 downloadFile(): any {
		return this.http.get(this.urlLocal, {responseType: 'blob'});
  }


  onFileUpload(selectedFile:any ,selectedFileName:string) {
      const formData: FormData = new FormData();
      formData.append('file', selectedFile, selectedFileName);
      const header  = new HttpHeaders();
      header.append( 'Content-Type', 'multipart/form-data');
      const req = new HttpRequest('POST', this.url, formData, {
          reportProgress: true,
          headers: header
        });


  }
}
