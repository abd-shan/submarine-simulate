import {ExactPosition} from "./exactPosition";
import * as THREE from "three";

export class Constants {

    public static Mass = 100000000;
    public static readonly GRAVITY_ACCELERATE = 9.8;
    public static DENSITY_OF_LIQUID = 1000;
    public static DEPTH = 500;
    public static SUBMARINE_LENGTH = 100;
    public static SUBMARINE_RADIUS = 20;
    public static COEFFICIENT_OF_FRICTION = 0.02;
    public static WATER_PRESSURE_COEFFICIENT = 0.1
    public static Engine_Power = 100000;
    public static SpeedOfFin = 60;
    public static TankWater = 25663706.14359

    public static FinSpace = 4;

    public static FinLength = 2;

    public static FinWidth = 2;


    public static frontRightFinAngle = 0;
    public static frontLeftFinAngle = 0;
    public static backRightFinAngle = 0;
    public static backLeftFinAngle = 0;
    public static topTailFinAngle = 0;
    public static bottomTailFinAngle = 0;


    public static InitialPosition = new ExactPosition(new THREE.Vector3(0, -100, 0), new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 0), 0));

}
