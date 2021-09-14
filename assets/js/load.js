var loader, main;
window.addEventListener("DOMContentLoaded",
    function() {
        loader = new loaderClass(function() {
            main = new mainClass();
        });
    });
class loaderClass {
    constructor(loadedfn) {
        let modelpath = {
            "bookshelf": "assets/models/bookshelf/bookshelf.glb",
            "window": "assets/models/window/window.glb",
            "wall": "assets/models/wall/wall.glb"
        };
        this.loaded = 0;
        this.len = Object.keys(modelpath).length;
        this.loadedfn = loadedfn;
        this.models = {};
        Object.keys(modelpath).forEach(name => {
            const loader = new THREE.GLTFLoader();
            loader.load(modelpath[name], model => {
                    this.models[name] = model;
                    this.check();
                },
                xhr => {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },
                err => {
                    console.log('An error happened');
                }

            );
        });
    }
    check() {
        this.loaded++;
        if (this.loaded == this.len)
            this.loadedfn();
    }
    clone(name) {
        return this.models[name].scene.clone();
    }
}