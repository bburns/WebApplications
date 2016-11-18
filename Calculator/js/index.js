var calc = (function() {

  var display = '0';
  var acc = null;
  var newnum = '';
  var op = '';
  
  const NDIGITS = 10;

  var appendDigit = (key) => {
    newnum += key;
    display = newnum;
    if (display.length > NDIGITS) {
      display = "ERR";
      newnum = '';
    }
  };

  var appendDecimal = () => {
    if (newnum.indexOf('.')==-1) {
      newnum += '.';
      display = newnum;
    }
  }
  
  var setOp = (key) => {
    op = key;
    if (newnum) {
      if (acc===null) {
        acc = Number(newnum);
        display = newnum;
        newnum = '';
      }
      else {
        equals();
      }
    }
  };

  var calcPercent = () => {
    // When the user enters a value, an operator, a second value, 
    // and then the percent key, the first two values are multiplied 
    // and the product divided by 100, and that result replaces the
    // second value in the ongoing computation.     
    var num = Number(newnum);
    var product = acc * num / 100;
    newnum = String(product);
    display = newnum;
  };
  
  var equals = () => {
    var num = Number(newnum);
    switch (op) {
      case '+':
        acc = acc + num;
        break;
      case '-':
        acc = acc - num;
        break;
      case '*':
        acc = acc * num;
        break;
      case '/':
        acc = acc / num;
        break;
    }
    newnum = '';
    display = acc;
  };

  return {
    press: function(key) {
      switch (key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          appendDigit(key);
          break;
        case '.':
          appendDecimal();
          break;
        case '+':
        case '-':
        case '*':
        case '/':
          setOp(key);
          break;
        case '%':
          calcPercent();
          break;
        case '=':
          equals();
          break;
        case 'CE':
          newnum = '';
          display = '0';
          break;
        case 'AC':
          acc = null;
          newnum = '';
          op = '';
          display = '0';
          break;
      }
      this.display();
    },

    display: function() {
      console.log(display);
      var truncated = String(display).slice(0, NDIGITS);
      $('#display').text(truncated);
    }
  };
})();

$(document).ready(function() {
  $("body").click(function(e) {
    var btn = $(e.target).text(); // eg "7"
    calc.press(btn);
  });
});