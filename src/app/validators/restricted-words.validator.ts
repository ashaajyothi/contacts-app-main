import { AbstractControl, ValidationErrors } from "@angular/forms";

export function restrictedWords(control: AbstractControl) : ValidationErrors | null{
    return control.value.includes('test')
    ? {restrictedWords : true}
    : null;
}


export function restrictedWords1(words: string[]) {
    return (control: AbstractControl): ValidationErrors | null => {
      const invalidWords = words
        .map(w => control.value.includes(w) ? w : null)
        .filter(w => w !== null);
      return invalidWords.length > 0
        ? { restrictedWords1: invalidWords.join(', ') }
        : null;
    }
  }

