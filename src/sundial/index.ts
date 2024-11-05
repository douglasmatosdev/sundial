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
    camera.position.z = 55;
    camera.position.x = 3;
    camera.position.y = 26;
    camera.lookAt(0, 0, -20)

    // INIT HEMISPHERE LIGHT
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    // SCENE
    scene.background = new THREE.Color(0xffffff);

    // FLOOR
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(500, 500, 32), new THREE.MeshPhongMaterial({ color: 0xfab74b }));
    plane.rotation.x = - Math.PI / 2
    plane.receiveShadow = true
    scene.add(plane);

    // CONE
    const cone = new THREE.Mesh(new THREE.ConeGeometry(2, 25, 64), new THREE.MeshPhongMaterial({ color: 0xdbde40 }));
    cone.position.set(7, 2.5, 2.7)
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

    scene.add(new THREE.CameraHelper(directionalLight.shadow.camera));

    // ANIMATE
    function animate() {
        // TARGET
        const time = Date.now() * 0.0005;
        directionalLight.position.x = Math.sin(time * 0.7) * 20;
        directionalLight.position.z = Math.cos(time * 0.7) * 20;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    sundialModule = {
        rendererDomElement: renderer.domElement,
        animate: animate
    };

}
export default sundialModule;