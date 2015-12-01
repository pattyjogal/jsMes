//Defining the unit type

function Msm(value, unit){
  this.value = value;
  this.unit = unit;
}

function Unit(disp, intrinsicVal, equivalents){
  this.disp = disp;
  this.intrinsicVal = intrinsicVal;
  this.equivalents = equivalents;
}

//Operator Enum List
var Operators = {
  PLUS: '+',
  MINUS: '-',
  DIVIDE: '/',
  MULTIPLY: '*'
}

//Conversion functions
function combineUnit(unit1, op, unit2){

      return new Unit(
          unit1.disp + op + unit2,
          unit1.disp + op + unit2,
          [] //search for equivalents
      )

  }

  function combine(mes1, op, mes2){
    return new Msm(
      switch (op) {
        case '+':
          mes1.value + mes2.value;
          break;
        case '-':
          mes1.value - mes2.value;
        default:

      }
    )
  }
