//Object declarations:

/*Msm: The measurement type. This object stores two values and a function:
  * value -  an integer/double/real
  * unit  -  a Unit
  * f(toString) - Converts the Msm to a string for humans/LaTeX.

  */
function Msm(value, unit) {
  this.value = value;
  this.unit = unit;
  this.toString = function() {
    return this.value.toString() + " " + this.unit.disp;
  };
}

/*Unit: The unit type. Stores a display value, programmatic value, and a list of equivalents.
 *
 */
function Unit(disp, intrinsicVal, equivalents, exp) {
  this.disp = disp;
  this.intrinsicVal = intrinsicVal;
  this.equivalents = equivalents;
  this.exp = exp;
}

//Operator Enum List
var Operators = {
  PLUS: '+',
  MINUS: '-',
  DIVIDE: '/',
  MULTIPLY: '*'
};

//Conversion functions
function combineUnit(unit1, op, unit2) {
  if (op == Operators.DIVIDE || op == Operators.MULTIPLY) {

    if (unit1.intrinsicVal == unit2.intrinsicVal) {
      var em;
      if(op == Operators.MULTIPLY){
        em = (unit1.exp + unit2.exp);
      }else{
        em = (unit1.exp - unit2.exp);
      }
      var dsem;
      if(em == 1){
        dsem = unit1.intrinsicVal + "";
      }else if(em === 0){
        dsem = "";
      }else{
        dsem = "^" + em.toString();
      }
      return new Unit(
        dsem,
        unit1.intrinsicVal,
        unit1.equivalents,
        unit1.exp + unit2.exp
      );
    } else {

      return new Unit(
        '(' + unit1.disp + ')' + op + unit2.disp,
        unit1.disp + op + unit2.disp, [] //search for equivalents
      );
    }

  } else if ((unit1.intrinsicVal == unit2.intrinsicVal) && (op == Operators.PLUS || op == Operators.MINUS)) {
    return unit1;
  }
}

function operatorHandle(mes1, op, mes2) {
  switch (op) {
    case '+':
      return mes1.value + mes2.value;
      //break;
    case '-':
      return mes1.value - mes2.value;
    case '*':
      return mes1.value * mes2.value;
    case '/':
      return mes1.value / mes2.value;
    default:
      return null;

  }
}

function combine(mes1, op, mes2) {
  return new Msm(operatorHandle(mes1, op, mes2), combineUnit(mes1.unit, op, mes2.unit));
}
var meter = new Unit("meter", "m", [], 1);
var myMeasure = new Msm(20, meter);
var yourMeasure = new Msm(57, meter);
var doubMeter = new Unit("meter^2", "m", [], 2);
var shiteMeasure = new Msm(66, doubMeter);
console.log(myMeasure.toString());

console.log(combine(combine(myMeasure, Operators.MULTIPLY, yourMeasure), Operators.DIVIDE, myMeasure).toString());
