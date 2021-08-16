function returnClass(){
    return TestClass;
}


class TestClass {
    constructor(str){
        this.vars = str;
    }
}


const Yo = returnClass();

var hey1 = new Yo('111');
var hey2 = new Yo('2');

console.log(hey1.vars);
console.log(hey2.vars);
