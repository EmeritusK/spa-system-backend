// src/validations/cedula/cedula-validator.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class IdNumberValidatorService {
  validate(idNumber: string): boolean {
    return this.validateWithAlgorithm(idNumber);
  }

  private validateWithAlgorithm(idNumber: string): boolean {
    console.log('idNumber', idNumber);
    // Aquí va tu algoritmo complejo
    if (!/^[0-9]{10}$/.test(idNumber)) return false;

    // Ejemplo: validación tipo ecuatoriana (solo como idea)
    const digits = idNumber.split('').map(Number);
    const province = parseInt(idNumber.substring(0, 2));
    const thirdDigit = digits[2];

    if (province < 1 || province > 24 || thirdDigit > 6) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      let val = digits[i];
      if (i % 2 === 0) {
        val *= 2;
        if (val > 9) val -= 9;
      }
      sum += val;
    }

    const verifier = (10 - (sum % 10)) % 10;
    return verifier === digits[9];
  }
}
