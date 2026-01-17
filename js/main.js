// Mazer Game - Main Entry Point

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game Configuration
const CONFIG = {
    TILE_SIZE: 64,
    GRID_WIDTH: 12,
    GRID_HEIGHT: 12,
    FPS: 60
};

// Asset Manager Instance
const ASSET_MANAGER = new AssetManager();

// Queue all game assets
ASSET_MANAGER.queueDownload('assets/images/player.png');
ASSET_MANAGER.queueDownload('assets/images/mummy.png');
ASSET_MANAGER.queueDownload('assets/images/key.png');
ASSET_MANAGER.queueDownload('assets/images/heart.png');
ASSET_MANAGER.queueDownload('assets/images/wall.png');
ASSET_MANAGER.queueDownload('assets/images/floor.png');
ASSET_MANAGER.queueDownload('assets/images/door.png');
ASSET_MANAGER.queueDownload('assets/images/exit.png');

// Game State
const game = {
    loaded: false,
    clockTick: 1 / CONFIG.FPS,
    player: null,
    maze: [],
    keys: 0,
    health: 3,
    level: 1,
    time: 180 // 3 minutes in seconds
};

// Initialize game after assets load
ASSET_MANAGER.downloadAll(() => {
    console.log('✅ All assets loaded successfully!');
    game.loaded = true;
    initGame();
    gameLoop();
});

function initGame() {
    // Generate simple test maze (for now)
    generateTestMaze();
    
    // Initialize player
    game.player = {
        x: 1,
        y: 1,
        sprite: new Sprite(
            ASSET_MANAGER.getAsset('assets/images/player.png'),
            64, 64, 0.1, 9, true, 1
        ),
        direction: 2 // 0=up, 1=left, 2=down, 3=right
    };
    
    console.log('🎮 Game initialized!');
}

function generateTestMaze() {
    // Simple 12x12 maze with walls around edges
    for (let y = 0; y < CONFIG.GRID_HEIGHT; y++) {
        game.maze[y] = [];
        for (let x = 0; x < CONFIG.GRID_WIDTH; x++) {
            // 1 = wall, 0 = floor
            if (x === 0 || x === CONFIG.GRID_WIDTH - 1 || 
                y === 0 || y === CONFIG.GRID_HEIGHT - 1) {
                game.maze[y][x] = 1;
            } else {
                game.maze[y][x] = 0;
            }
        }
    }
}

function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!game.loaded) {
        ctx.fillStyle = '#d4af37';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Loading...', canvas.width / 2, canvas.height / 2);
        requestAnimationFrame(gameLoop);
        return;
    }
    
    // Draw maze
    drawMaze();
    
    // Draw player
    if (game.player) {
        const px = game.player.x * CONFIG.TILE_SIZE;
        const py = game.player.y * CONFIG.TILE_SIZE;
        game.player.sprite.drawFrame(game.clockTick, ctx, px, py, game.player.direction);
    }
    
    requestAnimationFrame(gameLoop);
}

function drawMaze() {
    const wallImg = ASSET_MANAGER.getAsset('assets/images/wall.png');
    const floorImg = ASSET_MANAGER.getAsset('assets/images/floor.png');
    
    for (let y = 0; y < CONFIG.GRID_HEIGHT; y++) {
        for (let x = 0; x < CONFIG.GRID_WIDTH; x++) {
            const tileX = x * CONFIG.TILE_SIZE;
            const tileY = y * CONFIG.TILE_SIZE;
            
            if (game.maze[y][x] === 1) {
                // Draw wall
                ctx.drawImage(wallImg, tileX, tileY, CONFIG.TILE_SIZE, CONFIG.TILE_SIZE);
            } else {
                // Draw floor
                ctx.drawImage(floorImg, tileX, tileY, CONFIG.TILE_SIZE, CONFIG.TILE_SIZE);
            }
        }
    }
}

// Keyboard controls (simple test)
document.addEventListener('keydown', (e) => {
    if (!game.player) return;
    
    const p = game.player;
    let newX = p.x;
    let newY = p.y;
    
    switch(e.key) {
        case 'ArrowUp':
            newY--;
            p.direction = 0;
            break;
        case 'ArrowLeft':
            newX--;
            p.direction = 1;
            break;
        case 'ArrowDown':
            newY++;
            p.direction = 2;
            break;
        case 'ArrowRight':
            newX++;
            p.direction = 3;
            break;
        default:
            return;
    }
    
    // Simple collision check
    if (newX >= 0 && newX < CONFIG.GRID_WIDTH && 
        newY >= 0 && newY < CONFIG.GRID_HEIGHT &&
        game.maze[newY][newX] === 0) {
        p.x = newX;
        p.y = newY;
    }
});

console.log('🏛️ Mazer game starting...');
