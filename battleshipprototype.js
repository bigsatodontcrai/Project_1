let pSquares = [];
let oSquares = [];

document.addEventListener('DOMContentLoaded', () => {
    let content = document.getElementById('content');
    let ocean = document.getElementById('ocean');
    let base = document.getElementById('base');
    setup(content, markSquare, oSquares);
    setup(ocean, markShip, pSquares);
    let resetButton = document.querySelector('.reset');
    let startButton = document.getElementById('start');
    let rotateButton = document.getElementById('rotate');
    resetButton.addEventListener('click', () => {
        breakdown(content);
        setup(content, markSquare, oSquares);
        breakdown(ocean);
        setup(ocean, markShip, pSquares);
        setupShips(base);
    });
    
    rotateButton.addEventListener('click', rotate());
    startButton.addEventListener('click', () => {
        console.log('start');
    })
});

