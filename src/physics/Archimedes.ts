import * as THREE from 'three';
import {Force} from './Force';
import {Constants} from "./Constants";
import {Move} from "./move"

export class ArchForce extends Force {
    constructor(applicationPoint: THREE.Vector3 = new THREE.Vector3()) {
        let volume = Math.PI * Math.pow(Constants.SUBMARINE_RADIUS, 2) * Constants.SUBMARINE_LENGTH;

        if (-1 * Move.currentPosition.position.y < Constants.SUBMARINE_RADIUS) {
            let h = Constants.SUBMARINE_RADIUS - Move.currentPosition.position.y;
            let r = Constants.SUBMARINE_RADIUS;
            let v2 = (Math.sqrt(2 * h * r - h * h) * (h - r) + r * r * (Math.PI - Math.acos((h - r) / r))) * Constants.SUBMARINE_LENGTH

            volume = v2
        }

        const magnitude = Constants.DENSITY_OF_LIQUID * Constants.GRAVITY_ACCELERATE * volume;

        const direction = new THREE.Vector3(0, 1, 0);

        super(applicationPoint, direction, magnitude);
    }

}