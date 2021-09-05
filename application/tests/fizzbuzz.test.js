import fizzbuzz from '../modules/experiments/fizzbuzz.js';

describe('fizzbuzz()',()=>{
    it('should throw Error if input type is not a number',()=>{
        expect(()=>{
            fizzbuzz('5000');
        }).toThrow();
    });

    it('should return Fizzbuzz if input is divisible by 3 and 5',()=>{
        const rslt = fizzbuzz(15);
        expect(rslt).toBe('Fizzbuzz');
    });

    it('should return Fizz if input is divisible by 3',()=>{
        const rslt = fizzbuzz(9);
        expect(rslt).toBe('Fizz');
    });

    it('should return Buzz if input is divisible by 5',()=>{
        const rslt = fizzbuzz(10);
        expect(rslt).toBe('Buzz');
    });
});