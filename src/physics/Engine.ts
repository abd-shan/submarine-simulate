import * as THREE from 'three';
import {Force} from './Force';
import {Constants} from "./Constants";
import {Move} from "./move"

export default class EngineForce extends Force {
    constructor(applicationPoint = new THREE.Vector3()) {

        let front = new THREE.Vector3(0, 0, -1)
        front = front.clone().applyQuaternion(Move.currentPosition.quaternion)
        const direction = front
        const magnitude = Constants.Engine_Power * ((Constants.SpeedOfFin * 60) / 2 * Math.PI);
        super(applicationPoint, direction, magnitude);
    }
}
