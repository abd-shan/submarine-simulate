import * as THREE from 'three';

export class Force {

    public applicationPoint: THREE.Vector3
    public vector: THREE.Vector3


    constructor(applicationPoint: THREE.Vector3 = new THREE.Vector3(), vector: THREE.Vector3, Magnitude: number) {
        this.applicationPoint = applicationPoint;
        this.vector = vector;
        this.vector.normalize()
        this.vector = this.vector.multiplyScalar(Magnitude);
    }
}