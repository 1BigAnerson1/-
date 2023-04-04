const appendBlock = (block) => document.getElementById("app").appendChild(block);

Const randomRange = (min =

const createBlock = (x,y, size, color) => {
    const result = document.createElement("div");
    if (color) {
        result.style.backgroundColor = color;
    } else {
        const isNotEmpty = Math.random() > 0.5;
        if (isNotEmpty) {
            result.style.backgroundColor = "black";
        }
    }
    result.style.backgroundColor = "black";
    result.style.windth = "50px";
    result.style.height = "50px";
    result.style.position = "absolute";
    result.style.left = `${x}px`;
    result.style.top = `${y}px`;
    return result;
};

const BLOCK_SIZE = 50;

let columns = 5;
let xPos = 0;
let yPos = 0;

const line = [];


while(columns-- > 0) {
    const block = createBlock(xPos, yPos, BLOCK_SIZE);
    line.push(block);
}

line.reverse(). forEach((block) => {
    xPos += BLOCK_SIZE;

})

   xPos += BLOCK_SIZE;
   appendBlock (block);
   document.getElementById("app").appendChild(block);
}

const block = createBlock();

document.getElementById("app").appendChild(block);