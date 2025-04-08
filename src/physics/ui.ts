import * as dat from 'dat.gui';
import {Constants} from './Constants';

export class Ui {
    constructor() {
        const inputsGui = new dat.GUI(/*{ autoPlace: false }*/);

        const options = {
            Mass: Constants.Mass,
            Radius: Constants.SUBMARINE_RADIUS,
            Length: Constants.SUBMARINE_LENGTH,
            Engine_Power: Constants.Engine_Power,
            SpeedOfFin: Constants.SpeedOfFin,
            TankWater: Constants.TankWater,
            FinLength: Constants.FinLength,
            FinWidth: Constants.FinWidth,
            frontFinsAngle: 0,
            backFinsAngle: 0,
            tailFinsAngle: 0
        };

        inputsGui.add(options, 'Engine_Power').onChange((e) => {
            Constants.Engine_Power = e;
        });

        inputsGui.add(options, 'SpeedOfFin').onChange((s) => {
            Constants.SpeedOfFin = s;
        });

        inputsGui.add(options, 'Mass').onChange((m) => {
            Constants.Mass = m;
        });

        inputsGui.add(options, 'TankWater', 0, 50000000).onChange((t) => {
            Constants.TankWater = t;
        });

        inputsGui.add(options, 'Length').onChange((l) => {
            Constants.SUBMARINE_LENGTH = l;
        });

        inputsGui.add(options, 'Radius').onChange((r) => {
            Constants.SUBMARINE_RADIUS = r;
        });
        inputsGui.add(options, 'FinLength').onChange((l) => {
            Constants.FinLength = l;
        })
        inputsGui.add(options, 'FinWidth').onChange((r) => {
            Constants.FinWidth = r;
        })

        inputsGui.add(options, 'frontFinsAngle', -30, 30).name('Front Fins').onChange((angle) => {
            Constants.frontRightFinAngle = angle;
            Constants.frontLeftFinAngle = angle;
        });

        inputsGui.add(options, 'backFinsAngle', -30, 30).name('Back Fins').onChange((angle) => {
            Constants.backRightFinAngle = angle;
            Constants.backLeftFinAngle = angle;
        });

        inputsGui.add(options, 'tailFinsAngle', -30, 30).name('Tail Fins').onChange((angle) => {
            Constants.topTailFinAngle = angle;
            Constants.bottomTailFinAngle = angle;
        });


    }
}
