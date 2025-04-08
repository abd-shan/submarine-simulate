import {Force} from "./Force";
import * as THREE from "three";
import {Constants} from "./Constants";
import FrictionForce from "./FrictionForce";
import EngineForce from "./Engine";
import {ArchForce} from "./Archimedes";
import WeightForce from "./GravityForce";
import {FinHandle} from "./FinHandle";

export class Move {


    game() {
        Move.forces = {}
        new FinHandle();
        const weightForce = new WeightForce();
        const archForce = new ArchForce();
        const engine = new EngineForce();

        this.addForce('weightForce', weightForce)
        this.addForce('archForce', archForce)
        this.addForce('engine', engine)

        FinHandle.fins.forEach(fins => {
            this.addForce(fins.name, fins.fin);
        })

    }


    static forces = {}
    totalCenterForce
    posXForce = new Force(new THREE.Vector3(), new THREE.Vector3(0, 0, 0), 1)
    negXForce = new Force(new THREE.Vector3(), new THREE.Vector3(0, 0, 0), 1)
    posYForce = new Force(new THREE.Vector3(), new THREE.Vector3(0, 0, 0), 1)
    negYForce = new Force(new THREE.Vector3(), new THREE.Vector3(0, 0, 0), 1)
    posZForce = new Force(new THREE.Vector3(), new THREE.Vector3(0, 0, 0), 1)
    negZForce = new Force(new THREE.Vector3(), new THREE.Vector3(0, 0, 0), 1)
    parallelToXPos = []
    parallelToXNeg = []
    parallelToYPos = []
    parallelToYNeg = []
    parallelToZPos = []
    parallelToZNeg = []
    centerForces = []
    static currentPosition = Constants.InitialPosition

    acc_X
    acc_Y
    acc_Z

    alpha_X
    alpha_Y
    alpha_Z


    static vel_X = 0
    static vel_Y = 0
    static vel_Z = 0

    static vel_around_X = 0
    static vel_around_Y = 0
    static vel_around_Z = 0


    constructor() {
        this.addForce('', new Force(new THREE.Vector3(), new THREE.Vector3(0, 0, 0), 0));
    }


    calculateTotalForce() {
        this.totalCenterForce = new Force(new THREE.Vector3(), new THREE.Vector3(), 0);
        for (let key in this.centerForces) {
            this.totalCenterForce.vector.add(this.centerForces[key].vector)
        }

        const currentVelocity = new THREE.Vector3(Move.vel_X, Move.vel_Y, Move.vel_Z);
        const frictionForce = new FrictionForce(new THREE.Vector3(), currentVelocity);
        this.totalCenterForce.vector.add(frictionForce.vector);


        this.acc_X = this.totalCenterForce.vector.x / (Constants.Mass + Constants.TankWater)
        this.acc_Y = this.totalCenterForce.vector.y / (Constants.Mass + Constants.TankWater)
        this.acc_Z = this.totalCenterForce.vector.z / (Constants.Mass + Constants.TankWater)
    }


    sortForces() {
        this.game()

        this.posXForce = new Force(new THREE.Vector3(), new THREE.Vector3(0, 0, 0), 1)
        this.posYForce = new Force(new THREE.Vector3(), new THREE.Vector3(0, 0, 0), 1)
        this.posZForce = new Force(new THREE.Vector3(), new THREE.Vector3(0, 0, 0), 1)
        this.negXForce = new Force(new THREE.Vector3(), new THREE.Vector3(0, 0, 0), 1)
        this.negYForce = new Force(new THREE.Vector3(), new THREE.Vector3(0, 0, 0), 1)
        this.negZForce = new Force(new THREE.Vector3(), new THREE.Vector3(0, 0, 0), 1)

        this.parallelToXPos = []
        this.parallelToXNeg = []
        this.parallelToYPos = []
        this.parallelToYNeg = []
        this.parallelToZPos = []
        this.parallelToZNeg = []
        this.centerForces = []

        for (let key in Move.forces) {
            if (Move.forces[key].applicationPoint.x === 0 &&
                Move.forces[key].applicationPoint.y === 0 &&
                Move.forces[key].applicationPoint.z === 0) {
                this.centerForces.push(Move.forces[key])
            } else {
                if (Move.forces[key].vector.x !== 0) {
                    if (Move.forces[key].vector.x > 0)
                        this.parallelToXPos.push(Move.forces[key])
                    else if (Move.forces[key].vector.x < 0)
                        this.parallelToXNeg.push(Move.forces[key])
                } else if (Move.forces[key].vector.y !== 0) {
                    if (Move.forces[key].vector.y > 0)
                        this.parallelToYPos.push(Move.forces[key])
                    else if (Move.forces[key].vector.y < 0)
                        this.parallelToYNeg.push(Move.forces[key])
                } else if (Move.forces[key].vector.z !== 0) {
                    if (Move.forces[key].vector.z > 0)
                        this.parallelToZPos.push(Move.forces[key])
                    else if (Move.forces[key].vector.z < 0)
                        this.parallelToZNeg.push(Move.forces[key])
                }
            }
        }

        this.filterForces()
    }

