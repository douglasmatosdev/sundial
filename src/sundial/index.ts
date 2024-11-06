'use client'
import *  as THREE from 'three'

// SCENE
const scene = new THREE.Scene();

let sundialModule: {
    rendererDomElement: HTMLCanvasElement | null,
    animate: () => void
} = {
    rendererDomElement: null,
    animate: () => { }
};

if (typeof window !== 'undefined') {
    // CAMERA
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true
    
    // RESIZE HAMDLER
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onWindowResize);
    
    // INIT CAMERA
    camera.position.z = 25;
    camera.position.x = 3;
    camera.position.y = 6;
    camera.lookAt(0, 0, -20)
    
    // INIT HEMISPHERE LIGHT
    scene.add(new THREE.AmbientLight( 0xffffff, 0.5 ));
    
    // SCENE
    scene.background = new THREE.Color(0xffffff);
    
    // FLOOR
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(500, 500, 32), new THREE.MeshPhongMaterial({ color: 0xfab74b}));
    plane.rotation.x = - Math.PI / 2
    plane.receiveShadow = true
    scene.add(plane);
    

    // CLOCK
    const clockBase = new THREE.Mesh(new THREE.CircleGeometry(10, 10, 100), new THREE.MeshPhongMaterial({ color: 0x798df2 , }));
    clockBase.rotation.x = - Math.PI / 2
    clockBase.position.set(0, .1, 0)
    
    clockBase.receiveShadow = true
    scene.add(clockBase);
    
    // CONE
    const cone = new THREE.Mesh(new THREE.ConeGeometry(1, 15, 64), new THREE.MeshPhongMaterial({ color: 0xdbde40 }));
    cone.position.set(0, 2.5, 0)
    cone.receiveShadow = true
    cone.castShadow = true
    scene.add(cone);
      
    // DIRECTIONAL LIGHT
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.x += 20
    directionalLight.position.y += 20
    directionalLight.position.z += 20
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 4096;
    directionalLight.shadow.mapSize.height = 4096;
    const d = 25;
    directionalLight.shadow.camera.left = - d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = - d;
    scene.add(directionalLight);
    
    scene.add( new THREE.CameraHelper( directionalLight.shadow.camera ) );
    
    // SPOT LIGHT
    // const spotLight = new THREE.SpotLight( 0xffffff );
    // spotLight.position.set( 20, 15, 20 );
    // spotLight.castShadow = true;
    // spotLight.shadow.mapSize.width = 4096;
    // spotLight.shadow.mapSize.height = 4096;
    // scene.add(spotLight)
    
    // POINT LIGHT
    // const light1 = new THREE.PointLight( 0xff0000, 1, 100 );
    // light1.position.set( 20, 20, 20 );
    // light1.castShadow = true;
    // light1.shadow.mapSize.width = 4096;
    // light1.shadow.mapSize.height = 4096;
    // scene.add( light1 );
    
    // const light2 = new THREE.PointLight( 0x00ff00, 1, 100 );
    // light2.position.set( 20, 20, 20 );
    // light2.castShadow = true;
    // light2.shadow.mapSize.width = 4096;
    // light2.shadow.mapSize.height = 4096;
    // scene.add( light2 );
    
    
    // ANIMATE
    function animate() {
        // TARGET
        const time = Date.now() * 0.0005;
        directionalLight.position.x = Math.sin(time * 0.7) * 20;
        directionalLight.position.z = Math.cos(time * 0.7) * 20;
    
        // spotLight.position.x = Math.sin(time * 0.7) * 20;
        // spotLight.position.z = Math.cos(time * 0.7) * 20;
    
        // light1.position.x = Math.sin(time) * 20;
        // light1.position.z = Math.sin(time) * 20;
        // light2.position.x = Math.cos(time) * -20;
        // light2.position.z = Math.cos(time) * 20;
    
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    sundialModule = {
        rendererDomElement: renderer.domElement,
        animate: animate
    };

}
export default sundialModule;