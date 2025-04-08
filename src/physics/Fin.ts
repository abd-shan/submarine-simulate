import {Constants} from './Constants';
import {Force} from './Force';
import * as THREE from 'three';
import {Move} from './move'

export class Fin extends Force {
    constructor(applicationPoint: THREE.Vector3, angle: number, isHorizon: boolean) {

        let direction = new THREE.Vector3(0, 0, 0);
        let magnitude = 0;


        const C = Constants.COEFFICIENT_OF_FRICTION;
        const p = Constants.DENSITY_OF_LIQUID;
        const finSpace = Constants.FinLength * Constants.FinWidth

        const vel_vector = new THREE.Vector3(Move.vel_X, Move.vel_Y, Move.vel_Z);
        const vel_length = vel_vector.length()

        const vel_x = Move.vel_X
        const vel_y = Move.vel_Y
        const vel_z = Move.vel_Z

        const sin = Math.sin(angle * (Math.PI / 180))
        const cos = Math.cos(angle * (Math.PI / 180))

        const neg = -1 * (angle / Math.abs(angle))

        const f_x = (0.5 * C * finSpace * p * vel_length * vel_x) * neg
        const f_y = (0.5 * C * finSpace * p * vel_length * vel_y) * neg
        const f_z = (0.5 * C * finSpace * p * vel_length * vel_z) * neg

        // console.log(f_x)
        // console.log(f_y)
        // console.log(f_z)


        if (isHorizon) {

            direction.set(
                0,
                f_z * sin * sin + f_y * cos * sin,
                f_z * sin * cos + f_y * cos * cos
            );
        } else {

            direction.set(
                f_z * sin * sin + f_x * cos * cos,
                0,
                f_z * sin * cos + f_x * cos * sin
            );


        }


        magnitude = direction.length();

        direction = direction.clone().applyQuaternion(Move.currentPosition.quaternion)

        magnitude *= 10000 // a little cheat just to make things faster

        super(applicationPoint, direction, magnitude);
    }
}
