const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const lineWidth = document.querySelector('#line-width');
const colorInput = document.querySelector('#color');
const colorOption = Array.from(document.getElementsByClassName('color-option')); 
const modeBtn = document.getElementById('mode-btn');
const destroyBtn = document.getElementById('destroy-btn');
const eraseBtn = document.getElementById('esrase-btn');
const file = document.getElementById('file');
const textInput = document.getElementById('text');
const saveBtn = document.getElementById('save');
const fontSizeInput = document.getElementById('font-size');


const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

let isPainting = false;
let isFilling = false;
let fontSize = 0;

function onMove(e) {
    if(isPainting) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        return;
    }
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}

function onCanvasFill(e) {
    if(isFilling) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.fill();
        
        return;
    }
}

function startPainting(e) {
    isPainting = true;
}

function cancelPainting(e) {
    isPainting = false;
}

function onLineWidthChange(e) {
    ctx.lineWidth = e.target.value;
}

function onColorChange(e) {
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
}

function onColorClick(e) {
    const colorValue = e.target.dataset.color;

    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    colorInput.value = colorValue;
}

function onModeClick(e) {
    if(isFilling) {
        isFilling = false;
        modeBtn.innerText = '색채우기';
    } else {
        isFilling = true;
        modeBtn.innerText = '선그리기';
    }
} 

// function onCanvasClick() {
//     if(isFilling) {
//         ctx.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
//     }
// }

function onDestroyClick() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraseClick() {
    ctx.strokeStyle = '#fff';
    isFilling = false;
    modeBtn.innerText = '색채우기';
}

function onFileChange(e) {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);

    const image = new Image();

    image.src = url;
    image.onload = function() {
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

}

function onDoubleClick (e) {
    const text = textInput.value;
    if(text !== "") {
        ctx.save(); // 현재의 ctx 의 상태를 저장
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.font = `${fontSize}px serif`;
        ctx.fillText(text, e.offsetX, e.offsetY);
        ctx.restore();
    }
}

function onSaveClick() {
    const url = canvas.toDataURL();
    const a = document.createElement('a');
    a.href= url;
    a.download = "myDrwaing.png";
    a.click();
}

function onFontSizeChange(e) {
    fontSize = e.target.value;
}

canvas.addEventListener('dblclick', onDoubleClick);
canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', cancelPainting);
canvas.addEventListener('mouseup', onCanvasFill);
canvas.addEventListener('mouseleave', cancelPainting);
// canvas.addEventListener('click', onCanvasClick);

lineWidth.addEventListener('change', onLineWidthChange);
colorInput.addEventListener('change', onColorChange);

colorOption.forEach((color) => {
    color.addEventListener('click', onColorClick);
});

modeBtn.addEventListener('click', onModeClick);
destroyBtn.addEventListener('click', onDestroyClick);
eraseBtn.addEventListener('click', onEraseClick);

file.addEventListener('change', onFileChange);
save.addEventListener('click', onSaveClick);
fontSizeInput.addEventListener('change', onFontSizeChange);