const n = 60;

const activeColor = "rgb(0, 129, 129)";
const passiveColor = "rgb(0, 255, 255)";

let barContainer = document.getElementsByClassName('parent');

let resetArrayBtn = document.getElementById('reset');
resetArrayBtn.addEventListener("click", reset);

let bubblesortBtn = document.getElementById('bubble');
bubblesortBtn.addEventListener("click", bubbleSort);

let quickSortBtn = document.getElementById('quicksort');
quickSortBtn.addEventListener("click", quickSort);

let insertionSortBtn = document.getElementById('insertion');
insertionSortBtn.addEventListener("click", insertionSort);

let mergersortBtn = document.getElementById('mergesort');
mergersortBtn.addEventListener("click", mergersort);

let selectionsortBtn = document.getElementById('selection');
selectionsortBtn.addEventListener("click", selectionSort);

let isSorting = false;

reset();

function reset() {
    if (isSorting) return;
    barContainer[0].innerHTML = "";
    array = [];
    for (let i = 0; i < n; i++) {
        array.push(Math.floor(Math.random() * (401) + 50));
    }
    array.forEach((x, idx) => {
        let innerDiv = document.createElement('div');
        innerDiv.classList.add("bars");
        innerDiv.style.height = `${x}px`;
        innerDiv
        innerDiv.setAttribute('id', 'child' + idx);
        barContainer[0].appendChild(innerDiv);
    })
}



const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function addSortedColor(color = "purple") {
    for (let i = 0; i <= n-1; i++) {
        let el1 = document.getElementById(`child${i}`);
        el1.style.backgroundColor = color;
        await sleep(10);
    }
}

async function bubbleSort() {
    if (isSorting) return;
    if (isSorted()) {
        if (confirm("Already Sorted! Create new array ??"))
            reset();
        return;
    }
    isSorting = true;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            changeColor(j, j + 1)
            await sleep(10);
            if (array[j] > array[j + 1]) {
                swap(j, j+1);
            }
            changeColor(j, j + 1, false);
        }
        let el = document.getElementById(`child${n-i-1}`);
        el.style.backgroundColor = "blue";
    }
    animation();
    isSorting = false;
}

function changeColor(i, j, tog = true) {
    let el1 = document.getElementById(`child${i}`);
    let el2 = document.getElementById(`child${j}`);
    if(tog) {
        if(el1) el1.style.backgroundColor = activeColor;
        if(el2) el2.style.backgroundColor = activeColor;
    } else {
        if(el1) el1.style.backgroundColor = passiveColor;
        if(el2) el2.style.backgroundColor = passiveColor;
    }
}

