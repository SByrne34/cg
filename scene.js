/*
 * Scene Set up
*/

// Create scene
const scene = new THREE.Scene();

// Define texture loader
const textureLoader = new THREE.TextureLoader();
const loader = new THREE.GLTFLoader();

// Create camera
const camera = new THREE.PerspectiveCamera(
    75,     // fov - Camera frustum vertical field of view
    window.innerWidth / window.innerHeight, // aspect - Camera frustum aspect ratio
    0.1,   // near - Camera frustum near plane
    1000); // far - Camera frustum far plane

// Create renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// create light - acting as sun
const light = new THREE.DirectionalLight(0xdddd00, 1);
light.position.set(2, 2, 2 );
scene.add( light );



/*
 * Load Materials
*/

// Lamp post material
const gray = new THREE.MeshPhongMaterial({ color: 0x808080, shininess: 100 });

// Lamp post 2 material 
const gray2 = new THREE.MeshBasicMaterial({ color: 0x808080 });

// Lamp light material
const yellow = new THREE.MeshBasicMaterial({ color: 0xffff00 });

// Lamp light 2 material
const yellow2 = new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity:.2  });

// Bike Material
const bike = new THREE.MeshPhongMaterial({ color: 0xddddcc, side: THREE.DoubleSide });

// Roof material
const roof = new THREE.MeshLambertMaterial({ color: 0x8b4513 }); 

// House material
const house = new THREE.MeshLambertMaterial({color: 0x808080});

// Leaves material
const leaves = new THREE.MeshLambertMaterial({ color: 0x00ff00 }); 

// Trunk material
const trunk = new THREE.MeshLambertMaterial({ color: 0x964B00, shininess: 100, wireframe: true });


/*
 * Load Textures
*/

// Skybox texture
const skyboxTextures = [
    'posx.bmp', 'negx.bmp',
    'posy.bmp', 'negy.bmp',
    'posz.bmp', 'negz.bmp'
];
const skyboxMaterials = skyboxTextures.map(texture => new THREE.MeshBasicMaterial({
    map: textureLoader.load(texture),
    side: THREE.BackSide // This ensures it renders on the inside of the cube
}));

// Sidewalk texture
// Normal mapping
const sidewalkNormal = textureLoader.load("sidewalk_normal.jpg", function ( texture ) {

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 1, 8 );

});

// Color mapping
const sidewalkColor = textureLoader.load("sidewalk_color.jpg", function ( texture ) {

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 1, 8 );

});

// Ao mapping
const sidewalkAo = textureLoader.load("sidewalk_ao.jpg", function ( texture ) {

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 1, 8 );

});

// Displacment mapping
const sidewalkDisplacement = textureLoader.load("sidewalk_displacement.jpg", function ( texture ) {

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 1, 8 );

});

const sidewalkMaterial = new THREE.MeshStandardMaterial({
    map: sidewalkColor,
    normalMap: sidewalkNormal,
    aoMap: sidewalkAo,
    displacementMap: sidewalkDisplacement,
    
});

// Bush Texture
// Normal mapping
const bushNormal = textureLoader.load("bush_normal.jpg", function ( texture ) {

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 1, 10 );

});

// Color mapping
const bushColor = textureLoader.load("bush_color.jpg", function ( texture ) {

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 1, 10 );

});

// Ao Mapping
const bushAo = textureLoader.load("bush_ao.jpg", function ( texture ) {

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 1, 10 );

});

// Displacement mapping
const bushDisplacement = textureLoader.load("bush_displacement.jpg", function ( texture ) {

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 1, 10 );

});
const bushMaterial = new THREE.MeshStandardMaterial({
    map: bushColor,
    normalMap: bushNormal,
    aoMap: bushAo,
    displacementMap: bushDisplacement,
    displacementScale: 0,

});

// Road Texture
// Normal mapping
const roadNormal = textureLoader.load("road_normal.jpg", function ( texture ) {

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 1, 16 );

});

// Color mapping
const roadColor = textureLoader.load("road_color.jpg", function ( texture ) {

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 1, 16 );

});

// Ao Mapping
const roadAo = textureLoader.load("road_ao.jpg", function ( texture ) {

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 1, 16 );

});

// Displacement mapping
const roadDisplacement = textureLoader.load("road_displacement.jpg", function ( texture ) {

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 1, 16 );

});

const roadMaterial = new THREE.MeshStandardMaterial({
    map: roadColor,
    normalMap: roadNormal,
    aoMap: roadAo,
    displacementMap: roadDisplacement,

});

/*
 * Load Imported Models
*/

// Load car model
const carModel = new THREE.Object3D();
loader.load("car.glb", function(gltf) {
    carModel.add(gltf.scene);
    scene.add(carModel);
    });

// Load bicycle model
loader.load("bicycle.glb", function(gltf) {
    gltf.scene.traverse( function ( child ) {
        if ( child.isMesh ) {
            child.bike = bike.clone();
        }
    } );
    // Positions bicycle model
    gltf.scene.position.x = 17;
    gltf.scene.position.y = 4;
    gltf.scene.position.z = -50;
    gltf.scene.rotateY(Math.PI * 0.5);
    scene.add(gltf.scene);
    });

/*
 * Add geometries to the scene
*/

// Skybox geometry
const skyboxMaterial = new THREE.MeshFaceMaterial(skyboxMaterials);
const skyboxGeometry = new THREE.BoxGeometry(1000, 1000, 1000);
const skyboxMesh = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
scene.add(skyboxMesh);

// Tree trunk geometry
const trunkGeometry = new THREE.CylinderGeometry(3, 3, 50, 30);
trunkGeometry.translate(-35, 25, -20);
const trunkMesh = new THREE.Mesh(trunkGeometry, trunk);
scene.add(trunkMesh);

// Bush geometry, parallel to the road
const bushGeometry = new THREE.BoxBufferGeometry(10, 6, 60);
bushGeometry.translate(-15, 3, -30);
const bushMesh = new THREE.Mesh( bushGeometry, bushMaterial);
scene.add(bushMesh);

// 2nd Bush geometry, perpendicular to the road
const bushGeometry2 = new THREE.BoxBufferGeometry(60, 6, 10);
bushGeometry2.translate(-40, 3, -65);
const bushMesh2 = new THREE.Mesh( bushGeometry2, bushMaterial);
scene.add(bushMesh2);

// Road geometry
const roadGeometry = new THREE.PlaneBufferGeometry(20, 160);
roadGeometry.rotateX(-Math.PI * 0.5);
roadGeometry.translate(0, 0, -80);
const roadMesh = new THREE.Mesh( roadGeometry, roadMaterial );
scene.add(roadMesh);

// Leaves geometry
const LeavesGeometry = new THREE.SphereBufferGeometry(15, 32, 16);
LeavesGeometry.translate(-35, 50, -20);
const LeavesMesh = new THREE.Mesh(LeavesGeometry, leaves);
scene.add(LeavesMesh);

// House geometry
const houseGeometry = new THREE.BoxBufferGeometry(40, 40, 40);
houseGeometry.translate(-35, 20, -100);
const houseMesh = new THREE.Mesh(houseGeometry, house);
scene.add(houseMesh);

// Roof geometry
const roofGeometry = new THREE.ConeGeometry(36, 16, 32);
roofGeometry.translate(-35, 45, -100);
const roofMesh = new THREE.Mesh(roofGeometry, roof);
scene.add(roofMesh);

// Sidewalk geometry
const sidewalkGeometry = new THREE.PlaneBufferGeometry(10, 160);
sidewalkGeometry.rotateX(-Math.PI * 0.5);
sidewalkGeometry.translate(15, 0, -80); 
const sidewalkMesh = new THREE.Mesh(sidewalkGeometry, sidewalkMaterial);
scene.add(sidewalkMesh);

// Lamp light geometry
const lamplightGeometry = new THREE.SphereBufferGeometry(8, 16, 8);
lamplightGeometry.translate(23, 24, -20);
const lamplightMesh = new THREE.Mesh(lamplightGeometry, yellow);
scene.add(lamplightMesh);

// Lamp post geometry
const lamppostGeometry = new THREE.CylinderGeometry(1, 1, 25, 16);
lamppostGeometry.translate(23, 12, -20);
const lamppostMesh = new THREE.Mesh(lamppostGeometry, gray);
scene.add(lamppostMesh);

// 2nd Lamp light geometry, further down the road
const lamplightGeometry2 = new THREE.SphereBufferGeometry(8, 16, 8);
lamplightGeometry2.translate(23, 32, -100);
const lamplightMesh2 = new THREE.Mesh(lamplightGeometry2, yellow2);
scene.add(lamplightMesh2);

// 2nd Lamp post geometry, further down the road
const lamppostGeometry2 = new THREE.CylinderGeometry(1, 1, 25, 16);
lamppostGeometry2.translate(23, 12, -100);
const lamppostMesh2 = new THREE.Mesh(lamppostGeometry2, gray2);
scene.add(lamppostMesh2);

/*
 *  Setup camera and controls
*/

// Move camera from center
camera.position.x = 30;  // Move right from center of scene
camera.position.y = 80;  // Move up from center of scene
camera.position.z = 60;  // Move camera away from center of scene

// Import camera control and rotation library
const controls = new THREE.OrbitControls(camera, renderer.domElement); 
controls.noKeys = true;

/*
 *  Setup and render function with car animation - moving down the road
*/

const clock = new THREE.Clock();
const render = function() {
    requestAnimationFrame(render);
    if (typeof carModel !== 'undefined') {
        const delta = clock.getDelta();
        carModel.translateOnAxis(carModel.worldToLocal(new THREE.Vector3(0,0,-160)),0.1 * delta);
    }
    controls.update();
    renderer.render(scene, camera);
}

render();