    filterForces() {
        while (this.parallelToXPos.length > 0) {
            const nextForce = this.parallelToXPos.pop();
            this.posXForce = this.addTwoXForces(this.posXForce, nextForce);
        }
        while (this.parallelToXNeg.length > 0) {
            const nextForce = this.parallelToXNeg.pop();
            this.negXForce = this.addTwoXForces(this.negXForce, nextForce);
        }


        while (this.parallelToYPos.length > 0) {
            const nextForce = this.parallelToYPos.pop();
            this.posYForce = this.addTwoYForces(this.posYForce, nextForce);
        }

        while (this.parallelToYNeg.length > 0) {
            const nextForce = this.parallelToYNeg.pop();
            this.negYForce = this.addTwoYForces(this.negYForce, nextForce);
        }


        while (this.parallelToZPos.length > 0) {
            const nextForce = this.parallelToZPos.pop();
            this.posZForce = this.addTwoZForces(this.posZForce, nextForce);
        }
        while (this.parallelToZNeg.length > 0) {
            const nextForce = this.parallelToZNeg.pop();
            this.negZForce = this.addTwoZForces(this.negZForce, nextForce);
        }

        this.addToCentral()
    }

    addToCentral() {

        if (this.posXForce.applicationPoint.equals(new THREE.Vector3())) {
            this.centerForces.push(this.posXForce)
            this.posXForce = new Force(new THREE.Vector3(), new THREE.Vector3(), 1)
        }
        if (this.negXForce.applicationPoint.equals(new THREE.Vector3())) {
            this.centerForces.push(this.negXForce)
            this.negXForce = new Force(new THREE.Vector3(), new THREE.Vector3(), 1)
        }
        if (this.posYForce.applicationPoint.equals(new THREE.Vector3())) {
            this.centerForces.push(this.posYForce)
            this.posYForce = new Force(new THREE.Vector3(), new THREE.Vector3(), 1)
        }
        if (this.negYForce.applicationPoint.equals(new THREE.Vector3())) {
            this.centerForces.push(this.negYForce)
            this.negYForce = new Force(new THREE.Vector3(), new THREE.Vector3(), 1)
        }
        if (this.posZForce.applicationPoint.equals(new THREE.Vector3())) {
            this.centerForces.push(this.posZForce)
            this.posZForce = new Force(new THREE.Vector3(), new THREE.Vector3(), 1)
        }
        if (this.negZForce.applicationPoint.equals(new THREE.Vector3())) {
            this.centerForces.push(this.negZForce)
            this.negZForce = new Force(new THREE.Vector3(), new THREE.Vector3(), 1)
        }
        this.calculateTotalForce()
    }

