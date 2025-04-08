import {Fin} from './Fin';
import {Constants} from './Constants';
import * as THREE from 'three';
import {
    moveFrontFin,
    moveBackFin,
    moveTailFin,
    frontRightFin,
    frontLeftFin,
    backLeftFin,
    backRightFin,
    bottomTailFin,
    topTailFin
} from '../main';

export class FinHandle {
    public static fins: { name: string; fin: Fin, mesh: THREE.Mesh, isHorizontal: boolean }[] = [];

    constructor() {
        const fRApplicationPoint = new THREE.Vector3((Constants.SUBMARINE_RADIUS + Constants.FinLength), 0, -(Constants.SUBMARINE_LENGTH / 2));
        const fLApplicationPoint = new THREE.Vector3(-1 * (Constants.SUBMARINE_RADIUS + Constants.FinLength), 0, -(Constants.SUBMARINE_LENGTH / 2));
        const bRApplicationPoint = new THREE.Vector3((Constants.SUBMARINE_RADIUS + Constants.FinLength), 0, Constants.SUBMARINE_LENGTH / 2);
        const bLApplicationPoint = new THREE.Vector3(-1 * (Constants.SUBMARINE_RADIUS + Constants.FinLength), 0, Constants.SUBMARINE_LENGTH / 2);
        const tTApplicationPoint = new THREE.Vector3(0, (Constants.SUBMARINE_RADIUS + Constants.FinLength), Constants.SUBMARINE_LENGTH / 2);
        const bTApplicationPoint = new THREE.Vector3(0, -1 * (Constants.SUBMARINE_RADIUS + Constants.FinLength), Constants.SUBMARINE_LENGTH / 2);


        FinHandle.fins.push(
            {
                name: 'FrontRightFin',
                fin: new Fin(fRApplicationPoint, Constants.frontRightFinAngle, true),
                mesh: frontRightFin,
                isHorizontal: true
            },
            {
                name: 'FrontLeftFin',
                fin: new Fin(fLApplicationPoint, Constants.frontLeftFinAngle, true),
                mesh: frontLeftFin,
                isHorizontal: true
            },
            {
                name: 'BackRightFin',
                fin: new Fin(bRApplicationPoint, Constants.backRightFinAngle, true),
                mesh: backRightFin,
                isHorizontal: true
            },
            {
                name: 'BackLeftFin',
                fin: new Fin(bLApplicationPoint, Constants.backLeftFinAngle, true),
                mesh: backLeftFin,
                isHorizontal: true
            },
            {
                name: 'TopTailFin',
                fin: new Fin(tTApplicationPoint, Constants.topTailFinAngle, false),
                mesh: topTailFin,
                isHorizontal: false
            },
            {
                name: 'BottomTailFin',
                fin: new Fin(bTApplicationPoint, Constants.bottomTailFinAngle, false),
                mesh: bottomTailFin,
                isHorizontal: false
            }
        );


    }


}


