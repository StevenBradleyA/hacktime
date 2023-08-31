// import useSpline from "@splinetool/r3f-spline";
// import { OrthographicCamera } from "@react-three/drei";

// export default function Scene({ ...props }) {
//   const { nodes, materials } = useSpline(
//     "https://prod.spline.design/vC6L8LFnvRbgMcAo/scene.splinecode",
//   );
//   return (
//     <>
//       <color attach="background" args={["#000000"]} />
//       <group {...props} dispose={null}>
//         <scene name="Scene 1">
//           <group name="Snow" position={[-15.5, 39.3, -17.75]}>
//             <mesh
//               name="Sphere 19"
//               geometry={nodes["Sphere 19"].geometry}
//               material={materials["Metal Colorful Laser 01"]}
//               castShadow
//               receiveShadow
//               position={[-32.36, -25.63, -38.85]}
//             />
//             <mesh
//               name="Sphere 18"
//               geometry={nodes["Sphere 18"].geometry}
//               material={materials["Metal Colorful Laser 01"]}
//               castShadow
//               receiveShadow
//               position={[-32.36, -23.08, -36.78]}
//             />
//             <mesh
//               name="Sphere 22"
//               geometry={nodes["Sphere 22"].geometry}
//               material={materials["Metal Colorful Laser 01"]}
//               castShadow
//               receiveShadow
//               position={[37.97, -37.11, 7.6]}
//             />
//             <mesh
//               name="Sphere 21"
//               geometry={nodes["Sphere 21"].geometry}
//               material={materials["Metal Colorful Laser 01"]}
//               castShadow
//               receiveShadow
//               position={[40.93, -32.81, 0.76]}
//             />
//             <mesh
//               name="Sphere 20"
//               geometry={nodes["Sphere 20"].geometry}
//               material={materials["Metal Colorful Laser 01"]}
//               castShadow
//               receiveShadow
//               position={[40.93, -37.11, 4.65]}
//             />
//             <mesh
//               name="Sphere 17"
//               geometry={nodes["Sphere 17"].geometry}
//               material={materials["Metal Colorful Laser 01"]}
//               castShadow
//               receiveShadow
//               position={[-32.36, -41.78, -38.85]}
//             />
//             <mesh
//               name="Sphere 15"
//               geometry={nodes["Sphere 15"].geometry}
//               material={materials["Metal Colorful Laser 01"]}
//               castShadow
//               receiveShadow
//               position={[-32.36, -23.28, 21.05]}
//             />
//             <mesh
//               name="Sphere 16"
//               geometry={nodes["Sphere 16"].geometry}
//               material={materials["Metal Colorful Laser 01"]}
//               castShadow
//               receiveShadow
//               position={[-32.36, -27.89, 19.16]}
//             />
//             <mesh
//               name="Sphere 14"
//               geometry={nodes["Sphere 14"].geometry}
//               material={materials["Metal Colorful Laser 01"]}
//               castShadow
//               receiveShadow
//               position={[-32.36, -20.36, 18.43]}
//             />
//             <mesh
//               name="Sphere 13"
//               geometry={nodes["Sphere 13"].geometry}
//               material={materials["Metal Colorful Laser 01"]}
//               castShadow
//               receiveShadow
//               position={[-32.36, -33.14, 17.49]}
//             />
//             <mesh
//               name="Sphere 12"
//               geometry={nodes["Sphere 12"].geometry}
//               material={materials["Metal Colorful Laser 01"]}
//               castShadow
//               receiveShadow
//               position={[-15.91, -30.04, 34.54]}
//             />
//             <mesh
//               name="Sphere 11"
//               geometry={nodes["Sphere 11"].geometry}
//               material={materials["Metal Colorful Laser 01"]}
//               castShadow
//               receiveShadow
//               position={[-1.92, -28.82, 45.12]}
//             />
//             <mesh
//               name="Sphere 10"
//               geometry={nodes["Sphere 10"].geometry}
//               material={materials["Metal Colorful Laser 01"]}
//               castShadow
//               receiveShadow
//               position={[-32.36, 0, -10.74]}
//             />
//             <mesh
//               name="Sphere 9"
//               geometry={nodes["Sphere 9"].geometry}
//               material={materials["Metal Colorful Laser 01"]}
//               castShadow
//               receiveShadow
//               position={[-27.4, 0, 3.77]}
//             />
//             <mesh
//               name="Sphere 8"
//               geometry={nodes["Sphere 8"].geometry}
//               material={materials["Metal Colorful Laser 01"]}
//               castShadow
//               receiveShadow
//               position={[-27.9, -14.97, -17.48]}
//             />
//             <mesh
//               name="Sphere 7"
//               geometry={nodes["Sphere 7"].geometry}
//               material={materials["Metal Colorful Laser 01"]}
//               castShadow
//               receiveShadow
//               position={[-1.96, 1.05, 18.14]}
//             />
//             <mesh
//               name="Sphere 6"
//               geometry={nodes["Sphere 6"].geometry}
//               material={materials["Metal Colorful Laser 01"]}
//               castShadow
//               receiveShadow
//               position={[-46.35, -19.99, -23.02]}
//             />
//             <mesh
//               name="Sphere 5"
//               geometry={nodes["Sphere 5"].geometry}
//               material={materials["Metal Colorful Laser 01"]}
//               castShadow
//               receiveShadow
//               position={[4.59, -1.83, 7.79]}
//             />
//             <mesh
//               name="Sphere 4"
//               geometry={nodes["Sphere 4"].geometry}
//               material={materials["Metal Colorful Laser 01"]}
//               castShadow
//               receiveShadow
//               position={[-26.76, -2.72, -15.4]}
//             />
//             <mesh
//               name="Sphere 3"
//               geometry={nodes["Sphere 3"].geometry}
//               material={materials["Metal Colorful Laser 01"]}
//               castShadow
//               receiveShadow
//               position={[-21.11, -5.87, 0]}
//             />
//             <mesh
//               name="Sphere 2"
//               geometry={nodes["Sphere 2"].geometry}
//               material={materials["Metal Colorful Laser 01"]}
//               castShadow
//               receiveShadow
//               position={[-48.16, -16.59, -2.56]}
//             />
//             <mesh
//               name="Sphere"
//               geometry={nodes.Sphere.geometry}
//               material={materials["Metal Colorful Laser 01"]}
//               castShadow
//               receiveShadow
//             />
//           </group>
//           <spotLight
//             name="Spot Light 2"
//             castShadow
//             intensity={1.25}
//             angle={0.47}
//             penumbra={0.5}
//             decay={64.7}
//             distance={6449}
//             shadow-mapSize-width={1024}
//             shadow-mapSize-height={1024}
//             shadow-camera-fov={119.99999999999999}
//             shadow-camera-near={100}
//             shadow-camera-far={100000}
//             color="#58fe00"
//             position={[-0.71, 47.95, 0]}
//           />
//           <spotLight
//             name="Spot Light"
//             castShadow
//             intensity={10}
//             angle={Math.PI / 6}
//             decay={8.7}
//             distance={50}
//             shadow-mapSize-width={1024}
//             shadow-mapSize-height={1024}
//             shadow-camera-fov={119.99999999999999}
//             shadow-camera-near={100}
//             shadow-camera-far={100000}
//             color="#8cfe27"
//             position={[33.11, 20.5, 9.06]}
//             rotation={[0, 0, -1.57]}
//           />
//           <pointLight
//             name="Point Light 2"
//             castShadow
//             intensity={0.94}
//             decay={6}
//             distance={1785}
//             shadow-mapSize-width={1024}
//             shadow-mapSize-height={1024}
//             shadow-camera-near={100}
//             shadow-camera-far={100000}
//             color="#5dfe00"
//             position={[-12.2, 65.12, -4.38]}
//             rotation={[0, -0.48, 0]}
//           />
//           <pointLight
//             name="Point Light"
//             castShadow
//             intensity={1}
//             decay={3}
//             distance={2000}
//             shadow-mapSize-width={1024}
//             shadow-mapSize-height={1024}
//             shadow-camera-near={100}
//             shadow-camera-far={100000}
//             color="#5dfe00"
//             position={[-29.86, 5.17, 42.02]}
//             rotation={[0, 0.02, 0]}
//           />
//           <group name="Cubes" position={[-4.66, 20.87, 2.12]}>
//             <mesh
//               name="Cube 35"
//               geometry={nodes["Cube 35"].geometry}
//               material={materials["Metal Stain 04"]}
//               castShadow
//               receiveShadow
//               position={[13.74, -5.31, -11.34]}
//               rotation={[0, 0, -Math.PI / 2]}
//             />
//             <mesh
//               name="Cube 19"
//               geometry={nodes["Cube 19"].geometry}
//               material={materials["Metal Stain 04"]}
//               castShadow
//               receiveShadow
//               position={[14.26, 8.03, -11.29]}
//             />
//             <mesh
//               name="Cube 28"
//               geometry={nodes["Cube 28"].geometry}
//               material={materials["Metal Stain 04"]}
//               castShadow
//               receiveShadow
//               position={[-7.41, 5.3, -10.32]}
//               rotation={[0, 0, -Math.PI / 2]}
//             />
//             <mesh
//               name="Cube 23"
//               geometry={nodes["Cube 23"].geometry}
//               material={materials["Metal Stain 04"]}
//               castShadow
//               receiveShadow
//               position={[-8.08, 5.26, -17.38]}
//               rotation={[0, 0, -Math.PI / 2]}
//             />
//             <mesh
//               name="Cube 18"
//               geometry={nodes["Cube 18"].geometry}
//               material={materials["Metal Stain 04"]}
//               castShadow
//               receiveShadow
//               position={[6.9, 5.93, 15]}
//               rotation={[0, 0, -Math.PI / 2]}
//             />
//             <mesh
//               name="Cube 17"
//               geometry={nodes["Cube 17"].geometry}
//               material={materials["Metal Stain 04"]}
//               castShadow
//               receiveShadow
//               position={[14.19, 6.48, -5.62]}
//             />
//             <mesh
//               name="Cube 10"
//               geometry={nodes["Cube 10"].geometry}
//               material={materials["Metal Stain 04"]}
//               castShadow
//               receiveShadow
//               position={[19.38, -16.74, -2.04]}
//             />
//             <mesh
//               name="Cube 27"
//               geometry={nodes["Cube 27"].geometry}
//               material={materials["Metal Stain 04"]}
//               castShadow
//               receiveShadow
//               position={[6.91, -19.36, -11.36]}
//               rotation={[0, 0, 1.57]}
//             />
//             <mesh
//               name="Cube 16"
//               geometry={nodes["Cube 16"].geometry}
//               material={materials["Metal Stain 04"]}
//               castShadow
//               receiveShadow
//               position={[17.52, -9.73, -5.8]}
//               rotation={[0, 0, 1.57]}
//             />
//             <mesh
//               name="Cube 26"
//               geometry={nodes["Cube 26"].geometry}
//               material={materials["Metal Stain 04"]}
//               castShadow
//               receiveShadow
//               position={[4.46, -2.7, -18.43]}
//             />
//             <mesh
//               name="Cube 34"
//               geometry={nodes["Cube 34"].geometry}
//               material={materials["Metal Stain 04"]}
//               castShadow
//               receiveShadow
//               position={[4.3, -9.88, -24.74]}
//             />
//             <mesh
//               name="Cube 15"
//               geometry={nodes["Cube 15"].geometry}
//               material={materials["Metal Stain 04"]}
//               castShadow
//               receiveShadow
//               position={[7.18, -13.48, -18.4]}
//             />
//             <mesh
//               name="Cube"
//               geometry={nodes.Cube.geometry}
//               material={materials["Metal Stain 04"]}
//               castShadow
//               receiveShadow
//               position={[21.6, -16.1, 15.27]}
//             />
//             <mesh
//               name="Cube 31"
//               geometry={nodes["Cube 31"].geometry}
//               material={materials["Metal Stain 04"]}
//               castShadow
//               receiveShadow
//               position={[4.15, 3.55, 27.85]}
//               rotation={[Math.PI / 2, 0, -1.57]}
//               scale={1}
//             />
//             <mesh
//               name="Cube 25"
//               geometry={nodes["Cube 25"].geometry}
//               material={materials["Metal Stain 04"]}
//               castShadow
//               receiveShadow
//               position={[22.14, 3.89, -13.81]}
//               rotation={[Math.PI / 2, 0, -1.57]}
//               scale={1}
//             />
//             <mesh
//               name="Cube 24"
//               geometry={nodes["Cube 24"].geometry}
//               material={materials["Metal Stain 04"]}
//               castShadow
//               receiveShadow
//               position={[13.18, 14.06, -19.85]}
//               rotation={[Math.PI / 2, 0, -1.57]}
//               scale={1}
//             />
//             <mesh
//               name="Cube 20"
//               geometry={nodes["Cube 20"].geometry}
//               material={materials["Metal Stain 04"]}
//               castShadow
//               receiveShadow
//               position={[20.71, 11.75, -14.53]}
//               rotation={[Math.PI / 2, 0, -1.57]}
//               scale={1}
//             />
//             <mesh
//               name="Cube 22"
//               geometry={nodes["Cube 22"].geometry}
//               material={materials["Metal Stain 04"]}
//               castShadow
//               receiveShadow
//               position={[4.68, 9.79, -18.13]}
//               rotation={[0, -Math.PI / 2, 0]}
//             />
//             <mesh
//               name="Cube 32"
//               geometry={nodes["Cube 32"].geometry}
//               material={materials["Metal Stain 04"]}
//               castShadow
//               receiveShadow
//               position={[1.1, -1.41, 35.89]}
//               rotation={[Math.PI / 2, 0, -1.57]}
//               scale={1}
//             />
//             <mesh
//               name="Cube 33"
//               geometry={nodes["Cube 33"].geometry}
//               material={materials["Metal Stain 04"]}
//               castShadow
//               receiveShadow
//               position={[3.57, 13.77, 22.7]}
//               rotation={[Math.PI / 2, 0, -1.57]}
//               scale={1}
//             />
//             <mesh
//               name="Cube 21"
//               geometry={nodes["Cube 21"].geometry}
//               material={materials["Metal Stain 04"]}
//               castShadow
//               receiveShadow
//               position={[-24.39, 8.01, -11.46]}
//             />
//             <mesh
//               name="Cube 5"
//               geometry={nodes["Cube 5"].geometry}
//               material={materials["Metal Stain 04"]}
//               castShadow
//               receiveShadow
//               position={[-12.5, -16.1, 16.14]}
//             />
//             <mesh
//               name="Cube 4"
//               geometry={nodes["Cube 4"].geometry}
//               material={materials["Metal Stain 04"]}
//               castShadow
//               receiveShadow
//               position={[-2.83, -12.95, 14.47]}
//             />
//             <mesh
//               name="Cube 29"
//               geometry={nodes["Cube 29"].geometry}
//               material={materials["Metal Stain 04"]}
//               castShadow
//               receiveShadow
//               position={[2.28, 2.41, 21.87]}
//             />
//             <mesh
//               name="Cube 30"
//               geometry={nodes["Cube 30"].geometry}
//               material={materials["Metal Stain 04"]}
//               castShadow
//               receiveShadow
//               position={[9.57, -0.44, 15.95]}
//               rotation={[1.57, 0, 0]}
//             />
//             <mesh
//               name="Cube 6"
//               geometry={nodes["Cube 6"].geometry}
//               material={materials["Metal Stain 04"]}
//               castShadow
//               receiveShadow
//               position={[19.8, -13.1, 10.4]}
//             />
//             <mesh
//               name="Cube 7"
//               geometry={nodes["Cube 7"].geometry}
//               material={materials["Metal Stain 04"]}
//               castShadow
//               receiveShadow
//               position={[22.49, -17.86, 6.1]}
//             />
//             <mesh
//               name="Cube 8"
//               geometry={nodes["Cube 8"].geometry}
//               material={materials["Metal Stain 04"]}
//               castShadow
//               receiveShadow
//               position={[22.49, -20.27, 3.53]}
//             />
//             <mesh
//               name="Cube 11"
//               geometry={nodes["Cube 11"].geometry}
//               material={materials["Metal Stain 04"]}
//               castShadow
//               receiveShadow
//               position={[19.24, -20.02, 1.42]}
//               rotation={[0, -1.57, 0]}
//             />
//             <mesh
//               name="Cube 9"
//               geometry={nodes["Cube 9"].geometry}
//               material={materials["Metal Stain 04"]}
//               castShadow
//               receiveShadow
//               position={[22.37, -17.44, 3.65]}
//               rotation={[0, 0, 1.57]}
//             />
//             <mesh
//               name="Cube 12"
//               geometry={nodes["Cube 12"].geometry}
//               material={materials["Metal Stain 04"]}
//               castShadow
//               receiveShadow
//               position={[22.14, -14.66, 3.66]}
//               rotation={[0, 0, 1.57]}
//             />
//             <mesh
//               name="Cube 2"
//               geometry={nodes["Cube 2"].geometry}
//               material={materials["Metal Stain 04"]}
//               castShadow
//               receiveShadow
//               position={[11.07, -19.57, 15.3]}
//               rotation={[0, 0, Math.PI / 2]}
//             />
//             <mesh
//               name="Cube 3"
//               geometry={nodes["Cube 3"].geometry}
//               material={materials["Metal Stain 04"]}
//               castShadow
//               receiveShadow
//               position={[11.13, -14.66, 15.39]}
//               rotation={[0, 0, Math.PI / 2]}
//             />
//             <mesh
//               name="Cube 13"
//               geometry={nodes["Cube 13"].geometry}
//               material={materials["Metal Stain 04"]}
//               castShadow
//               receiveShadow
//               position={[17.93, -3.79, 13.88]}
//               rotation={[0, -1.57, 0]}
//             />
//             <mesh
//               name="Cube 14"
//               geometry={nodes["Cube 14"].geometry}
//               material={materials["Metal Stain 04"]}
//               castShadow
//               receiveShadow
//               position={[0, 0, 0]}
//               rotation={[-Math.PI / 2, 0, -1.57]}
//               scale={1}
//             />
//           </group>
//           <OrthographicCamera
//             name="Camera"
//             makeDefault={true}
//             zoom={14.4}
//             far={100000}
//             near={-100000}
//             position={[864.21, 298.19, 571.03]}
//             rotation={[-0.45, 0.95, 0.38]}
//             scale={1}
//           />
//           <mesh
//             name="floor"
//             geometry={nodes.floor.geometry}
//             material={materials["Metal Stain 04"]}
//             castShadow
//             receiveShadow
//             position={[0, 0, 0]}
//             rotation={[-Math.PI / 2, 0, 0]}
//           />
//           <group
//             name="Clock 3d model"
//             position={[17.29, 20.64, 9.04]}
//             rotation={[0, 1.53, 0]}
//             scale={8}
//           >
//             <mesh
//               name="Circle"
//               geometry={nodes.Circle.geometry}
//               material={nodes.Circle.material}
//               castShadow
//               receiveShadow
//               position={[0, 0, 0.1]}
//               rotation={[Math.PI / 2, 0, 0]}
//               scale={[1.27, 2.03, 1.27]}
//             />
//             <mesh
//               name="Circle001"
//               geometry={nodes.Circle001.geometry}
//               material={nodes.Circle001.material}
//               castShadow
//               receiveShadow
//               rotation={[Math.PI / 2, 0, 0]}
//               scale={[1.27, 2.03, 1.27]}
//             />
//             <mesh
//               name="Cube1"
//               geometry={nodes.Cube1.geometry}
//               material={nodes.Cube1.material}
//               castShadow
//               receiveShadow
//               scale={[1, 1, 1.59]}
//             />
//             <mesh
//               name="Cube001"
//               geometry={nodes.Cube001.geometry}
//               material={nodes.Cube001.material}
//               castShadow
//               receiveShadow
//               position={[0, 0, 0.1]}
//               scale={[1, 1, 1.59]}
//             />
//             <mesh
//               name="Vert003"
//               geometry={nodes.Vert003.geometry}
//               material={nodes.Vert003.material}
//               castShadow
//               receiveShadow
//               position={[-0.04, 0.56, 0.14]}
//               scale={[1, 1, 1.59]}
//             />
//             <mesh
//               name="Cube002"
//               geometry={nodes.Cube002.geometry}
//               material={nodes.Cube002.material}
//               castShadow
//               receiveShadow
//               rotation={[0, 0, -0.83]}
//               scale={[1, 1, 1.59]}
//             />
//             <mesh
//               name="Cube003"
//               geometry={nodes.Cube003.geometry}
//               material={nodes.Cube003.material}
//               castShadow
//               receiveShadow
//               position={[0, 0, 0.07]}
//               scale={[1, 1, 1.59]}
//             />
//           </group>
//           <OrthographicCamera
//             name="1"
//             makeDefault={false}
//             far={10000}
//             near={-50000}
//           />
//           <hemisphereLight
//             name="Default Ambient Light"
//             intensity={0.75}
//             color="#fefefe"
//           />
//         </scene>
//       </group>
//     </>
//   );
// }