    addTwoXForces(force1, force2) {
        let sumForce = new Force(new THREE.Vector3(), new THREE.Vector3(0, 0, 0), 1);

        if (force1.vector.equals(new THREE.Vector3())) {
            return force2
        }
        if (force2.vector.equals(new THREE.Vector3())) {
            return force1
        }


        const force1ApplicationPoint = force1.applicationPoint;
        const force2ApplicationPoint = force2.applicationPoint;


        if (force1ApplicationPoint.equals(force2ApplicationPoint)) {
            sumForce.applicationPoint.copy(force1ApplicationPoint);
            sumForce.vector = force1.vector.clone().add(force2.vector);

            return sumForce
        }
        //check x
        const resultingForce = force1.vector.clone().add(force2.vector);


        const ratio = Math.abs(force1.vector.x) / (Math.abs(force1.vector.x) + Math.abs(force2.vector.x));

        const sumApplicationPoint = force2ApplicationPoint.clone().lerp(force1ApplicationPoint, ratio);

        sumForce.vector = resultingForce;
        sumForce.applicationPoint = sumApplicationPoint

        return sumForce


    }

    addTwoYForces(force1, force2) {
        let sumForce = new Force(new THREE.Vector3(), new THREE.Vector3(), 1);

        if (force1.vector.equals(new THREE.Vector3())) {
            return force2
        }
        if (force2.vector.equals(new THREE.Vector3())) {
            return force1
        }

        const force1ApplicationPoint = force1.applicationPoint;
        const force2ApplicationPoint = force2.applicationPoint;

        if (force1ApplicationPoint.equals(force2ApplicationPoint)) {
            sumForce.applicationPoint.copy(force1ApplicationPoint);
            sumForce.vector = force1.vector.clone().add(force2.vector);

            return sumForce
        }

        const resultingForce = force1.vector.clone().add(force2.vector);

        const totalYMagnitude = Math.abs(force1.vector.y) + Math.abs(force2.vector.y);
        const ratio = Math.abs(force1.vector.y) / totalYMagnitude;

        const sumApplicationPoint = force2ApplicationPoint.clone().lerp(force1ApplicationPoint, ratio);

        sumForce.vector = resultingForce;
        sumForce.applicationPoint = sumApplicationPoint;

        return sumForce;
    }

    addTwoZForces(force1, force2) {
        let sumForce = new Force(new THREE.Vector3(), new THREE.Vector3(0, 0, 0), 1);

        if (force1.vector.equals(new THREE.Vector3())) {
            return force2
        }
        if (force2.vector.equals(new THREE.Vector3())) {
            return force1
        }


        const force1ApplicationPoint = force1.applicationPoint;
        const force2ApplicationPoint = force2.applicationPoint;

        if (force1ApplicationPoint.equals(force2ApplicationPoint)) {
            sumForce.applicationPoint.copy(force1ApplicationPoint);
            sumForce.vector = force1.vector.clone().add(force2.vector);

            return sumForce
        }
        //check z
        const resultingForce = force1.vector.clone().add(force2.vector);


        const ratio = Math.abs(force1.vector.z) / (Math.abs(force1.vector.z) + Math.abs(force2.vector.z));

        const sumApplicationPoint = force2ApplicationPoint.clone().lerp(force1ApplicationPoint, ratio);

        sumForce.vector = resultingForce;
        sumForce.applicationPoint = sumApplicationPoint

        return sumForce

    }


    calculateCurrentPosition() {
        this.sortForces()

        Move.vel_X = this.acc_X * (1 / 60) + Move.vel_X
        Move.vel_Y = this.acc_Y * (1 / 60) + Move.vel_Y
        Move.vel_Z = this.acc_Z * (1 / 60) + Move.vel_Z

        const animateSpeed = 0.001

        Move.currentPosition.position.add(new THREE.Vector3(animateSpeed, 0, 0).multiplyScalar(Move.vel_X));
        Move.currentPosition.position.add(new THREE.Vector3(0, animateSpeed, 0).multiplyScalar(Move.vel_Y));
        Move.currentPosition.position.add(new THREE.Vector3(0, 0, animateSpeed).multiplyScalar(Move.vel_Z));


        //     console.log(Move.currentPosition.position);


        {
            // Update the quaternion based on each force
            this.updateQuaternionForForce(this.posXForce);
            this.updateQuaternionForForce(this.negXForce);
            this.updateQuaternionForForce(this.posYForce);
            this.updateQuaternionForForce(this.negYForce);
            this.updateQuaternionForForce(this.posZForce);
            this.updateQuaternionForForce(this.negZForce);
        }
        return Move.currentPosition;
    }

