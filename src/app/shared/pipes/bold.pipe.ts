import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'bold'
})
export class BoldPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    //regex to replace any occurrence of **text** with <strong>text</strong>
    const boldRegex = /\*\*(.*?)\*\*/g
    const tranformedValue = value.replace(boldRegex, '<strong>$1</strong>');
    return this.sanitizer.bypassSecurityTrustHtml(tranformedValue)
  }
}
