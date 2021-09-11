window.addEventListener("DOMContentLoaded", main);

function main() {
    /* 定義 */
    const width = 1920;
    const height = 1080;
    const canvas = document.querySelector("#canvas");

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        45,
        width / height,
        1,
        1000
    );
    camera.y_speed = 0;
    camera.position.set(0, 100, 0);

    const target = new THREE.Group();
    scene.add(target);
    const bullet = new THREE.Group();
    scene.add(bullet);
    const eventobj = new THREE.Group();
    scene.add(eventobj);
    // 廊下
    const corridor = new THREE.Group();
    mapset_corridor(corridor);
    scene.add(corridor);
    // 部屋
    const room = new THREE.Group();
    scene.add(room);
    // 当たり判定 壁
    const wall = new THREE.Group();
    mapset_wall(wall);
    scene.add(wall);
    // 当たり判定 床
    const floor = new THREE.Group();
    mapset_floor(floor);
    scene.add(floor);

    eventset(canvas);


    /*

    const loader1 = new THREE.OBJLoader();
    loader1.load('assets/models/Colt_obj/Colt.obj', function(object) {
        gun = object;
        scene.add(gun);
    });
        */

    /*
    銃関連

    let gun;
    let clock = new THREE.Clock();
    var action;
    const loader = new THREE.FBXLoader();
    console.log(loader);
    loader.resourcePath = 'assets/models/ar15/textures/ar15_Material_BaseColor.tga.png';
    loader.load('assets/models/ar15/source/ar15.fbx', function(object) {
        gun = object;
        gun.scale.set(0.02, 0.02, 0.02);
        console.log(object);
        playerdata.animationReload = new THREE.AnimationMixer(object);
        action = playerdata.animationReload.clipAction(object.animations[2]);

        scene.add(gun);

    });
    */




    var texture = new THREE.TextureLoader().load('assets/image/fa0311/icon.jpg',
        (tex) => {
            const w = 50;
            const h = tex.image.height / (tex.image.width / w);

            const geometry = new THREE.PlaneGeometry(1, 1);
            const material = new THREE.MeshPhongMaterial({
                map: texture
            });
            const plane = new THREE.Mesh(geometry, material);
            plane.scale.set(w, h, 1);
            plane.position.set(0, 100, 500);
            plane.rotation.y = 3.14;
            plane.event = function(camera) {
                let _euler = new THREE.Euler(0, 0, 0, 'YXZ');
                _euler.setFromQuaternion(camera.quaternion);
                if (Math.abs(_euler.y) > 3)
                    this.position.z -= 15;
            }
            eventobj.add(plane);
        });

    /*

    var audioLoader = new THREE.AudioLoader();
    var listener = new THREE.AudioListener();
    var audio = new THREE.Audio(listener);
    audioLoader.load('assets/sounds/submachine_gun.mp3', function(buffer) {
        audio.setBuffer(buffer);
    });
    */

    const light = new THREE.SpotLight(0xFFFFFF, 0.5, 400, Math.PI / 5, 0.5, 0.99);
    //                      SpotLight(色      強度, 距離, 角度      ,半影,減衰）
    // const light = new THREE.SpotLight(0xFFFFFF, 1, 600, Math.PI, 10, 0.9);
    light.castShadow = true;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    scene.add(light);
    let light_target = new THREE.Mesh(new THREE.BoxGeometry(0, 0, 0), new THREE.MeshStandardMaterial());
    scene.add(light_target);
    light.target = light_target;

    setTimeout(view, 1000);
    /*
        const directional_light = new THREE.DirectionalLight(0xFFFFFF, 1);
        directional_light.position.set(0, 1000, 1000);
        scene.add(directional_light);
    */
    function view() {
        requestAnimationFrame(view);
        /*
        銃関連
        if (keydata.reload && playerdata.reload_time == 0) {
            playerdata.reload_time = 196;
            action.play();
            action.clampWhenFinished = true;
        }

        if (playerdata.reload_time == 1) {
            action.reset();
            action.stop();
        }

        if (playerdata.reload_time > 0) {
            playerdata.reload_time--;
        }
        playerdata.animationReload.update(clock.getDelta());
        */

        // 移動前の座標をキャッシュ
        playerdata.cache.x = camera.position.x;
        playerdata.cache.y = camera.position.y;
        playerdata.cache.z = camera.position.z;
        // 方向による移動量の計算
        let _euler = new THREE.Euler(0, 0, 0, 'YXZ');
        _euler.setFromQuaternion(camera.quaternion);
        _euler.y -= mousedata.x;
        _euler.x = Math.max(Math.PI / 2 - Math.PI, Math.min(Math.PI / 2 - 0, _euler.x - mousedata.y));
        camera.quaternion.setFromEuler(_euler);

        // 移動速度
        if (keydata.shift)
            playerdata.speed = 6;
        else
            playerdata.speed = 3;
        // 移動
        if (keydata.up && keydata.right) {
            camera.position.z -= Math.cos(_euler.y - Math.PI / 2.5) * playerdata.speed;
            camera.position.x -= Math.sin(_euler.y - Math.PI / 2.5) * playerdata.speed;
        } else if (keydata.up && keydata.left) {
            camera.position.z += Math.cos(_euler.y - Math.PI / 1.5) * playerdata.speed;
            camera.position.x += Math.sin(_euler.y - Math.PI / 1.5) * playerdata.speed;
        } else if (keydata.down && keydata.right) {
            camera.position.z -= Math.cos(_euler.y - Math.PI / 1.5) * playerdata.speed;
            camera.position.x -= Math.sin(_euler.y - Math.PI / 1.5) * playerdata.speed;
        } else if (keydata.down && keydata.left) {
            camera.position.z += Math.cos(_euler.y - Math.PI / 2.5) * playerdata.speed;
            camera.position.x += Math.sin(_euler.y - Math.PI / 2.5) * playerdata.speed;
        } else if (keydata.up) {
            camera.position.z -= Math.cos(_euler.y) * playerdata.speed;
            camera.position.x -= Math.sin(_euler.y) * playerdata.speed;
        } else if (keydata.down) {
            camera.position.z += Math.cos(_euler.y) * playerdata.speed;
            camera.position.x += Math.sin(_euler.y) * playerdata.speed;
        } else if (keydata.right) {
            camera.position.z -= Math.cos(_euler.y - Math.PI / 2) * playerdata.speed;
            camera.position.x -= Math.sin(_euler.y - Math.PI / 2) * playerdata.speed;
        } else if (keydata.left) {
            camera.position.z += Math.cos(_euler.y - Math.PI / 2) * playerdata.speed;
            camera.position.x += Math.sin(_euler.y - Math.PI / 2) * playerdata.speed;
        }

        // 当たり判定 x軸


        [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0].forEach(function(data_y) {
            [30, 20, 10, 0, -10, -20, -30].forEach(function(data_x) {

                let TopOverPos = new THREE.Vector3(camera.position.x + Math.abs(data_x), camera.position.y + data_y, camera.position.z + data_x);
                let downVect = new THREE.Vector3(-1, 0, 0);
                let ray = new THREE.Raycaster(TopOverPos, downVect.normalize());
                let flag = false;
                let objs = ray.intersectObjects(wall.children, true);
                objs.forEach(function(element) {
                    if (camera.position.x < element.point.x + Math.abs(data_x))
                        flag = true;
                });
                if (flag)
                    camera.position.x = playerdata.cache.x;
            });
        });

        // 当たり判定 z軸

        [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0].forEach(function(data_y) {
            [30, 20, 10, 0, -10, -20, -30].forEach(function(data_x) {

                let TopOverPos = new THREE.Vector3(camera.position.x + data_x, camera.position.y + data_y, camera.position.z + Math.abs(data_x));
                let downVect = new THREE.Vector3(0, 0, -1);
                let ray = new THREE.Raycaster(TopOverPos, downVect.normalize());
                let flag = false;
                let objs = ray.intersectObjects(wall.children, true);
                objs.forEach(function(element) {
                    if (camera.position.z < element.point.z + Math.abs(data_x))
                        flag = true;
                });
                if (flag)
                    camera.position.z = playerdata.cache.z;
            });
        });


        /*
        if (keydata.space && camera.position.y < 100)
            camera.y_speed = 3;
        camera.position.y += camera.y_speed * Math.abs(camera.y_speed);
        if (Math.abs(camera.y_speed) < 1)
            camera.y_speed -= 1;
        if (camera.position.y < 100) {
            camera.y_speed = 0;
        } else {
            camera.y_speed -= 0.1;
        }
        console.log(gun.point)
        */
        /* 縦方向判定 */
        let PlayerHeight = camera.position.y - 100;
        let TopOverPos = new THREE.Vector3(camera.position.x, PlayerHeight + 20, camera.position.z);
        let downVect = new THREE.Vector3(0, -1, 0);
        let ray = new THREE.Raycaster(TopOverPos, downVect.normalize());
        let preY = PlayerHeight - 5;
        let objs = ray.intersectObjects(floor.children, true);
        objs.forEach(function(element) {
            if (preY < element.point.y)
                preY = element.point.y;
        });
        /* 接触点 + 身長 */
        camera.position.y = preY + 100;

        // camera.translateOnAxis(new THREE.Vector3(Number(keydata.right) - Number(keydata.left), 0, Number(keydata.down) - Number(keydata.up)), 3);

        mousedata.update();

        light.rotation.z = camera.rotation.z;
        light.rotation.x = camera.rotation.x;
        light.rotation.y = camera.rotation.y;
        light.position.z = camera.position.z;
        light.position.x = camera.position.x;
        light.position.y = camera.position.y;
        // light.translateOnAxis(new THREE.Vector3(0, -1, 0), 80);
        light_target.rotation.z = camera.rotation.z;
        light_target.rotation.x = camera.rotation.x;
        light_target.rotation.y = camera.rotation.y;
        light_target.position.z = camera.position.z;
        light_target.position.x = camera.position.x;
        light_target.position.y = camera.position.y;
        light_target.translateOnAxis(new THREE.Vector3(0, 0, -1), 100);


        // console.log("x" + _euler.x + "\n cos" + Math.cos(_euler.x) + "\n sin" + Math.sin(_euler.x) +"\ny" + _euler.y + "\n cos" + Math.cos(_euler.y) + "\n sin" + Math.sin(_euler.y) +"\n" + gun.position.z)
        /*
        銃関連
        gun.rotation.z = camera.rotation.z;
        gun.rotation.x = camera.rotation.x;
        gun.rotation.y = camera.rotation.y;

        gun.position.z = camera.position.z;
        gun.position.x = camera.position.x;
        gun.position.y = camera.position.y;

        if (mousedata.right)
            gun.translateOnAxis(new THREE.Vector3(0, -3.35, -5), 1);
        else
            gun.translateOnAxis(new THREE.Vector3(10, -3.35, -15), 1);

        if (playerdata.shot_time == 1)
            audio.stop();

        if (mousedata.left && playerdata.shot_time == 0) {
            audio.play();
            playerdata.shot_time = 5
            let box = new THREE.Mesh(new THREE.SphereGeometry(0.3, 0.3, 0.3), new THREE.MeshStandardMaterial({
                color: 0xFFFFFF,
                roughness: 0.1
            }))
            box.rotation.z = camera.rotation.z;
            box.rotation.x = camera.rotation.x;
            box.rotation.y = camera.rotation.y;
            box.position.z = camera.position.z;
            box.position.x = camera.position.x;
            box.position.y = camera.position.y;
            box.translateOnAxis(new THREE.Vector3(0, 0, -1), 50);
            bullet.add(box);

            /*
                        let _euler = new THREE.Euler(0, 0, 0, 'YXZ');
                        _euler.setFromQuaternion(camera.quaternion);
                        if (Math.random() > 0.5)
                            _euler.y += Math.random() * 0.005;
                        else
                            _euler.y += Math.random() * -0.005;
                        _euler.x = Math.max(Math.PI / 2 - Math.PI, Math.min(Math.PI / 2 - 0, _euler.x + Math.random() * 0.005));

                        camera.quaternion.setFromEuler(_euler);
                        */

        /*
        銃関連
                //playerdata.animationShooting.update(clock.getDelta());
            }

            if (playerdata.shot_time > 0) {
                playerdata.shot_time--;
                _euler.x = Math.max(Math.PI / 2 - Math.PI, Math.min(Math.PI / 2 - 0, _euler.x + playerdata.shot_time * 0.002));
                if (Math.random() > 0.5)
                    _euler.y += Math.random() * 0.005;
                else
                    _euler.y += Math.random() * -0.005;
            }

            camera.quaternion.setFromEuler(_euler);

            bullet.children.forEach(function(element) {

                let TopOverPos = new THREE.Vector3(element.position.x, 65535, element.position.z);
                let downVect = new THREE.Vector3(0, -1, 0);
                let ray = new THREE.Raycaster(TopOverPos, downVect.normalize());
                let objs = ray.intersectObjects(target.children, true);
                objs.forEach(function(obj) {
                    if (obj.point.y - element.position.y < 0) {
                        obj.object.material.color.set(new THREE.Color(0xffffff));
                    }
                });
                element.translateOnAxis(new THREE.Vector3(0, 0, -1), 20);
            });
            */
        eventobj.children.forEach(function(element) {
            element.event(camera);
        });
        renderer.render(scene, camera);
    }
}
class player {
    constructor() {
        this.reload_time = 0;
        this.shot_time = 0;

        this.speed = 0;
        this.cache = {};
    }

}
let playerdata = new player;
class key {
    constructor() {
        this.up = false;
        this.down = false;
        this.right = false;
        this.left = false;
        this.space = false;
        this.ctrl = false;
    }
}
class mouse {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.right = false;
        this.left = false;
    }
    update() {
        this.x = 0;
        this.y = 0;
    }
}
let keydata = new key();
let mousedata = new mouse();

