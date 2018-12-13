import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'apidocsPath'
})

@Injectable()

export class ApiDocsPathPipe implements PipeTransform {

  transform(value: any) {
    if (value) {
      return value.slice(4);
    }
    return value;
  }

}
