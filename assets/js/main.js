class mainClass {
    constructor() {
        /* 定義 */
        this.canvas = document.querySelector("#canvas");
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas
        });
        this.renderer.shadowMap.enabled = true;

        // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            45,
            0,
            1,
            1000
        );

        new EventListener(this.canvas, this.renderer, this.camera);
        if (config.stats) {
            this.stats = new Stats();
            this.stats.showPanel(0);
            Object.assign(this.stats.dom.style, {
                'position': 'fixed',
                'height': 'max-content',
                'left': 0,
                'right': 'auto',
                'top': 0,
                'bottom': 'auto'
            });
            document.body.appendChild(this.stats.dom);
        }
        this.camera.y_speed = 0;
        this.camera.position.set(0, 100, 0);

        this.target = new THREE.Group();
        this.scene.add(this.target);
        this.bullet = new THREE.Group();
        this.scene.add(this.bullet);
        this.eventobj = new THREE.Group();
        this.scene.add(this.eventobj);
        // 廊下
        this.corridor = new THREE.Group();
        mapset_corridor(this.corridor);
        this.scene.add(this.corridor);
        // 部屋
        this.room = new THREE.Group();
        this.scene.add(this.room);
        // 当たり判定 壁
        this.wall = new THREE.Group();
        mapset_wall(this.wall);
        this.scene.add(this.wall);
        // 当たり判定 床
        this.floor = new THREE.Group();
        mapset_floor(this.floor);
        this.scene.add(this.floor);


        /*

        const loader1 = new THREE.OBJLoader();
        loader1.load('assets/models/Colt_obj/Colt.obj', function(object) {
            gun = object;
            this.scene.add(gun);
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

            this.scene.add(gun);

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
                this.eventobj.add(plane);
            });

        /*

        var audioLoader = new THREE.AudioLoader();
        var listener = new THREE.AudioListener();
        var audio = new THREE.Audio(listener);
        audioLoader.load('assets/sounds/submachine_gun.mp3', function(buffer) {
            audio.setBuffer(buffer);
        });
        */

        this.light = new THREE.SpotLight(0xFFFFFF, 0.5, 400, Math.PI / 5, 0.5, 0.99);
        //                      SpotLight(色      強度, 距離, 角度      ,半影,減衰）
        // const light = new THREE.SpotLight(0xFFFFFF, 1, 600, Math.PI, 10, 0.9);
        this.light.castShadow = true;
        this.light.shadow.mapSize.width = 2048;
        this.light.shadow.mapSize.height = 2048;
        this.scene.add(this.light);
        this.light_target = new THREE.Mesh(new THREE.BoxGeometry(0, 0, 0), new THREE.MeshStandardMaterial());
        this.scene.add(this.light_target);
        this.light.target = this.light_target;

        setTimeout(render, 1000);
        /*
            const directional_light = new THREE.DirectionalLight(0xFFFFFF, 1);
            directional_light.position.set(0, 1000, 1000);
            this.scene.add(directional_light);
        */
    }
    view() {
        let player_move = playerdata.move(this);
        this.camera.quaternion.setFromEuler(player_move.euler);
        this.camera.position.x = player_move.position.x;
        this.camera.position.y = player_move.position.y;
        this.camera.position.z = player_move.position.z;
        /*
        銃関連
        if (keydata.action.reload && playerdata.reload_time == 0) {
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



        /*
        if (keydata.action.space && camera.position.y < 100)
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

        // camera.translateOnAxis(new THREE.Vector3(Number(keydata.action.right) - Number(keydata.action.left), 0, Number(keydata.action.down) - Number(keydata.action.up)), 3);

        mousedata.update();

        this.light.rotation.z = this.camera.rotation.z;
        this.light.rotation.x = this.camera.rotation.x;
        this.light.rotation.y = this.camera.rotation.y;
        this.light.position.z = this.camera.position.z;
        this.light.position.x = this.camera.position.x;
        this.light.position.y = this.camera.position.y;
        // light.translateOnAxis(new THREE.Vector3(0, -1, 0), 80);
        this.light_target.rotation.z = this.camera.rotation.z;
        this.light_target.rotation.x = this.camera.rotation.x;
        this.light_target.rotation.y = this.camera.rotation.y;
        this.light_target.position.z = this.camera.position.z;
        this.light_target.position.x = this.camera.position.x;
        this.light_target.position.y = this.camera.position.y;
        this.light_target.translateOnAxis(new THREE.Vector3(0, 0, -1), 100);


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
        this.eventobj.children.forEach((element) => {
            element.event(this.camera);
        });
        this.renderer.render(this.scene, this.camera);
    }
}

class player {
    constructor() {
        this.reload_time = 0;
        this.shot_time = 0;
        this.speed = 0;
        this.position = {
            x: 0,
            y: 0,
            z: 0
        };
        this.euler = new THREE.Euler(0, 0, 0, 'YXZ');;
    }
    move(main) {
        // 移動前の座標をキャッシュ
        let cache = this.position;
        // 方向による移動量の計算

        // _euler.setFromQuaternion(main.camera.quaternion);
        this.euler.y -= mousedata.x;
        this.euler.x = Math.max(Math.PI / 2 - Math.PI, Math.min(Math.PI / 2 - 0, this.euler.x - mousedata.y));

        // 移動速度
        if (keydata.action.sneak)
            this.speed = 6 / (config.quality.fps / 60);
        else
            this.speed = 3 / (config.quality.fps / 60);
        // 移動
        if (keydata.action.up && keydata.action.right) {
            this.position.z -= Math.cos(this.euler.y - Math.PI / 2.5) * this.speed;
            this.position.x -= Math.sin(this.euler.y - Math.PI / 2.5) * this.speed;
        } else if (keydata.action.up && keydata.action.left) {
            this.position.z += Math.cos(this.euler.y - Math.PI / 1.5) * this.speed;
            this.position.x += Math.sin(this.euler.y - Math.PI / 1.5) * this.speed;
        } else if (keydata.action.down && keydata.action.right) {
            this.position.z -= Math.cos(this.euler.y - Math.PI / 1.5) * this.speed;
            this.position.x -= Math.sin(this.euler.y - Math.PI / 1.5) * this.speed;
        } else if (keydata.action.down && keydata.action.left) {
            this.position.z += Math.cos(this.euler.y - Math.PI / 2.5) * this.speed;
            this.position.x += Math.sin(this.euler.y - Math.PI / 2.5) * this.speed;
        } else if (keydata.action.up) {
            this.position.z -= Math.cos(this.euler.y) * this.speed;
            this.position.x -= Math.sin(this.euler.y) * this.speed;
        } else if (keydata.action.down) {
            this.position.z += Math.cos(this.euler.y) * this.speed;
            this.position.x += Math.sin(this.euler.y) * this.speed;
        } else if (keydata.action.right) {
            this.position.z -= Math.cos(this.euler.y - Math.PI / 2) * this.speed;
            this.position.x -= Math.sin(this.euler.y - Math.PI / 2) * this.speed;
        } else if (keydata.action.left) {
            this.position.z += Math.cos(this.euler.y - Math.PI / 2) * this.speed;
            this.position.x += Math.sin(this.euler.y - Math.PI / 2) * this.speed;
        }

        // 当たり判定 x軸


        [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0].forEach((data_y) => {
            [30, 20, 10, 0, -10, -20, -30].forEach((data_x) => {

                let TopOverPos = new THREE.Vector3(this.position.x + Math.abs(data_x), this.position.y + data_y, this.position.z + data_x);
                let downVect = new THREE.Vector3(-1, 0, 0);
                let ray = new THREE.Raycaster(TopOverPos, downVect.normalize());
                let flag = false;
                let objs = ray.intersectObjects(main.wall.children, true);
                objs.forEach((element) => {
                    if (this.position.x < element.point.x + Math.abs(data_x))
                        flag = true;
                });
                if (flag)
                    this.position.x = cache.x;
            });
        });

        // 当たり判定 z軸

        [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0].forEach((data_y) => {
            [30, 20, 10, 0, -10, -20, -30].forEach((data_x) => {

                let TopOverPos = new THREE.Vector3(this.position.x + data_x, this.position.y + data_y, this.position.z + Math.abs(data_x));
                let downVect = new THREE.Vector3(0, 0, -1);
                let ray = new THREE.Raycaster(TopOverPos, downVect.normalize());
                let flag = false;
                let objs = ray.intersectObjects(main.wall.children, true);
                objs.forEach((element) => {
                    if (this.position.z < element.point.z + Math.abs(data_x))
                        flag = true;
                });
                if (flag)
                    this.position.z = cache.z;
            });
        });

        /* 縦方向判定 */

        let PlayerHeight = main.camera.position.y - 100;
        let TopOverPos = new THREE.Vector3(main.camera.position.x, PlayerHeight + 20, main.camera.position.z);
        let downVect = new THREE.Vector3(0, -1, 0);
        let ray = new THREE.Raycaster(TopOverPos, downVect.normalize());
        let preY = PlayerHeight - 5;
        let objs = ray.intersectObjects(main.floor.children, true);
        objs.forEach((element) => {
            if (preY < element.point.y)
                preY = element.point.y;
        });
        /* 接触点 + 身長 */
        this.position.y = preY + 100;

        return {
            position: this.position,
            euler: this.euler
        };
    }
}
let playerdata = new player;
class key {
    constructor() {
        this.action = {
            "up": false,
            "down": false,
            "right": false,
            "left": false,
            "sneak": false,
        };
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


function render() {
    if (config.stats) {
        main.stats.begin();
    }
    setTimeout(render, 1000 / config.quality.fps);
    main.view();
    if (config.stats) {
        main.stats.end();
    }
}

/*メモ欄 */

/*
平行移動するコード translateOnAxisで代用できるらしい 車輪の再開発をしてしまった
gun.position.z = camera.position.z - Math.cos(_euler.y) * Math.cos(_euler.x) * 10;
gun.position.x = camera.position.x - Math.sin(_euler.y) * Math.cos(_euler.x) * 10;
gun.position.y = camera.position.y + Math.sin(_euler.x) * 10;
*/