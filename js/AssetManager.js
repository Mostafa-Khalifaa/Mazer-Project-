class AssetManager {
    constructor() {
        this.cache = {};
        this.downloadQueue = [];
        this.successCount = 0;
        this.errorCount = 0;
    }

    queueDownload(path) {
        this.downloadQueue.push(path);
    }

    isDone() {
        return this.downloadQueue.length === this.successCount + this.errorCount;
    }

    downloadAll(callback) {
        if (this.downloadQueue.length === 0) setTimeout(callback, 10);
        
        for (let i = 0; i < this.downloadQueue.length; i++) {
            const path = this.downloadQueue[i];
            const img = new Image();
            const that = this;

            img.addEventListener("load", function() {
                that.successCount++;
                if (that.isDone()) callback();
            });

            img.addEventListener("error", function() {
                that.errorCount++;
                console.error("Error loading: " + this.src);
                if (that.isDone()) callback();
            });

            img.src = path;
            this.cache[path] = img;
        }
    }

    getAsset(path) {
        return this.cache[path];
    }
}
