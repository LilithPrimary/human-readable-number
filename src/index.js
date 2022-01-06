module.exports = function toReadable (number) {
    if (number === 0) return "zero";
    let numStr = number.toString();
    let result = [];
    let arrOfThree = [];
    let arrOfValues = ["", " thousand", " million", " billion", " trillion"];
    for (let i = 0; i < number.toString().length; i += 3) {
        arrOfThree.push(numStr.slice(-3));
        numStr = numStr.slice(0, -3);
    }

    arrOfThree = arrOfThree.map(Number);

    let cont;
    for (let i = 0; i < arrOfThree.length; i++) {
        if (arrOfThree[i] != 0) {
            switch (arrOfThree[i].toString().length) {
                case 1: cont = units (arrOfThree[i]); break;
                case 2: cont = dozens (arrOfThree[i]).join(" "); break;
                case 3: cont = hundred (arrOfThree[i]).join(" "); break;
            }
            i > 0 ? result.push (cont + arrOfValues[i]) : result.push (cont);
        }
    }

    function units (n) {
        switch (n) {
            case 1: return "one"; break;
            case 2: return "two"; break;
            case 3: return "three"; break;
            case 4: return "four"; break;
            case 5: return "five"; break;
            case 6: return "six"; break;
            case 7: return "seven"; break;
            case 8: return "eight"; break;
            case 9: return "nine"; break;
        }
    }
 
    function dozens (n) {
        switch (n) {
            case 10: return ["ten"]; break;
            case 11: return ["eleven"]; break;
            case 12: return ["twelve"]; break;
            case 14: return ["fourteen"]; break;
            default: {
                switch (+n.toString()[0]) {
                    case 0: return [units (+n.toString()[1])]; break;
                    case 1: return [tyOrTeen (+n.toString()[1]) + "teen"]; break;
                    default: if (+n.toString()[1] != 0)  
                    return [tyOrTeen (+n.toString()[0]) + "ty", units (+n.toString()[1])]
                    else return [tyOrTeen (+n.toString()[0]) + "ty"]
                }
            }
        }

    }
    
    function tyOrTeen (n) { 
        switch (n) {
            case 2: return "twen"; break;
            case 3: return "thir"; break;
            case 4: return "for"; break;
            case 5: return "fif"; break;
            case 6: return "six"; break;
            case 7: return "seven"; break;
            case 8: return "eigh"; break;
            case 9: return "nine"; break;
        }
    }

    function hundred (n) {
        switch (n.toString().length) {
            case 1: return [units(n)]; break;
            case 2: return [...dozens(n)]; break;
            case 3: if (n.toString().slice(1) == 0) {
                        return [units(+n.toString()[0]), "hundred"]
                    } else if (n.toString()[1] != 0)
                            return [units(+n.toString()[0]), "hundred", ...dozens(+n.toString().slice(1))]; 
                            else return [units(+n.toString()[0]), "hundred", units(+n.toString()[2])];
                }
    }
    return result.reverse().join(" ");
}