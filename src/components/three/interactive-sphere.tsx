"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { memo, useMemo, useRef } from "react";
import * as THREE from "three";

// Custom Vertex Shader with 3D Perlin Noise displacement
const vertexShaderCode = `
  uniform float uTime;
  uniform float uDistortion;
  uniform float uNoiseFreq;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vNoiseVal;

  // Classic Perlin 3D Noise by Stefan Gustavson
  vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

  float cnoise(vec3 P) {
    vec3 Pi0 = floor(P);
    vec3 Pi1 = Pi0 + vec3(1.0);
    Pi0 = mod(Pi0, 289.0);
    Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P);
    vec3 Pf1 = Pf0 - vec3(1.0);
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 / 7.0;
    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 / 7.0;
    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;

    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
    return 2.2 * n_xyz;
  }

  void main() {
    vNormal = normal;
    vPosition = position;
    
    // Evaluate noise based on position and time
    float noiseVal = cnoise(position * uNoiseFreq + vec3(0.0, 0.0, uTime * 0.65));
    vNoiseVal = noiseVal;
    
    // Displace vertices along normal
    vec3 displacedPosition = position + normal * noiseVal * uDistortion;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
  }
`;

// Custom Fragment Shader for volumetric glowing core + Fresnel glow border
const fragmentShaderCode = `
  uniform float uTime;
  uniform vec3 uColorCore;
  uniform vec3 uColorEdge;
  uniform vec3 uColorGlow;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vNoiseVal;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
    
    // Fresnel rim calculation
    float fresnel = pow(1.0 - max(0.0, dot(normal, viewDir)), 2.8);
    
    // Blend from deep red/orange center to hot neon orange grazing edge
    vec3 color = mix(uColorCore, uColorEdge, fresnel);
    
    // Pulsing glow emission based on noise and time
    float pulse = 1.0 + 0.25 * sin(uTime * 1.8 + vNoiseVal * 1.5);
    color += uColorGlow * fresnel * 1.5 * pulse;
    
    // Accentuate core crest highlights from noise displacement
    color += uColorGlow * max(0.0, vNoiseVal) * 0.42 * pulse;
    
    // Calculate transparency (liquid translucent core, dense glow rim)
    float alpha = mix(0.35, 0.92, fresnel);
    
    gl_FragColor = vec4(color, alpha);
  }
`;

function OrganicOrb() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDistortion: { value: 0.35 },
      uNoiseFreq: { value: 1.6 },
      uColorCore: { value: new THREE.Color("#220600") }, // Deep black-orange
      uColorEdge: { value: new THREE.Color("#ff6a00") }, // Premium orange
      uColorGlow: { value: new THREE.Color("#ff8c42") }, // Secondary glow
    }),
    [],
  );

  useFrame(({ clock, pointer }) => {
    const elapsed = clock.getElapsedTime();

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = elapsed;
    }

    if (groupRef.current) {
      // Gentle floating animation (breathing)
      groupRef.current.position.y = Math.sin(elapsed * 0.8) * 0.12;

      // Mouse-reactive parallax rotation
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.45 + elapsed * 0.08,
        0.05,
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.y * 0.3,
        0.05,
      );
    }

    // Spin outer wireframe in reverse for parallax depth
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = -elapsed * 0.04;
      wireframeRef.current.rotation.z = elapsed * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 3D Core with Custom Shaders */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 48]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShaderCode}
          fragmentShader={fragmentShaderCode}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Futuristic Outer Wireframe Layer */}
      <mesh ref={wireframeRef} scale={1.08}>
        <icosahedronGeometry args={[1.5, 3]} />
        <meshBasicMaterial
          color="#ff8c42"
          wireframe
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function SwirlingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 300;

  // Pre-generate particle coordinates distributed on a shell around the core
  const [positions, speeds, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const phs = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 1.9 + Math.random() * 2.3; // Orbit shell distance from core

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      spd[i] = 0.2 + Math.random() * 0.5;
      phs[i] = Math.random() * Math.PI * 2;
    }
    return [pos, spd, phs];
  }, []);

  const geoRef = useRef<THREE.BufferGeometry>(null);

  useFrame(({ clock, pointer }) => {
    if (!pointsRef.current) return;
    const time = clock.getElapsedTime();

    // Rotate particles with lag response to mouse for depth-based parallax
    pointsRef.current.rotation.y = time * 0.04 + pointer.x * 0.25;
    pointsRef.current.rotation.x = time * 0.015 - pointer.y * 0.15;

    // Gentle particle floating oscillation
    if (geoRef.current) {
      const posArr = geoRef.current.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const idx = i * 3;
        posArr[idx + 1] += Math.sin(time * speeds[i] + phases[i]) * 0.0018;
      }
      geoRef.current.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ff8c42"
        size={0.038}
        sizeAttenuation
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function InteractiveSphereComponent() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 z-0 h-screen w-full select-none opacity-85 sm:opacity-95 lg:w-[50vw] lg:opacity-100"
    >
      {/* Background radial soft blur glow acting as custom HTML Bloom */}
      <div className="absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-[#ff6a00]/8 to-[#ff8c42]/4 blur-[130px] sm:h-[48rem] sm:w-[48rem]" />
      
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 42 }}
        dpr={[1, 1.5]}
        frameloop="always"
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="h-full w-full"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 3, 5]} intensity={1.5} color="#ff8c42" />
        <pointLight position={[-3, -3, 3]} color="#ff6a00" intensity={6} />
        
        {/* Core Animated Orb */}
        <OrganicOrb />
        
        {/* Swirling Parallax Dust */}
        <SwirlingParticles />
      </Canvas>
    </div>
  );
}

export const InteractiveSphere = memo(InteractiveSphereComponent);
