import * as THREE from 'three';
import {Force} from './Force';
import {Constants} from "./Constants";

export default class FrictionForce extends Force {
    constructor(applicationPoint: THREE.Vector3 = new THREE.Vector3(), velocity: THREE.Vector3) {
        const direction = new THREE.Vector3(0, 0, 0);
        const C = Constants.COEFFICIENT_OF_FRICTION;
        const W = Constants.WATER_PRESSURE_COEFFICIENT;
        const T_R = C + W;
        const r = Constants.SUBMARINE_RADIUS;
        const submarineLength = Constants.SUBMARINE_LENGTH;
        const p = Constants.DENSITY_OF_LIQUID;


        const Ax = 2 * r * submarineLength;
        const Ay = 2 * r * submarineLength;
        const Az = Math.PI * r * r;

        const vx = velocity.x;
        const vy = velocity.y;
        const vz = velocity.z;

        const vMagnitude = velocity.length();

        const Fx = -0.5 * T_R * Ax * p * vMagnitude * vx;
        const Fy = -0.5 * T_R * Ay * p * vMagnitude * vy;
        const Fz = -0.5 * T_R * Az * p * vMagnitude * vz;


        direction.set(Fx, Fy, Fz);
        const magnitude = direction.length();

        super(applicationPoint, direction, magnitude);

    }
}
