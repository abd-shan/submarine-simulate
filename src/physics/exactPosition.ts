import * as THREE from 'three';

export class ExactPosition {
    public position: THREE.Vector3;
    public quaternion: THREE.Quaternion;

    constructor(position: THREE.Vector3 = new THREE.Vector3(), quaternion: THREE.Quaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(), 0)) {
        this.position = position;
        this.quaternion = quaternion;
    }

}