function keyupfunc(event) {
    console.log(event);
    if (event.keyCode == 87)
        keydata.up = false;
    else if (event.keyCode == 65)
        keydata.left = false;
    else if (event.keyCode == 83)
        keydata.down = false;
    else if (event.keyCode == 68)
        keydata.right = false;
    else if (event.keyCode == 32)
        keydata.space = false;
    else if (event.keyCode == 17)
        keydata.ctrl = false;
    else if (event.keyCode == 16)
        keydata.shift = false;
    else if (event.keyCode == 82)
        keydata.reload = false;

}

function keydownfunc(event) {
    if (event.keyCode == 87)
        keydata.up = true;
    else if (event.keyCode == 65)
        keydata.left = true;
    else if (event.keyCode == 83)
        keydata.down = true;
    else if (event.keyCode == 68)
        keydata.right = true;
    else if (event.keyCode == 32)
        keydata.space = true;
    else if (event.keyCode == 17)
        keydata.ctrl = true;
    else if (event.keyCode == 16)
        keydata.shift = true;
    else if (event.keyCode == 82)
        keydata.reload = true;

}

function mouseupfunc(event) {
    if (event.button == 0)
        mousedata.left = false;
    else if (event.button == 2)
        mousedata.right = false;
}

function mousedownfunk(event) {
    let canvas = event.target;
    canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
    canvas.requestPointerLock();

    if (event.button == 0)
        mousedata.left = true;
    else if (event.button == 2)
        mousedata.right = true;
}

function mousemovefunc(event) {
    mousedata.x += event.movementX / 1000;
    mousedata.y += event.movementY / 1000;
}

function eventset(canvas) {
    canvas.addEventListener("mousedown", mousedownfunk);
    canvas.addEventListener("mouseup", mouseupfunc);
    addEventListener("keydown", keydownfunc);
    addEventListener("keyup", keyupfunc);
    addEventListener("mousemove", mousemovefunc);
}

// window.addEventListener('resize', onResize);

function resize(canvas) {
    width = canvas.getBoundingClientRect().width;
    height = canvas.getBoundingClientRect().height;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

/*メモ欄 */

/*
平行移動するコード translateOnAxisで代用できるらしい 車輪の再開発をしてしまった
gun.position.z = camera.position.z - Math.cos(_euler.y) * Math.cos(_euler.x) * 10;
gun.position.x = camera.position.x - Math.sin(_euler.y) * Math.cos(_euler.x) * 10;
gun.position.y = camera.position.y + Math.sin(_euler.x) * 10;
*/