    updateQuaternionForForce(force) {

        let vectorToPoint = force.applicationPoint.clone();
        let rotationAxis = force.vector.clone().cross(vectorToPoint).normalize();
        let distanceToApplicationPoint = vectorToPoint.length();

        let torque = distanceToApplicationPoint * force.vector.length()


        if (rotationAxis.x === 0 && rotationAxis.y === 0 && rotationAxis.z !== 0) {
            this.rotateAroundZ(torque, rotationAxis)
        }
        if (rotationAxis.x !== 0 && rotationAxis.y === 0 && rotationAxis.z === 0) {
            this.rotateAroundX(torque, rotationAxis)
        }
        if (rotationAxis.x === 0 && rotationAxis.y !== 0 && rotationAxis.z === 0) {
            this.rotateAroundY(torque, rotationAxis)
        }

    }

    rotateAroundX(torque, rotationAxis) {

        let iDelta = (Constants.Mass * Constants.SUBMARINE_LENGTH * Constants.SUBMARINE_LENGTH) / 12;

        this.alpha_X = torque / iDelta


        Move.vel_around_X += this.alpha_X * (1 / 60)

        let delta_Theta = 0

        delta_Theta += Move.vel_around_X * (1 / 60)

        delta_Theta = -1 * delta_Theta * Math.PI / 180


        let quaternionChange = new THREE.Quaternion().setFromAxisAngle(rotationAxis, delta_Theta)
        Move.currentPosition.quaternion.multiply(quaternionChange);
    }

    rotateAroundY(torque, rotationAxis) {
        let iDelta = (Constants.Mass * Constants.SUBMARINE_LENGTH * Constants.SUBMARINE_LENGTH) / 12;

        this.alpha_Y = torque / iDelta

        Move.vel_around_Y += this.alpha_Y * (1 / 60)

        let delta_Theta = 0

        delta_Theta += Move.vel_around_Y * (1 / 60)

        delta_Theta = -1 * delta_Theta * Math.PI / 180

        let quaternionChange = new THREE.Quaternion().setFromAxisAngle(rotationAxis, delta_Theta)
        Move.currentPosition.quaternion.multiply(quaternionChange);
    }

    rotateAroundZ(torque, rotationAxis) {
        let iDelta = (Constants.Mass * Constants.SUBMARINE_RADIUS * Constants.SUBMARINE_RADIUS) / 2

        this.alpha_Z = torque / iDelta

        Move.vel_around_Z += this.alpha_Z * (1 / 60)

        let delta_Theta = 0

        delta_Theta += Move.vel_around_Z * (1 / 60)

        delta_Theta = -1 * delta_Theta * Math.PI / 180


        let quaternionChange = new THREE.Quaternion().setFromAxisAngle(rotationAxis, delta_Theta)
        Move.currentPosition.quaternion.multiply(quaternionChange);
    }


    addForce(name, force) {
        if (force.vector.x !== 0) {
            const subForceX = new Force(force.applicationPoint, new THREE.Vector3(force.vector.x, 0, 0), Math.max(force.vector.x, -1 * force.vector.x));
            Move.forces[name + '_X'] = subForceX;
        }
        if (force.vector.y !== 0) {
            const subForceY = new Force(force.applicationPoint, new THREE.Vector3(0, force.vector.y, 0), Math.max(force.vector.y, -1 * force.vector.y));
            Move.forces[name + '_Y'] = subForceY;
        }
        if (force.vector.z !== 0) {
            const subForceZ = new Force(force.applicationPoint, new THREE.Vector3(0, 0, force.vector.z), Math.max(force.vector.z, -1 * force.vector.z));
            Move.forces[name + '_Z'] = subForceZ;
        }

    }

    removeForce(name) {
        delete Move.forces[name];
        delete Move.forces[name + '_X'];
        delete Move.forces[name + '_Y'];
        delete Move.forces[name + '_Z'];
    }



}
