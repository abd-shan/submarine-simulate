import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import {Move} from "./physics/move";
import {Constants} from "./physics/Constants";
import {Ui} from "./physics/ui";


const propellerUrl = new URL('./assets/propeller.glb', import.meta.url);
const frontRightFinUrl = new URL('./assets/frontRightFin.glb', import.meta.url);
const frontLeftFinUrl = new URL('./assets/frontLeftFin.glb', import.meta.url);
const bottomTailFinUrl = new URL('./assets/bottomTailFin.glb', import.meta.url);
const BackRightFinUrl = new URL('./assets/BackRightFin.glb', import.meta.url);
const BackLeftFinUrl = new URL('./assets/BackLeftFin.glb', import.meta.url);
const submarineUrl = new URL('./assets/submarine.glb', import.meta.url);
const topTailFinUrl = new URL('./assets/topTailFin.glb', import.meta.url);
const waterUrl = new URL('./assets/water_animation.glb', import.meta.url);
const FishUrl = new URL('./assets/the_fish_particle.glb', import.meta.url);
const weed2Url = new URL('./assets/ss.glb', import.meta.url);
const SandUrl = new URL('./assets/sand.glb', import.meta.url);
const WeedUrl = new URL('./assets/sea_weed.glb', import.meta.url);
const stoneUrl = new URL('./assets/plantisland.glb', import.meta.url);
const spongeUrl = new URL('./assets/sponge.glb', import.meta.url);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xa1caff);


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(-100, -100, -300); // Starting camera position near the submarine and below water
// Good starting camera position // Starting camera position near the submarine and below water


const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();


{

    const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 10);
    const directionalLight3 = new THREE.DirectionalLight(0xa1cafc, 10);
    const directionalLight4 = new THREE.DirectionalLight(0xffffff, 10);
    directionalLight2.position.set(0, -10, 0);
    directionalLight3.position.set(-100, 0, 0);
    directionalLight4.position.set(10, -10, 0);
    scene.add(directionalLight, directionalLight2);

}


// const axesHelper = new THREE.AxesHelper(20);
// scene.add(axesHelper);


//variables

//hiring
let moveFL1;
let moveFR2;
let moveBL3;
let moveBR4;
let moveBT5;
let moveTT6;
let isEngineRunning = false;
let controls, water, mixer, fishMixer1, fishMixer2, fishMixer3, fishMixer4, fishMixer5
    , Sand, Weed, Weed1, Weed2, Weed3, Weed4, Weed5, sponge, plant, wed, mixer1, mixer2, mixer3, mixer4, mixer5, mixer6,
    mixer7;

// adjusting
let propellerRotationSpeed = Math.PI;

// angels
const frontRightAngle = Math.PI / 2;
const frontLeftAngle = Math.PI / 2;
const backRightAngle = Math.PI / 2;
const backLeftAngle = Math.PI / 2;
const topTailAngle = Math.PI / 2;
const bottomTailAngle = Math.PI / 2;


//submarine parts
let propeller;
let submarine;
export var frontRightFin;
export var frontLeftFin;
export var backLeftFin;
export var backRightFin;
export var bottomTailFin;
export var topTailFin;


