var global; //デバッグ用

function mapset_floor(floor) {
    let box;
    box = new THREE.Mesh(new THREE.BoxGeometry(1000, 20, 1000), new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        roughness: 1
    }));
    setshadow(box);
    box.position.set(400, -10, -575);
    floor.add(box);

    box = new THREE.Mesh(new THREE.BoxGeometry(200, 1, 150), new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        roughness: 1
    }));
    setshadow(box);
    box.position.set(0, -20, 0);
    floor.add(box);

    box = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 100), new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        roughness: 1
    }));
    setshadow(box);
    box.position.set(500, 200, -500);
    floor.add(box);

}

function mapset_wall(wall) {
    let box;
    /*
    box = new THREE.Mesh(new THREE.BoxGeometry(1, 240, 150), new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        roughness: 1
    }));
    box.position.set(100, 100, 0);
    wall.add(box);

    box = new THREE.Mesh(new THREE.BoxGeometry(1, 240, 350), new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        roughness: 1
    }));
    box.position.set(-100, 100, -100);
    wall.add(box);

    box = new THREE.Mesh(new THREE.BoxGeometry(200, 240, 1), new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        roughness: 1
    }));
    box.position.set(0, 100, 75);
    wall.add(box);



    box = new THREE.Mesh(new THREE.BoxGeometry(200, 240, 1), new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        roughness: 1
    }));
    box.position.set(0, 100, -275);
    wall.add(box);


    box = new THREE.Mesh(new THREE.BoxGeometry(200, 240, 1), new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        roughness: 1
    }));
    box.position.set(200, 100, -75);
    wall.add(box);

        box = new THREE.Mesh(new THREE.BoxGeometry(200, 240, 1), new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
            roughness: 1
        }));
        box.position.set(400, 100, -75);
        wall.add(box);
    */

    /*

        box = new THREE.Mesh(new THREE.BoxGeometry(1, 240, 200), new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
            roughness: 1
        }));
        box.position.set(-100, 100, -175);
        wall.add(box);
        */

}

function mapset_corridor(corridor) {

    {
        /*靴箱 */
        bookshelf = loader.clone("bookshelf");
        bookshelf.scale.set(80, 80, 80);
        setshadow(bookshelf);
        bookshelf.position.set(-30, -100, 0);
        // bookshelf.position.set(-30, 10, 0);
        corridor.add(bookshelf);
    }
    /*玄関のドア */
    {
        bookshelf = loader.clone("window");
        bookshelf.scale.set(100, 100, 100);
        setshadow(bookshelf);
        bookshelf.position.set(35, -20, 70);
        bookshelf.rotation.y = 3.14
        corridor.add(bookshelf);

    }

    /*玄関の右 */
    {
        bookshelf = loader.clone("wall");
        bookshelf.scale.set(100 / 4 * 3, 100, 100);
        setshadow(bookshelf);
        bookshelf.position.set(110, -20, 27);
        bookshelf.rotation.y = 3.14 / 2
        corridor.add(bookshelf);

    }


    /*玄関の左 */
    {
        bookshelf = loader.clone("wall");
        bookshelf.scale.set(100 / 4 * 3, 100, 100);
        setshadow(bookshelf);
        bookshelf.position.set(-90, -20, 27);
        bookshelf.rotation.y = 3.14 / 2
        corridor.add(bookshelf);

    }

    /*入って左 */

    {
        bookshelf = loader.clone("window");
        bookshelf.scale.set(100, 100, 100);
        setshadow(bookshelf);
        bookshelf.position.set(165, -20, -70);
        bookshelf.rotation.y = 0;
        corridor.add(bookshelf);
        windowlight(corridor, bookshelf);
    } {
        bookshelf = loader.clone("wall");
        bookshelf.scale.set(100, 100, 100);
        setshadow(bookshelf);
        bookshelf.position.set(365, -20, -70);
        bookshelf.rotation.y = 0;
        corridor.add(bookshelf);
    } {
        bookshelf = loader.clone("window");
        bookshelf.scale.set(100, 100, 100);
        setshadow(bookshelf);
        bookshelf.position.set(565, -20, -70);
        bookshelf.rotation.y = 0;
        corridor.add(bookshelf);
        windowlight(corridor, bookshelf);
    } {
        bookshelf = loader.clone("wall");
        bookshelf.scale.set(100, 100, 100);
        setshadow(bookshelf);
        bookshelf.position.set(765, -20, -70);
        bookshelf.rotation.y = 0;
        corridor.add(bookshelf);
    }
    /*向かい側 */


    {
        bookshelf = loader.clone("wall");
        bookshelf.scale.set(100, 100, 100);
        setshadow(bookshelf);
        bookshelf.position.set(-35, -20, -220);
        bookshelf.rotation.y = 0;
        corridor.add(bookshelf);
    } {
        bookshelf = loader.clone("wall");
        bookshelf.scale.set(100, 100, 100);
        setshadow(bookshelf);
        bookshelf.position.set(165, -20, -220);
        bookshelf.rotation.y = 0;
        corridor.add(bookshelf);
    } {
        bookshelf = loader.clone("wall");
        bookshelf.scale.set(100, 100, 100);
        setshadow(bookshelf);
        bookshelf.position.set(365, -20, -220);
        bookshelf.rotation.y = 0;
        corridor.add(bookshelf);
    } {
        bookshelf = loader.clone("wall");
        bookshelf.scale.set(100, 100, 100);
        setshadow(bookshelf);
        bookshelf.position.set(565, -20, -220);
        bookshelf.rotation.y = 0;
        corridor.add(bookshelf);
    } {
        bookshelf = loader.clone("wall");
        bookshelf.scale.set(100, 100, 100);
        setshadow(bookshelf);
        bookshelf.position.set(765, -20, -220);
        bookshelf.rotation.y = 0;
        corridor.add(bookshelf);
    }


    /*デバッグ用 */
    /*
    loader.load('assets/models/floor/untitled.glb', function(model) {
        bookshelf = model.scene;
        bookshelf.scale.set(100, 100, 100);
        setshadow(bookshelf);
        bookshelf.position.set(0, 300, -80);
        bookshelf.rotation.y = 3.14;
        corridor.add(bookshelf);
    });
    */
}

