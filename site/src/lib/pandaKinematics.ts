import { MathUtils, Object3D, Vector3 } from 'three';

/** Visual IK for the public Panda model. This is not a research policy or a robot controller. */
export function createPandaKinematics(robot: Object3D) {
  const joints = Array.from({ length:7 }, (_, i) => robot.getObjectByName(`joint${i+1}`)!);
  const limits = [[-2.8973,2.8973],[-1.7628,1.7628],[-2.8973,2.8973],[-3.0718,-.0698],[-2.8973,2.8973],[-.0175,3.7525],[-2.8973,2.8973]];
  const angles = [0,-.4,0,-2.2,0,1.8,.78];
  const hand = robot.getObjectByName('hand')!;
  const tip = new Object3D(); tip.position.set(0,0,.1034); hand.add(tip);
  const fingers = [robot.getObjectByName('finger_joint1')!,robot.getObjectByName('finger_joint2')!];
  const fingerOrigins = fingers.map(f => f.position.clone());
  const down = new Vector3(0,-1,0), tipPosition = new Vector3(), axis = new Vector3(), origin = new Vector3();
  const linear = new Vector3(), angular = new Vector3(), errorPosition = new Vector3(), errorRotation = new Vector3();
  const orientationWeight = .24;
  const update = () => { joints.forEach((j,i) => { j.rotation.z=angles[i]; }); robot.updateMatrixWorld(true); };
  update();
  function solve(target: Vector3, iterations=12) {
    for (let iteration=0; iteration<iterations; iteration++) {
      tipPosition.setFromMatrixPosition(tip.matrixWorld);
      errorPosition.copy(target).sub(tipPosition);
      angular.setFromMatrixColumn(hand.matrixWorld,2).normalize();
      errorRotation.crossVectors(angular,down).multiplyScalar(orientationWeight);
      if (errorPosition.lengthSq()<1e-8 && errorRotation.lengthSq()<1e-8) break;
      const error = [...errorPosition.toArray(),...errorRotation.toArray()];
      const jacobian = joints.map(joint => {
        axis.setFromMatrixColumn(joint.matrixWorld,2).normalize();
        origin.setFromMatrixPosition(joint.matrixWorld);
        linear.copy(tipPosition).sub(origin).crossVectors(axis,linear);
        return [...linear.toArray(),...axis.clone().multiplyScalar(orientationWeight).toArray()];
      });
      // Damped least squares keeps the seven-joint chain smooth near singularities.
      const matrix = Array.from({length:6},(_,r) => Array.from({length:7},(_,c) => c===6 ? error[r] : jacobian.reduce((n,j)=>n+j[r]*j[c],0)+(r===c?.0004:0)));
      for (let col=0;col<6;col++) {
        let pivot=col;
        for(let row=col+1;row<6;row++) if(Math.abs(matrix[row][col])>Math.abs(matrix[pivot][col])) pivot=row;
        [matrix[col],matrix[pivot]]=[matrix[pivot],matrix[col]];
        const divisor=matrix[col][col];
        for(let k=col;k<=6;k++) matrix[col][k]/=divisor;
        for(let row=0;row<6;row++) if(row!==col) { const factor=matrix[row][col]; for(let k=col;k<=6;k++) matrix[row][k]-=factor*matrix[col][k]; }
      }
      joints.forEach((_,i) => {
        const step=jacobian[i].reduce((n,v,k)=>n+v*matrix[k][6],0);
        angles[i]=MathUtils.clamp(angles[i]+MathUtils.clamp(step,-.12,.12),limits[i][0],limits[i][1]);
      });
      update();
    }
    return tip.getWorldPosition(tipPosition);
  }
  return {
    solve,
    tipPosition: () => tip.getWorldPosition(new Vector3()),
    grip: (closed: boolean) => fingers.forEach((finger,i) => { finger.position.copy(fingerOrigins[i]); finger.position.y+=closed?.018:.034; }),
  };
}