//load water
const assetLoader = new GLTFLoader();
assetLoader.load(waterUrl.href, function (gltf) {
    water = gltf.scene;

    water.traverse(function (child) {
        if (child.isMesh) {
            child.material.color.set(0x639db9);
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    water.scale.set(55, 70, 55);
    water.position.set(0, 0, -10);

    mixer = new THREE.AnimationMixer(water);
    const action = mixer.clipAction(gltf.animations[0]);
    action.play();

    scene.add(water);

});


assetLoader.load(stoneUrl.href, function (gltf) {
    plant = gltf.scene;
    plant.position.set(-100, -100, 800);
    plant.scale.set(500, 500, 500);

    // Assuming the model has at least one mesh
    plant.traverse((node) => {
        if (node.isMesh) {
            // Store the original color
            node.userData.originalColor = node.material.color.clone();
        }
    });

    scene.add(plant);


});

//load weed
assetLoader.load(weed2Url.href, function (gltf) {
    wed = gltf.scene;
    wed.position.set(-600, -600, -150);
    wed.scale.set(50, 50, 50);
    wed.traverse(function (child) {
        if (child.isMesh) {
            child.material.color.set(0xff0000); // Replace 'yourColorHere' with a hex color code, like '#ff0000' for red
        }
    });
    scene.add(wed);
    const wed1 = wed.clone();
    wed1.position.set(-300, -600, -400);
    scene.add(wed1);

});


assetLoader.load(spongeUrl.href, function (gltf) {
    sponge = gltf.scene;
    sponge.position.set(100, -600, -600);
    sponge.scale.set(1000, 1000, 1000);

    // scene.add(sponge);  // I dare you to uncomment this line

});


assetLoader.load(SandUrl.href, function (gltf) {
    Sand = gltf.scene;
    Sand.position.set(0, -600, -600);
    Sand.scale.set(50, 50, 50);

    scene.add(Sand);


});
// load weed
assetLoader.load(WeedUrl.href, function (gltf) {
    Weed = gltf.scene;
    Weed.position.set(-200, -600, -600);
    Weed.scale.set(60, 60, 60);
    mixer2 = new THREE.AnimationMixer(Weed);
    const action2 = mixer2.clipAction(gltf.animations[0]);
    action2.play();

    scene.add(Weed);
});
assetLoader.load(WeedUrl.href, function (gltf) {
    Weed1 = gltf.scene;
    Weed1.position.set(400, -600, -200);
    Weed1.scale.set(60, 60, 60);
    mixer3 = new THREE.AnimationMixer(Weed1);
    const action3 = mixer3.clipAction(gltf.animations[0]);
    action3.play();

    scene.add(Weed1);
});
assetLoader.load(WeedUrl.href, function (gltf) {
    Weed2 = gltf.scene;
    Weed2.position.set(-500, -600, 300);
    Weed2.scale.set(60, 60, 60);
    mixer4 = new THREE.AnimationMixer(Weed2);
    const action4 = mixer4.clipAction(gltf.animations[0]);
    action4.play();
    scene.add(Weed2);
});
assetLoader.load(WeedUrl.href, function (gltf) {
    Weed3 = gltf.scene;
    Weed3.position.set(200, -600, 500);
    Weed3.scale.set(60, 60, 60);
    mixer5 = new THREE.AnimationMixer(Weed3);
    const action5 = mixer5.clipAction(gltf.animations[0]);
    action5.play();

    scene.add(Weed3);
});
assetLoader.load(WeedUrl.href, function (gltf) {
    Weed4 = gltf.scene;
    Weed4.position.set(300, -600, 100);
    Weed4.scale.set(60, 60, 60);
    mixer6 = new THREE.AnimationMixer(Weed4);
    const action6 = mixer6.clipAction(gltf.animations[0]);
    action6.play();

    scene.add(Weed4);
});
assetLoader.load(WeedUrl.href, function (gltf) {
    Weed5 = gltf.scene;
    Weed5.position.set(-50, -600, -500);
    Weed5.scale.set(60, 60, 60);
    mixer7 = new THREE.AnimationMixer(Weed5);
    const action7 = mixer7.clipAction(gltf.animations[0]);
    action7.play();
    scene.add(Weed5);
});


//load fishes
assetLoader.load(FishUrl.href, function (gltf) {
    const fish = gltf.scene;

    fish.traverse(function (child) {
        if (child.isMesh) {
            child.material.color.set(0xff0000);
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    const fish1 = fish.clone();
    fish1.position.set(150, -90, 50);
    fish1.scale.set(15, 20, 10);
    fishMixer1 = new THREE.AnimationMixer(fish1);
    const action1 = fishMixer1.clipAction(gltf.animations[0]);
    action1.play();

    const fish2 = fish.clone();
    fish2.position.set(-100, -150, 100);
    fish2.scale.set(50, 30, 10);
    fishMixer2 = new THREE.AnimationMixer(fish2);
    const action2 = fishMixer2.clipAction(gltf.animations[0]);
    action2.play();

    const fish3 = fish.clone();
    fish3.position.set(-400, -160, 100);
    fish3.scale.set(60, 40, 10);
    fishMixer3 = new THREE.AnimationMixer(fish3);
    const action3 = fishMixer3.clipAction(gltf.animations[0]);
    action3.play();

    const fish4 = fish.clone();
    fish4.position.set(400, -180, 100);
    fish4.scale.set(40, 50, 10);
    fishMixer4 = new THREE.AnimationMixer(fish4);
    const action4 = fishMixer4.clipAction(gltf.animations[0]);
    action4.play();

    const fish5 = fish.clone();
    fish5.position.set(-600, -180, -100);
    fish5.scale.set(60, 30, 10);
    fishMixer5 = new THREE.AnimationMixer(fish5);
    const action5 = fishMixer5.clipAction(gltf.animations[0]);
    action5.play();

    scene.add(fish1);
    scene.add(fish2);
    scene.add(fish3);
    scene.add(fish4);
    scene.add(fish5);


});

controls = new OrbitControls(camera, renderer.domElement);
orbit.target.set(100, -50, 0);
orbit.maxPolarAngle = Math.PI * 0.9;
controls.minDistance = 40.0;
controls.maxDistance = 500.0;
controls.update();

const sunGeometry = new THREE.SphereGeometry(7, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({color: 0xffff99,});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(0, 170, +200);
scene.add(sun);


window.addEventListener('resize', onWindowResize);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

const x = 1 / (233.96635502576828)
const y = 1 / (285.27309133759175)
const z = 1 / (1413.5373101547893)


// Load Submarine
const submarineLoader = new GLTFLoader();
submarineLoader.load(submarineUrl.href, (gltf) => {
    submarine = gltf.scene;
    submarine.position.set(1000, -100, 0);
    scene.add(submarine);

    const propellerLoader = new GLTFLoader();
    propellerLoader.load(propellerUrl.href, (gltf) => {
        propeller = gltf.scene;

        submarine.add(propeller);
    }, () => {

    }, (error) => {
        console.error(error);
    });

    const frontRightFinLoader = new GLTFLoader();
    frontRightFinLoader.load(frontRightFinUrl.href, (gltf) => {
        frontRightFin = gltf.scene;
        // console.log()
        frontRightFin.traverse(child => {
            if (child.isMesh) {
                child.geometry.computeBoundingBox();
                child.geometry.boundingBox.getCenter(frontRightFin.position);
            }
        });
        frontRightFin.position.set(145, -10, -320)

        submarine.add(frontRightFin);
        // console.log("Loaded front right fin!");
    }, undefined, (error) => {
        console.error(error);
    });
    const frontLeftFinLoader = new GLTFLoader();
    frontLeftFinLoader.load(frontLeftFinUrl.href, (gltf) => {
        frontLeftFin = gltf.scene;
        frontLeftFin.traverse(child => {
            if (child.isMesh && child.geometry) {
                // console.log("done");
                try {

                    child.geometry.computeBoundingBox();
                    child.geometry.boundingBox.getCenter(frontLeftFin.position);
                    child.updateMatrixWorld();

                } catch (error) {
                    console.error('An error occurred while processing geometry in front left fin:', error);
                }
            }
        });
        frontLeftFin.position.set(-145, 0, -320)
        submarine.add(frontLeftFin);
        // console.log("Loaded front left fin!");

        rotateFin(frontLeftFin, frontLeftAngle, 0.1);

    }, undefined, (error) => {
        console.error(error);
    });

    const BackLeftFinLoader = new GLTFLoader();
    BackLeftFinLoader.load(BackLeftFinUrl.href, (gltf) => {
        backLeftFin = gltf.scene;
        backLeftFin.traverse(child => {
            if (child.isMesh && child.geometry) {
                child.geometry.computeBoundingBox();
                child.geometry.boundingBox.getCenter(backLeftFin.position);
                child.updateMatrixWorld();
            }
        });
        backLeftFin.position.set(-100, 0, 662)
        submarine.add(backLeftFin);
        // console.log("Loaded back left fin!");
    }, undefined, (error) => {
        console.log(error);
    })

    const BackRightFinLoader = new GLTFLoader();
    BackRightFinLoader.load(BackRightFinUrl.href, (gltf) => {
        backRightFin = gltf.scene;
        backRightFin.traverse(child => {
            if (child.isMesh) {
                child.geometry.computeBoundingBox();
                child.geometry.boundingBox.getCenter(backRightFin.position);
                child.updateMatrixWorld();
            }
        });
        backRightFin.position.set(100, 5, 662);
        submarine.add(backRightFin);
        // console.log("Loaded back right fin!");
    }, undefined, (error) => {
        console.log(error);
    })


    const bottomTailFinLoader = new GLTFLoader();
    bottomTailFinLoader.load(bottomTailFinUrl.href, (gltf) => {
        bottomTailFin = gltf.scene;
        bottomTailFin.traverse(child => {
            if (child.isMesh) {
                child.geometry.computeBoundingBox();
                child.geometry.boundingBox.getCenter(bottomTailFin.position);
                child.updateMatrixWorld();
            }
        });
        bottomTailFin.position.set(0, -115, 665)
        submarine.add(bottomTailFin);
        // console.log("Loaded bottom tail fin!");
    }, undefined, (error) => {
        console.log(error);
    })

    const topTailFinLoader = new GLTFLoader();
    topTailFinLoader.load(topTailFinUrl.href, (gltf) => {
        topTailFin = gltf.scene;
        topTailFin.traverse(child => {
            if (child.isMesh) {
                child.geometry.computeBoundingBox();
                child.geometry.boundingBox.getCenter(topTailFin.position);
                child.updateMatrixWorld();
            }
        });
        topTailFin.position.set(0, 115, 665)
        submarine.add(topTailFin);
        // console.log("Loaded top tail fin!");
    }, undefined, (error) => {
        console.log(error);
    })


    submarine.scale.set(x, y, z);


    animate();
}, undefined, (error) => {
    console.error(error);
});

function updatePropeller() {
    if (propeller) {
        // const maxSpeed = Game.move.totalCenterForce.vector.length()
        const maxSpeed = Constants.SpeedOfFin
        if (isEngineRunning) {
            propeller.rotation.z += 2 * propellerRotationSpeed * maxSpeed * (1 / 60) * (1 / 60);
        } else {
            propeller.rotation.z *= 0.97; // Slow down propeller when engine is off
        }
    }
}

function rotateFin(fin, targetAngle, speed) {
    const currentRotation = fin.rotation.x;
    const angleDifference = targetAngle - currentRotation;

    // Convert targetAngle to radians if it's not already
    if (targetAngle > Math.PI * 2 || targetAngle < -Math.PI * 2) {
    }

    const clampedAngleDifference = Math.min(Math.max(angleDifference, -speed), speed);

    fin.rotation.x += clampedAngleDifference;

    Math.max(0.01, Math.abs(angleDifference) * 0.1);
}

function rotateFinTail(fin, targetAngle, speed) {
    const currentRotation = fin.rotation.y;
    const angleDifference = targetAngle - currentRotation;

    if (targetAngle > Math.PI * 6 || targetAngle < -Math.PI * 6) {
    }

    const clampedAngleDifference = Math.min(Math.max(angleDifference, -speed), speed);

    fin.rotation.y += clampedAngleDifference;

    Math.max(0.01, Math.abs(angleDifference) * 0.1);
}

export function moveFrontFin() {
    moveFL1 = !moveFL1;
    if (moveFL1) {
        rotateFin(frontLeftFin, frontLeftAngle, 0.1); // Adjust speed if needed
    }
    moveFR2 = !moveFR2;
    if (moveFR2) {
        rotateFin(frontRightFin, frontRightAngle, 0.1);
    }


}

export function moveBackFin() {

    moveBL3 = !moveBL3;
    if (moveBL3) {
        rotateFin(backLeftFin, backLeftAngle, 0.1);
    }
    moveBR4 = !moveBR4;
    if (moveBR4) {
        rotateFin(backRightFin, backRightAngle, 0.1);

    }


}

export function moveTailFin() {

    moveBT5 = !moveBT5;
    if (moveBT5) {
        rotateFinTail(bottomTailFin, bottomTailAngle, 0.1);
    }
    moveTT6 = !moveTT6;
    if (moveTT6) {
        rotateFinTail(topTailFin, topTailAngle, 0.1);
    }


}


document.addEventListener('keydown', (event) => {

    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);

    switch (event.code) {


        case 'Digit1':
            moveFL1 = !moveFL1;
            if (moveFL1) {
                rotateFin(frontLeftFin, frontLeftAngle, 0.1); // Adjust speed if needed
            }
            // console.log("move front left fin " + moveFL1);
            break;

        case 'Digit2':
            moveFR2 = !moveFR2;
            if (moveFR2) {
                rotateFin(frontRightFin, frontRightAngle, 0.1);
            }
            // console.log("move front right fin " + moveFR2);
            break;

        case 'Digit3':
            moveBL3 = !moveBL3;
            if (moveBL3) {
                rotateFin(backLeftFin, backLeftAngle, 0.1);
            }
            // console.log("move back left fin " + moveBL3);
            break;

        case 'Digit4':
            moveBR4 = !moveBR4;
            if (moveBR4) {
                rotateFin(backRightFin, backRightAngle, 0.1);
            }
            // console.log("move back right fin " + moveBR4);
            break;

        case 'Digit5':
            moveBT5 = !moveBT5;
            if (moveBT5) {
                rotateFinTail(bottomTailFin, bottomTailAngle, 0.1);
            }
            // console.log("move bottom tail " + moveBT5);
            break;

        case 'Digit6':
            moveTT6 = !moveTT6;
            if (moveTT6) {
                rotateFinTail(topTailFin, topTailAngle, 0.1);
            }
            // console.log("move top tail " + moveTT6);
            break;

        case 'ArrowUp':  // Move camera up
            camera.position.y += 2;
            // console.log("ArrowUp error ");
            break;

        case 'ArrowDown':  // Move camera down
            camera.position.y -= 2;
            break;

        case 'ArrowLeft': {
            let left = direction.clone()
            left.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);
            camera.position.add(left.multiplyScalar(2))
        }
            break;
        case 'ArrowRight': {
            let right = direction.clone()
            right.applyAxisAngle(new THREE.Vector3(0, 1, 0), -1 * Math.PI / 2);
            camera.position.add(right.multiplyScalar(2))
        }
            break;
        ///////
        case 'KeyW':
            camera.position.add(direction.multiplyScalar(2))
            break;
        case 'KeyS':
            camera.position.sub(direction.multiplyScalar(2))
            break;
        case 'KeyA': {
            let left = direction.clone()
            left.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);
            camera.position.add(left.multiplyScalar(2))
        }
            break;
        case 'KeyD': {
            let right = direction.clone()
            right.applyAxisAngle(new THREE.Vector3(0, 1, 0), -1 * Math.PI / 2);
            camera.position.add(right.multiplyScalar(2))
        }
            break;

    }
});

// new Game()
new Ui();
let move = new Move()


// function updateFins(){
//     frontRightFin.rotation = Constants.frontRightFinAngle* (Math.PI/180)
//
// }


function animate() {
    move.calculateCurrentPosition();
    submarine.setRotationFromQuaternion(Move.currentPosition.quaternion);
    submarine.position.copy(Move.currentPosition.position);
    requestAnimationFrame(animate);

    // console.log(submarine.position)

    // Game.updateFrictionForce()
    controls.target.copy(submarine.position);
    controls.update();

    if (mixer) mixer.update(0.0005);
    if (mixer1) mixer.update(0.0005);
    if (fishMixer1) fishMixer1.update(0.01);
    if (fishMixer2) fishMixer2.update(0.01);
    if (fishMixer3) fishMixer3.update(0.01);
    if (fishMixer4) fishMixer4.update(0.01);
    if (fishMixer5) fishMixer5.update(0.01);
    if (mixer2) mixer2.update(0.04);
    if (mixer3) mixer2.update(0.04);
    if (mixer4) mixer2.update(0.04);
    if (mixer5) mixer2.update(0.04);
    if (mixer6) mixer2.update(0.04);
    if (mixer7) mixer2.update(0.04);


    submarine.scale.set(x * 2 * Constants.SUBMARINE_RADIUS, y * 2 * Constants.SUBMARINE_RADIUS, z * Constants.SUBMARINE_LENGTH);

    updateInfoText()


    isEngineRunning = move.totalCenterForce.vector.x !== 0 || move.totalCenterForce.vector.z !== 0;
    updatePropeller();
    renderer.render(scene, camera);
}

function updateInfoText() {

    let up = new THREE.Vector3(0, 1, 0);
    up = up.clone().applyQuaternion(Move.currentPosition.quaternion)

    let front = new THREE.Vector3(0, 0, -1);
    front = front.clone().applyQuaternion(Move.currentPosition.quaternion)


    document.getElementById('info-text').innerText =
        'Position:' +
        '\nx: ' + Move.currentPosition.position.x.toFixed(10) +
        '\ny: ' + Move.currentPosition.position.y.toFixed(10) +
        '\nz: ' + Move.currentPosition.position.z.toFixed(10) +

        '\n\nUp:' +
        '\nx:' + up.x.toFixed(10) +
        '\ny:' + up.y.toFixed(10) +
        '\nz:' + up.z.toFixed(10) +

        '\n\nFront' +
        '\nx:' + front.x.toFixed(10) +
        '\ny:' + front.y.toFixed(10) +
        '\nz:' + front.z.toFixed(10)

}
