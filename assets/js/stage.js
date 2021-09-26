var global; //デバッグ用


var setstage = {
    "group": {
        "floor": (scene, event) => {

            {
                const model = loader.clone("main");
                global = model;
                model.scale.set(100, 100, 100);
                setshadow(model);
                model.position.set(0, 0, 0);
                scene.add(model);
                console.log(model);
                model.children.forEach(function(mesh) {
                    if (["ガラス1", "ガラス2"].includes(mesh.name))
                        windowlight2(mesh);
                });
            }

        },
        "wall": (scene, event) => {}
    }
}

function setshadow(scene) {
    scene.traverse(function(node) {
        if (node.isMesh) {
            node.receiveShadow = true;
            node.castShadow = true;
        }
    });
}

function setdoor(model, scene) {
    setshadow(model);
    model.scale.set(100, 100, 100);
    model.position.set(scene.position.x, scene.position.y, scene.position.z);
}

function windowlight2(mesh) {
    // const light = new THREE.DirectionalLight(0xFFFFFF, 0.5);
    const light = new THREE.SpotLight(0xFFFFFF, 1, 800, Math.PI / 16, 0, 0);
    light.castShadow = true;
    light.position.set(mesh.position.x * 100 - 300, mesh.position.y * 100 + 200, mesh.position.z * 100 + 160);
    light.target.position.set(mesh.position.x * 100, mesh.position.y * 100, mesh.position.z * 100);
    light.shadow.mapSize.width = 2048 * config.quality.shadow;
    light.shadow.mapSize.height = 2048 * config.quality.shadow;
    light.shadow.camera.far = 10000;

    light.shadow.camera.top = 20;
    light.shadow.camera.bottom = -20;
    light.shadow.camera.left = -20;
    light.shadow.camera.right = 20;

    light.shadow.camera.near = 130;
    light.shadow.bias = -0.005;

    console.log(mesh);
    mesh.material.opacity = 0.2;
    mesh.material.transparent = true;

    mesh.parent.parent.add(light);
    mesh.parent.parent.add(light.target);

    mesh.traverse(function(node) {
        if (node.isMesh) {
            node.receiveShadow = false;
            node.castShadow = false;
        }
    });

    // デバッグ用
    if (config.debug) {
        const helper = new THREE.CameraHelper(light.shadow.camera);
        mesh.parent.parent.add(helper);
    }
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

    light.shadow.camera.top = 20;
    light.shadow.camera.bottom = -20;
    light.shadow.camera.left = -20;
    light.shadow.camera.right = 20;

    light.shadow.camera.near = 130;
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