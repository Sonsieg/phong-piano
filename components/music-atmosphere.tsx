'use client';

import { useEffect, useRef } from 'react';
import { useMusic } from './music/music-provider';

export default function MusicAtmosphere() {
  const { energy } = useMusic();
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = host.current;
    if (!element || matchMedia('(max-width: 760px)').matches) return;
    let cancelled = false;
    let dispose = () => {};
    async function setup() {
      const THREE = await import('three');
      if (cancelled || !element) return;
      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: 'low-power',
        });
      } catch {
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);
      element.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
      camera.position.z = 12;
      const group = new THREE.Group();
      scene.add(group);
      const material = new THREE.LineBasicMaterial({
        color: 0xb8e45b,
        transparent: true,
        opacity: 0.25,
      });
      const geometries: InstanceType<typeof THREE.BufferGeometry>[] = [];
      // Five gently curved lines evoke a musical staff around the piano.
      for (let line = 0; line < 5; line++) {
        const points = Array.from({ length: 100 }, (_, i) => {
          const t = (i / 99) * Math.PI * 2;
          return new THREE.Vector3(
            Math.cos(t) * 5.1,
            Math.sin(t) * 1.8 + (line - 2) * 0.18,
            Math.sin(t * 2) * 0.5,
          );
        });
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        geometries.push(geometry);
        group.add(new THREE.LineLoop(geometry, material));
      }
      const positions = new Float32Array(90 * 3);
      for (let i = 0; i < 90; i++) {
        positions[i * 3] = Math.sin(i * 17.3) * 7;
        positions[i * 3 + 1] = Math.cos(i * 7.7) * 4;
        positions[i * 3 + 2] = Math.sin(i * 3.1) * 2;
      }
      const particlesGeometry = new THREE.BufferGeometry();
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const particlesMaterial = new THREE.PointsMaterial({
        color: 0xdbe6c1,
        size: 0.025,
        transparent: true,
        opacity: 0.5,
      });
      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);
      let model: InstanceType<typeof THREE.Group> | null = null;
      const releaseModel = (object: InstanceType<typeof THREE.Group>) => {
        const materials = new Set<InstanceType<typeof THREE.Material>>();
        const textures = new Set<InstanceType<typeof THREE.Texture>>();
        object.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            for (const material of Array.isArray(child.material)
              ? child.material
              : [child.material])
              materials.add(material);
          }
        });
        materials.forEach((material) => {
          Object.values(material).forEach((value) => {
            if (value instanceof THREE.Texture) textures.add(value);
          });
          material.dispose();
        });
        textures.forEach((texture) => {
          texture.dispose();
        });
      };
      const modelAbort = new AbortController();
      void fetch('/models/grand-piano.glb', { method: 'HEAD', signal: modelAbort.signal })
        .then(async (response) => {
          if (!response.ok || cancelled) return;
          const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');
          if (cancelled) return;
          const gltf = await new GLTFLoader().loadAsync('/models/grand-piano.glb');
          if (cancelled) {
            releaseModel(gltf.scene);
            return;
          }
          const bounds = new THREE.Box3().setFromObject(gltf.scene);
          const size = bounds.getSize(new THREE.Vector3());
          const center = bounds.getCenter(new THREE.Vector3());
          if (!Number.isFinite(size.length()) || size.length() === 0) {
            releaseModel(gltf.scene);
            return;
          }
          gltf.scene.position.sub(center);
          model = new THREE.Group();
          model.add(gltf.scene);
          model.scale.setScalar(7 / Math.max(size.x, size.y, size.z));
          model.rotation.set(0.15, -0.45, -0.12);
          scene.add(model);
          scene.add(new THREE.HemisphereLight(0xfff5df, 0x344b32, 3));
          const light = new THREE.DirectionalLight(0xffe7ba, 4);
          light.position.set(3, 6, 5);
          scene.add(light);
          renderer.render(scene, camera);
          element.parentElement?.classList.add('has-piano-model');
        })
        .catch(() => {
          /* Optional model: retain the existing piano illustration. */
        });
      let pointerX = 0,
        pointerY = 0,
        visible = true;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
      const pointer = (event: PointerEvent) => {
        pointerX = (event.clientX / window.innerWidth - 0.5) * 0.15;
        pointerY = (event.clientY / window.innerHeight - 0.5) * 0.1;
      };
      const small = matchMedia('(max-width: 760px)');
      let scroll = Math.min(1, window.scrollY / window.innerHeight);
      const onScroll = () => {
        scroll = Math.min(1, window.scrollY / window.innerHeight);
      };
      const draw = (time: number) => {
        const amplitude = reduced.matches ? 0 : energy.current;
        material.opacity = 0.2 + amplitude * 0.12;
        particlesMaterial.opacity = 0.4 + amplitude * 0.2;
        camera.position.y += ((reduced.matches ? 0 : scroll * 0.5) - camera.position.y) * 0.03;
        camera.lookAt(0, 0, 0);
        group.rotation.z = -0.2 + (reduced.matches ? 0 : Math.sin(time * 0.00012) * 0.08);
        group.rotation.x += ((reduced.matches ? 0 : pointerY) - group.rotation.x) * 0.025;
        group.rotation.y += ((reduced.matches ? 0 : pointerX) - group.rotation.y) * 0.025;
        particles.rotation.z = reduced.matches ? 0 : time * 0.000015;
        if (model && !reduced.matches)
          model.rotation.y += (-0.45 + pointerX + scroll * 0.12 - model.rotation.y) * 0.025;
        renderer.render(scene, camera);
      };
      const sync = () => {
        renderer.setAnimationLoop(null);
        if (visible && !document.hidden && !reduced.matches && !small.matches)
          renderer.setAnimationLoop(draw);
        else if (visible && !document.hidden) draw(0);
      };
      const resize = new ResizeObserver(() => {
        const { width, height } = element.getBoundingClientRect();
        if (!width || !height) return;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        if (reduced.matches) draw(0);
      });
      resize.observe(element);
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        sync();
      });
      observer.observe(element);
      window.addEventListener('pointermove', pointer, { passive: true });
      document.addEventListener('visibilitychange', sync);
      reduced.addEventListener('change', sync);
      small.addEventListener('change', sync);
      window.addEventListener('scroll', onScroll, { passive: true });
      sync();
      dispose = () => {
        renderer.setAnimationLoop(null);
        modelAbort.abort();
        if (model) releaseModel(model);
        element.parentElement?.classList.remove('has-piano-model');
        resize.disconnect();
        observer.disconnect();
        window.removeEventListener('pointermove', pointer);
        document.removeEventListener('visibilitychange', sync);
        reduced.removeEventListener('change', sync);
        small.removeEventListener('change', sync);
        window.removeEventListener('scroll', onScroll);
        geometries.forEach((g) => g.dispose());
        particlesGeometry.dispose();
        material.dispose();
        particlesMaterial.dispose();
        renderer.dispose();
        renderer.forceContextLoss();
        renderer.domElement.remove();
      };
    }
    void setup().catch(() => {
      /* The existing illustration remains visible without WebGL. */
    });
    return () => {
      cancelled = true;
      dispose();
    };
  }, [energy]);
  return <div ref={host} className="music-atmosphere" aria-hidden="true" />;
}
