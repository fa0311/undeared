var global; //デバッグ用

function stageset_floor(floor) {
    {
        const box = new THREE.Mesh(new THREE.BoxGeometry(1000, 20, 1000), new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
            roughness: 1
        }));
        setshadow(box);
        box.position.set(400, -10, -575);
        floor.add(box);
    } {
        const box = new THREE.Mesh(new THREE.BoxGeometry(1000, 20, 1000), new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
            roughness: 1
        }));
        setshadow(box);
        box.position.set(400, 200, -575);
        floor.add(box);
    } {
        const box = new THREE.Mesh(new THREE.BoxGeometry(1000, 1, 500), new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
            roughness: 1
        }));
        setshadow(box);
        box.position.set(400, -20, 175);
        floor.add(box);
    } {
        const box = new THREE.Mesh(new THREE.BoxGeometry(200, 20, 150), new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
            roughness: 1
        }));
        setshadow(box);
        box.position.set(0, 200, 0);
        floor.add(box);
    }

}

function stageset_wall(wall) {
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

function stageset_corridor(corridor) {
    /*靴箱 */
    {
        const model = loader.clone("bookshelf");
        model.scale.set(80, 80, 80);
        setshadow(model);
        model.position.set(-30, -100, 0);
        corridor.add(model);
    }
    /*玄関のドア */
    {
        const model = loader.clone("door_front");
        model.scale.set(130, 130, 130);
        setshadow(model);
        // model.position.set(-30, -40, 75);
        model.position.set(48, -38, 65);
        model.rotation.y = 3.14;
        corridor.add(model);
    } {
        const model = loader.clone("door_frame_front");
        model.scale.set(131, 131, 131);
        setshadow(model);
        model.position.set(50, -40, 65);
        model.rotation.y = 3.14;
        corridor.add(model);
    } {
        const model = loader.clone("wall_front");
        model.scale.set(100, 7, 100);
        setshadow(model);
        model.position.set(40, 178, 66);
        model.rotation.y = 3.14;
        corridor.add(model);
    }
    /*玄関の右 */
    {
        const model = loader.clone("wall_front");
        model.scale.set(100 / 4 * 3, 100, 100);
        setshadow(model);
        model.position.set(110, -40, 27);
        model.rotation.y = 3.14 / 2
        corridor.add(model);
    } {
        const model = loader.clone("wall_front");
        model.scale.set(100 / 4 * 3, 7, 100);
        setshadow(model);
        model.position.set(110, 178, 27);
        model.rotation.y = 3.14 / 2
        corridor.add(model);
    }
    /*玄関の左 */
    {
        const model = loader.clone("wall_front");
        model.scale.set(100 / 4 * 3, 100, 100);
        setshadow(model);
        model.position.set(-90, -40, 27);
        model.rotation.y = 3.14 / 2
        corridor.add(model);
    } {
        const model = loader.clone("wall_front");
        model.scale.set(100 / 4 * 3, 7, 100);
        setshadow(model);
        model.position.set(-90, 178, 27);
        model.rotation.y = 3.14 / 2
        corridor.add(model);
    } {
        const model = loader.clone("wall");
        model.scale.set(100 / 4 * 3, 100, 100);
        setshadow(model);
        model.position.set(-90, -20, -122);
        model.rotation.y = 3.14 / 2
        corridor.add(model);
    }
    /*入って左 */
    {
        const model = loader.clone("window");
        model.scale.set(100, 100, 100);
        setshadow(model);
        model.position.set(165, -20, -70);
        model.rotation.y = 0;
        corridor.add(model);
        windowlight(corridor, model);
    } {
        const model = loader.clone("wall");
        model.scale.set(100, 100, 100);
        setshadow(model);
        model.position.set(365, -20, -70);
        model.rotation.y = 0;
        corridor.add(model);
    } {
        const model = loader.clone("window");
        model.scale.set(100, 100, 100);
        setshadow(model);
        model.position.set(565, -20, -70);
        model.rotation.y = 0;
        corridor.add(model);
        windowlight(corridor, model);
    } {
        const model = loader.clone("wall");
        model.scale.set(100, 100, 100);
        setshadow(model);
        model.position.set(765, -20, -70);
        model.rotation.y = 0;
        corridor.add(model);
    }
    /*向かい側 */
    {
        const model = loader.clone("wall");
        model.scale.set(101, 100, 100);
        setshadow(model);
        model.position.set(-35, -20, -220);
        model.rotation.y = 0;
        corridor.add(model);
    } {
        const model = loader.clone("wall");
        model.scale.set(101, 100, 100);
        setshadow(model);
        model.position.set(165, -20, -220);
        model.rotation.y = 0;
        corridor.add(model);
    } {
        const model = loader.clone("wall");
        model.scale.set(101, 100, 100);
        setshadow(model);
        model.position.set(365, -20, -220);
        model.rotation.y = 0;
        corridor.add(model);
    } {
        const model = loader.clone("wall");
        model.scale.set(101, 100, 100);
        setshadow(model);
        model.position.set(565, -20, -220);
        model.rotation.y = 0;
        corridor.add(model);
    } {
        const model = loader.clone("wall");
        model.scale.set(101, 100, 100);
        setshadow(model);
        model.position.set(765, -20, -220);
        model.rotation.y = 0;
        corridor.add(model);
    }
    /*突き当り */
    {
        const model = loader.clone("wall");
        model.scale.set(100 / 4 * 3, 100, 100);
        setshadow(model);
        model.position.set(900, -20, -122);
        model.rotation.y = 3.14 / 2
        corridor.add(model);
    }

    /*デバッグ用 */
    /*
    loader.load('assets/models/floor/untitled.glb', function(model) {
        model = model.scene;
        model.scale.set(100, 100, 100);
        setshadow(model);
        model.position.set(0, 300, -80);
        model.rotation.y = 3.14;
        corridor.add(model);
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
    const light = new THREE.SpotLight(0xFFFFFF, 1, 800, Math.PI / 12, 0, 0);
    light.castShadow = true;
    light.position.set(scene.position.x + 100, scene.position.y + 300, scene.position.z + 200);
    light.target.position.set(scene.position.x + 30, scene.position.y + 130, scene.position.z);
    light.shadow.mapSize.width = 2048 * config.quality.shadow;
    light.shadow.mapSize.height = 2048 * config.quality.shadow;
    light.shadow.camera.far = 500;

    light.shadow.camera.top = 50;
    light.shadow.camera.bottom = -50;
    light.shadow.camera.left = -50;
    light.shadow.camera.right = 50;
    light.shadow.camera.near = 25;
    light.shadow.bias = -0.005;


    const glass = new THREE.Mesh(new THREE.BoxGeometry(85, 85, 2), new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.2
    }));
    glass.position.set(scene.position.x + 35, scene.position.y + 120, scene.position.z - 7);
    mesh.add(light);
    mesh.add(light.target);
    mesh.add(glass);

    // デバッグ用
    if (config.debug) {
        const helper = new THREE.CameraHelper(light.shadow.camera);
        mesh.add(helper);
    }

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