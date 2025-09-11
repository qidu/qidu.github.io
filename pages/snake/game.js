class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.scoreElement = document.getElementById('score');
        this.highScoreElement = document.getElementById('high-score');
        this.startButton = document.getElementById('start-btn');
        
        this.gridSize = 20;
        this.canvasSize = 400;
        this.snake = [];
        this.food = {};
        this.direction = 'right';
        this.nextDirection = 'right';
        this.baseSpeed = 900;
        this.gameInterval = null;
        this.score = 0;
        this.highScore = 0;
        this.gameRunning = false;
        
        // Touch variables
        this.touchStartX = null;
        this.touchStartY = null;
        
        this.init();
    }
    
    init() {
        this.startButton.addEventListener('click', () => this.startGame());
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // Prevent start button from stealing focus
        this.startButton.addEventListener('mousedown', (e) => e.preventDefault());
        
        // Keep canvas focused during gameplay
        document.addEventListener('click', () => {
            if (this.gameRunning) {
                this.canvas.focus();
            }
        });
        
        // Touch controls for mobile devices
        this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.canvas.addEventListener('touchend', (e) => this.handleTouchEnd(e));
        
        this.loadHighScore();
    }
    
    startGame() {
        if (this.gameRunning) return;
        
        this.snake = [{x: 5, y: 10}];
        this.direction = 'right';
        this.nextDirection = 'right';
        this.score = 0;
        this.scoreElement.textContent = '0';
        this.gameRunning = true;
        this.startButton.textContent = 'Restart Game';
        
        this.generateFood();
        
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
        }
        
        this.updateGameSpeed();
        
        // Keep focus on the play area
        this.canvas.focus();
    }
    
    gameLoop() {
        this.direction = this.nextDirection;
        this.moveSnake();
        
        if (this.checkCollision()) {
            this.gameOver();
            return;
        }
        
        this.checkFood();
        this.draw();
    }
    
    moveSnake() {
        const head = {...this.snake[0]};
        
        switch (this.direction) {
            case 'up': head.y--; break;
            case 'down': head.y++; break;
            case 'left': head.x--; break;
            case 'right': head.x++; break;
        }
        
        this.snake.unshift(head);
        
        if (!this.foodEaten) {
            this.snake.pop();
        }
        this.foodEaten = false;
    }
    
    checkCollision() {
        const head = this.snake[0];
        
        if (head.x < 0 || head.x >= this.canvasSize / this.gridSize || 
            head.y < 0 || head.y >= this.canvasSize / this.gridSize) {
            return true;
        }
        
        for (let i = 1; i < this.snake.length; i++) {
            if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
                return true;
            }
        }
        
        return false;
    }
    
    checkFood() {
        const head = this.snake[0];
        
        if (head.x === this.food.x && head.y === this.food.y) {
            this.foodEaten = true;
            this.score += 10;
            this.scoreElement.textContent = this.score;
            this.generateFood();
            
            if (this.score > this.highScore) {
                this.highScore = this.score;
                this.highScoreElement.textContent = this.highScore;
                this.saveHighScore();
            }
            
            this.updateGameSpeed();
        }
    }
    
    generateFood() {
        const maxPos = this.canvasSize / this.gridSize;
        
        while (true) {
            this.food = {
                x: Math.floor(Math.random() * maxPos),
                y: Math.floor(Math.random() * maxPos)
            };
            
            let validPosition = true;
            for (const segment of this.snake) {
                if (this.food.x === segment.x && this.food.y === segment.y) {
                    validPosition = false;
                    break;
                }
            }
            
            if (validPosition) break;
        }
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvasSize, this.canvasSize);
        
        this.ctx.fillStyle = '#ff6b6b';
        this.ctx.fillRect(
            this.food.x * this.gridSize, 
            this.food.y * this.gridSize, 
            this.gridSize, 
            this.gridSize
        );
        
        this.ctx.fillStyle = '#4ecdc4';
        for (const segment of this.snake) {
            this.ctx.fillRect(
                segment.x * this.gridSize, 
                segment.y * this.gridSize, 
                this.gridSize - 1, 
                this.gridSize - 1
            );
        }
    }
    
    handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        this.touchStartX = touch.clientX;
        this.touchStartY = touch.clientY;
    }
    
    handleTouchEnd(e) {
        e.preventDefault();
        if (!this.gameRunning) return;
        
        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - this.touchStartX;
        const deltaY = touch.clientY - this.touchStartY;
        
        const minSwipeDistance = 50;
        
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (Math.abs(deltaX) > minSwipeDistance) {
                if (deltaX > 0) {
                    this.nextDirection = 'right';
                } else {
                    this.nextDirection = 'left';
                }
            }
        } else {
            if (Math.abs(deltaY) > minSwipeDistance) {
                if (deltaY > 0) {
                    this.nextDirection = 'down';
                } else {
                    this.nextDirection = 'up';
                }
            }
        }
    }
    
    gameOver() {
        clearInterval(this.gameInterval);
        this.gameRunning = false;
        this.startButton.textContent = 'Start Game';
        
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvasSize, this.canvasSize);
        
        this.ctx.fillStyle = 'white';
        this.ctx.font = '24px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Game Over!', this.canvasSize / 2, this.canvasSize / 2 - 15);
        this.ctx.font = '16px Arial';
        this.ctx.fillText(`Score: ${this.score}`, this.canvasSize / 2, this.canvasSize / 2 + 15);
    }
    
    getCurrentSpeed() {
        const lengthFactor = Math.max(1, this.snake.length / 5);
        return Math.max(100, this.baseSpeed / lengthFactor);
    }
    
    updateGameSpeed() {
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
        }
        this.gameInterval = setInterval(() => this.gameLoop(), this.getCurrentSpeed());
    }
    
    saveHighScore() {
        localStorage.setItem('snakeHighScore', this.highScore);
    }
    
    loadHighScore() {
        const savedScore = localStorage.getItem('snakeHighScore');
        if (savedScore) {
            this.highScore = parseInt(savedScore);
            this.highScoreElement.textContent = this.highScore;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SnakeGame();
});