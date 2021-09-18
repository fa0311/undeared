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
            "wall": "assets/models/wall/wall.glb",
            "wall_front": "assets/models/wall/wall_front.glb",
            "door_frame": "assets/models/door/door_frame.glb",
            "door_frame_front": "assets/models/door/door_frame_front.glb",
            "door_front": "assets/models/door/door_front.glb",
            "door_room": "assets/models/door/door_room.glb",
            "untitled": "assets/models/window/untitled.glb",
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
        let clone = this.models[name].scene.clone();
        clone.name = name;
        return clone;
    }
}