function setshadow(scene) {
    scene.traverse(function(node) {
        if (node.isMesh) {
            node.receiveShadow = true;
            node.castShadow = true;
        }
    });
}

function windowlight(mesh, scene) {
    // const light = new THREE.DirectionalLight(0xFFFFFF, 0.5);
    const light = new THREE.SpotLight(0xFFFFFF, 3, 500, Math.PI / 12, 1, 0);
    light.castShadow = true;
    light.position.set(scene.position.x + 100, scene.position.y + 300, scene.position.z + 200);
    light.target.position.set(scene.position.x + 30, scene.position.y + 130, scene.position.z);
    light.shadow.mapSize.width = 2048 * config.quality.shadow;
    light.shadow.mapSize.height = 2048 * config.quality.shadow;
    light.shadow.camera.far = 500;
    /*
    light.shadow.camera.far = 500;
    light.shadow.camera.right = 50;
    light.shadow.camera.left = 50;
    light.shadow.camera.top = 120;
    light.shadow.camera.bottom = -120;
    */

    const glass = new THREE.Mesh(new THREE.BoxGeometry(85, 85, 2), new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        refractionRatio: 0.8,
        transparent: true,
        opacity: 0.5
    }));
    glass.position.set(scene.position.x + 35, scene.position.y + 120, scene.position.z - 7);
    mesh.add(light);
    mesh.add(light.target);
    mesh.add(glass);

    // デバッグ用
    /*
    const helper = new THREE.CameraHelper(light.shadow.camera);
    mesh.add(helper);
    */
}
/*
const floor_list = [
    [
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
    ],
    [
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 2],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
    ],
];
const wall_list = [
    [
        [0, 1, 1, 1, 1, 1, 1],
        [2, 1, 1, 1, 1, 1, 2],
        [2, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 2],
        [2, 1, 1, 1, 1, 1, 12],
    ],
];

floor_list.forEach(function(listY, Y) {
    listY.forEach(function(listX, X) {
        listX.forEach(function(data_list, Z) {
            String(data_list).split('').forEach(function(data, L) {
                if (data == 1) {
                    let box = new THREE.Mesh(new THREE.BoxGeometry(200, 1, 200), new THREE.MeshStandardMaterial({
                        color: 0xFFFFFF,
                        roughness: 1
                    }));
                    box.position.set(200 * X, 200 * Y, 200 * Z);
                    floor.add(box);
                } else if (data == 2) {
                    let box = new THREE.Mesh(new THREE.BoxGeometry(200 * 1.414, 1, 200), new THREE.MeshStandardMaterial({
                        color: 0xFFFFFF,
                        roughness: 1
                    }));
                    box.position.set(200 * X, 200 * (Y - 0.5), 200 * Z);
                    box.rotation.set(0, 0, Math.PI / 4);
                    floor.add(box);
                }
            });
        });
    });
});

wall_list.forEach(function(listY, Y) {
    listY.forEach(function(listX, X) {
        listX.forEach(function(data_list, Z) {
            String(data_list).split('').forEach(function(data, L) {
                if (data == 1) {
                    let box = new THREE.Mesh(new THREE.BoxGeometry(1, 200, 200), new THREE.MeshStandardMaterial({
                        color: 0xFFFFFF,
                        roughness: 1
                    }));
                    box.position.set(200 * (X - 0.5), 200 * (Y + 0.5), 200 * (Z - 1));
                    wall.add(box);
                } else if (data == 2) {
                    let box = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 1), new THREE.MeshStandardMaterial({
                        color: 0xFFFFFF,
                        roughness: 1
                    }));
                    box.position.set(200 * (X - 1), 200 * (Y + 0.5), 200 * (Z - 0.5));
                    wall.add(box);
                }
            });
        });
    });
});
*/