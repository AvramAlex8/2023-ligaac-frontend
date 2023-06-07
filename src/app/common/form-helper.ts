import { FormControl } from "@angular/forms";

export function FormControlHasError<T>(formControl: FormControl<T>, errorKey: string) {
    return formControl.touched && formControl.hasError(errorKey);
}