function swap(i, j) {
    let el1 = document.getElementById(`child${i}`);
    let el2 = document.getElementById(`child${j}`);
    el1.style.height = `${array[j]}px`
    el2.style.height = `${array[i]}px`
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

async function lomutoPartition(lo, hi) {
    let pivot = array[hi];
    let pivotDiv = document.getElementById(`child${hi}`);
    pivotDiv.style.backgroundColor = activeColor;
    let i = lo - 1;
    for (let j = lo; j < hi; j++) {
        let el1 = document.getElementById(`child${j}`);
        el1.style.backgroundColor = activeColor;
        await sleep(50);
        if (array[j] < pivot) {
            i++;
            let el2 = document.getElementById(`child${i}`);
            el2.style.backgroundColor = activeColor;
            await sleep(50);
            el2.style.backgroundColor = passiveColor;
            swap(i, j);
        }
        el1.style.backgroundColor = passiveColor;
    }
    pivotDiv.style.backgroundColor = passiveColor;
    swap(i+1, hi);
    return i+1;
}

async function quickSortHelper(left, right) {
    if (left < right) {
        let pivot = await lomutoPartition(left, right);
        let pivotDiv = document.getElementById(`child${pivot}`);
        pivotDiv.style.backgroundColor = "purple";
        await quickSortHelper(left, pivot-1);
        await quickSortHelper(pivot+1, right);
    }
    else {
        let pivotDiv = document.getElementById(`child${left}`);
        if(pivotDiv !== null)
            pivotDiv.style.backgroundColor = "purple";
    }
}

async function quickSort() {
    if(isSorting) return;
    if (isSorted()) {
        if (confirm("Already Sorted! Create new array ??"))
            reset();
        return;
    }
    isSorting = true;
    await quickSortHelper(0, n-1);
    animation();
    isSorting = false;
}

function isSorted(){
    for(let i=1; i<n; i++){
        if(array[i] < array[i-1]) return false;
    }
    return true;
}

async function insertionSort(){
    if(isSorting) return;
    if (isSorted()) {
        if (confirm("Already Sorted! Create new array ??"))
            reset();
        return;
    }
    isSorting = true;
    
    for(let i=1; i<n; i++){
        let el1 = document.getElementById(`child${i}`);
        el1.style.backgroundColor = "blue";
        let curr = array[i];
        let j = i-1;
        while(j >= 0 && curr < array[j]){
            let el2 = document.getElementById(`child${j}`);
            el2.style.backgroundColor = activeColor;
            await sleep(10);
            array[j+1] = array[j];
            swap(j+1,j);
            changeColor(j, -1, false);
            j--;
        }
        array[j+1] = curr;
        let el3 = document.getElementById(`child${j+1}`);
        el3.style.height = `${curr}px`;
        await sleep(10);
        changeColor(i, -1, false);
    }
    addSortedColor("purple");
    console.log(array);
    isSorting = false;
}

async function merge(lo, mid, hi){
    let n1 = mid - lo + 1;
    let n2 = hi - mid;
    let a = [];
    let b = [];
    for(let i=0; i<n1; i++){
        a.push(array[lo+i]);
    }
    for(let i=0; i<n2; i++){
        b.push(array[mid+1+i]);
    }
    let i=0, j=0; k = lo;

    while(i < n1 && j < n2){
        let ele = document.getElementById(`child${k}`);
        await sleep(20);
        if(a[i] < b[j]) {
            array[k] = a[i];
            ele.style.height = `${a[i]}px`
            ele.style.backgroundColor = "blue";
            i++;
        }
        else {
            array[k] = b[j];
            ele.style.height = `${b[j]}px`
            ele.style.backgroundColor = "blue";
            j++;
        }
        k++;
    }
    while(i < n1) {
        let ele = document.getElementById(`child${k}`);
        await sleep(20);
        ele.style.height = `${a[i]}px`
        ele.style.backgroundColor = "blue";
        array[k] = a[i];
        k++;
        i++;
    }
    while(j < n2) {
        let ele = document.getElementById(`child${k}`);
        await sleep(20);
        ele.style.height = `${a[i]}px`
        ele.style.backgroundColor = "blue";
        array[k] = b[j];
        k++;
        j++;
    }
}
async function mergersortHelper(lo, hi){
    if(lo < hi) {
        let mid = Math.floor((lo + hi)/2);
        await mergersortHelper(lo, mid);
        await mergersortHelper(mid+1, hi);
        await merge(lo, mid, hi);
    }
}
async function mergersort(){
    if(isSorting) return;
    if (isSorted()) {
        if (confirm("Already Sorted! Create new array ??"))
            reset();
        return;
    }
    isSorting = true;
    await mergersortHelper(0, n-1);
    animation();
    isSorting = false;
}

async function animation(){
    for (let i = 0; i <= n-1; i++) {
        let el1 = document.getElementById(`child${i}`);
        el1.style.backgroundColor = passiveColor;
        await sleep(10);
    }
    for (let i = 0; i <= n-1; i++) {
        let el1 = document.getElementById(`child${i}`);
        el1.style.backgroundColor = "purple";
        await sleep(10);
    }
}

async function selectionSort(){
    if(isSorting) return;
    if (isSorted()) {
        if (confirm("Already Sorted! Create new array ??"))
            reset();
        return;
    }
    isSorting = true;
    for(let i=0; i<n; i++){
        let minIdx = i;
        let ele = document.getElementById(`child${i}`);
        ele.style.backgroundColor = "blue";
        await sleep(10);
        for(let j=i+1; j<n; j++){
            let ele2 = document.getElementById(`child${j}`);
            ele2.style.backgroundColor = activeColor;
            await sleep(10);
            if(array[j] < array[minIdx]){
                minIdx = j;
            }
            ele2.style.backgroundColor = passiveColor;
        }
        ele.style.backgroundColor = "blue";
        swap(i, minIdx);
    }
    animation();
    isSorting = false;
}