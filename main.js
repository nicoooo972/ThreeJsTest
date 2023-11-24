import * as THREE from 'three';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    const groundGeometry = new THREE.PlaneGeometry(10, 10, 32, 32);
    const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x808080, side: THREE.DoubleSide });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    camera.position.z = 5;

    const keyboardState = {};

    window.addEventListener('keydown', (event) => {
      keyboardState[event.key] = true;
    });

    window.addEventListener('keyup', (event) => {
      keyboardState[event.key] = false;
    });

    const animate = () => {
      requestAnimationFrame(animate);

      if (keyboardState['z']) {
        sphere.position.z -= 0.1;
      }
      if (keyboardState['s']) {
        sphere.position.z += 0.1;
      }
      if (keyboardState['q']) {
        sphere.position.x -= 0.1;
      }
      if (keyboardState['d']) {
        sphere.position.x += 0.1;
      }
      if (keyboardState[' ']) {
        if (sphere.position.y <= 0.5) {
          sphere.position.y += 0.3;
        }
      } else {
        if (sphere.position.y > 0) {
          sphere.position.y -= 0.1;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }