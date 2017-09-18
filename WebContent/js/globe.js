/**
 * 
 */
var scene, camera, renderer;
var ambientLight, light;
var geometry, starGeometry;
var material, starMaterial;
var earthMesh, starMesh;
var controls;

init();
animate();

function init()
{
	////////////////////////////////////
	//--------SCENE & CAMERA----------//
	////////////////////////////////////
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.z = 1;
	
	////////////////////////////////////
	//--------MOUSE CONTROLS----------//
	////////////////////////////////////
	controls = new THREE.OrbitControls( camera );
	
	////////////////////////////////////
	//-----------RENDERER-------------//
	////////////////////////////////////
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	
	////////////////////////////////////
	//-------------LIGHT--------------//
	////////////////////////////////////
	ambientLight = new THREE.AmbientLight( 0x222222 );
	scene.add( ambientLight );
	
	light = new THREE.DirectionalLight( 0xffffff, 1 );
	light.position.set(5,5,5);
	scene.add(light);
	
	////////////////////////////////////
	//-------------EARTH--------------//
	////////////////////////////////////
	geometry = new THREE.SphereGeometry(.5, 32, 32);
	material = new THREE.MeshPhongMaterial();
	
	material.map = THREE.ImageUtils.loadTexture('images/earthmap1k.jpg');
	material.bumpMap = THREE.ImageUtils.loadTexture('images/earthbump1k.jpg');
	material.bumpScale = .025;
	
	earthMesh = new THREE.Mesh(geometry, material);
	scene.add(earthMesh);
		
	earthMesh.rotation.z = -.235
	
	
	////////////////////////////////////
	//----------WIREFRAME-------------//
	////////////////////////////////////
	wireframeGeo = new THREE.SphereGeometry(.5, 360, 180);
	for(var i = 0; i < wireframeGeo.vertices.length; i++)
	{
		var v = wireframeGeo.vertices[i];
	}
	
	////////////////////////////////////
	//-----------STAR MAP-------------//
	////////////////////////////////////
	starGeometry = new THREE.SphereGeometry(90, 32, 32);
	starMaterial = new THREE.MeshBasicMaterial();
	starMaterial.map = THREE.ImageUtils.loadTexture('images/starField_BG.png');
	starMaterial.side = THREE.BackSide;
	starMesh = new THREE.Mesh(starGeometry, starMaterial);
	scene.add(starMesh);
}

window.onresize = function ()
{
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
};

function animate()
{
	requestAnimationFrame( animate );
	earthMesh.rotation.y += 0.002;
	controls.update();
	render();
}

function render()
{
	renderer.render( scene, camera );
}