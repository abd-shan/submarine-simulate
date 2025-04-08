import * as THREE from 'three';
import {Force} from './Force';
import {Constants} from "./Constants";


export default class WeightForce extends Force {

    constructor(applicationPoint: THREE.Vector3 = new THREE.Vector3()) {
        const direction = new THREE.Vector3(0, -1, 0);
        const magnitude = (Constants.Mass + Constants.TankWater) * Constants.GRAVITY_ACCELERATE;
        super(applicationPoint, direction, magnitude);
    }


}