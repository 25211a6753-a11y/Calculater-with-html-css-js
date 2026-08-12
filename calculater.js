const fun = document.querySelectorAll(".fun");
const dis = document.querySelector(".dis");
const num = document.querySelectorAll(".num");
const equal = document.getElementById("equal");
const oper = document.querySelectorAll(".oper");

const par1 = document.getElementById("par1");
const par2 = document.getElementById("par2");

const shift = document.getElementById("shift");
const ac = document.getElementById("m");
const on = document.getElementById("on");

const del = document.getElementById("l");
const dot = document.getElementById("dot");
const root=document.getElementById("root");
let calculatorOn = true;
let shiftOn = false;


// =============================
// ON
// =============================

on.addEventListener("click", () => {

    calculatorOn = true;
    shiftOn = false;

    dis.textContent = "";

    shift.style.backgroundColor = "";

    document.querySelectorAll("button").forEach(button => {
        button.disabled = false;
    });

});


// =============================
// SHIFT
// =============================

shift.addEventListener("click", () => {

    if (!calculatorOn) return;

    shiftOn = !shiftOn;

    if (shiftOn) {
        shift.style.backgroundColor = "green";
    } else {
        shift.style.backgroundColor = "";
    }

});


// =============================
// AC
// =============================

ac.addEventListener("click", () => {

    if (!calculatorOn) return;

    // SHIFT + AC = OFF
    if (shiftOn) {

        calculatorOn = false;
        shiftOn = false;

        dis.textContent = "OFF";

        shift.style.backgroundColor = "";

        document.querySelectorAll("button").forEach(button => {

            if (button !== on) {
                button.disabled = true;
            }

        });

        return;
    }

    // Normal AC
    dis.textContent = "";

});


// =============================
// DELETE
// =============================

del.addEventListener("click", () => {

    if (!calculatorOn) return;

    dis.textContent = dis.textContent.slice(0, -1);

});


// =============================
// NUMBERS
// =============================

num.forEach(button => {

    button.addEventListener("click", () => {

        if (!calculatorOn) return;

        dis.textContent += button.textContent;

    });

});


// =============================
// DOT
// =============================

dot.addEventListener("click", () => {

    if (!calculatorOn) return;

    dis.textContent += dot.textContent;

});
//root
root.addEventListener("click",()=>{
    if(!calculatorOn) return;
    dis.textContent+=root.textContent;
});
//root
equal.addEventListener("click",()=>{

});


// OPERATORS


oper.forEach(button => {

    button.addEventListener("click", () => {

        if (!calculatorOn) return;

        dis.textContent += button.textContent;

    });

});



// LEFT PARENTHESIS


par1.addEventListener("click", () => {

    if (!calculatorOn) return;

    dis.textContent += "(";

});



// RIGHT PARENTHESIS


par2.addEventListener("click", () => {

    if (!calculatorOn) return;

    dis.textContent += ")";

});



// SIN / COS / TAN


fun.forEach(button => {

    button.addEventListener("click", () => {

        if (!calculatorOn) return;

        let name = button.textContent.split("(")[0];

        dis.textContent += name + "(";

    });

});



// EQUAL


equal.addEventListener("click", () => {

    if (!calculatorOn) return;

    try {

        let express = dis.textContent;

        // Incomplete sin/cos/tan
        if (
            (
                express.includes("sin(") ||
                express.includes("cos(") ||
                express.includes("tan(")
            ) &&
            !express.endsWith(")")
        ) {

            dis.textContent = "Syntax Error";

            return;
        }


        // SIN
        express = express.replace(
            /sin\(([^)]+)\)/g,
            (match, x) => {
                return Math.sin(
                    Number(x) * Math.PI / 180
                );
            }
        );


        // COS
        express = express.replace(
            /cos\(([^)]+)\)/g,
            (match, x) => {
                return Math.cos(
                    Number(x) * Math.PI / 180
                );
            }
        );


        // TAN
        express = express.replace(
            /tan\(([^)]+)\)/g,
            (match, x) => {
                return Math.tan(
                    Number(x) * Math.PI / 180
                );
            }
        );


        // Operators
        express = express.replaceAll("×", "*");
        express = express.replaceAll("÷", "/");


        // Calculate
        dis.textContent = eval(express);

    } catch (err) {

        dis.textContent = "Error";

    }

});