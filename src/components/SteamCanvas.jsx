import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uPointer;

  void main() {
    vUv = uv;
    vec3 pos = position;
    float sway = sin(pos.y * 1.6 + uTime * 0.65) * 0.14 * (uv.y);
    float pointerOffset = uPointer.x * 0.28 * uv.y;
    pos.x += sway + pointerOffset;
    pos.z += cos(pos.y * 1.2 + uTime * 0.45) * 0.08 * uv.y;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uSeed;
  uniform vec3 uColor;
  uniform float uOpacity;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 4; i++) {
      value += amp * noise(p);
      p *= 2.04;
      amp *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 flowUv = vec2(uv.x * 2.2 + uSeed, uv.y * 2.6 - uTime * 0.22);
    float n = fbm(flowUv);
    float n2 = fbm(flowUv * 1.4 - vec2(uTime * 0.08, uTime * 0.14));
    float wisp = smoothstep(0.32, 0.85, n * 0.65 + n2 * 0.45);

    float horizontalFade = smoothstep(0.0, 0.42, uv.x) * (1.0 - smoothstep(0.58, 1.0, uv.x));
    float verticalFade = smoothstep(0.0, 0.22, uv.y) * (1.0 - smoothstep(0.62, 1.0, uv.y));

    float alpha = wisp * horizontalFade * verticalFade * uOpacity;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

function SteamWisp({ position, scale, seed, opacity, pointerRef, reducedMotion }) {
  const materialRef = useRef(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: seed * 3.1 },
      uSeed: { value: seed },
      uColor: { value: new THREE.Color('#F3E9DC') },
      uOpacity: { value: opacity },
      uPointer: { value: new THREE.Vector2(0, 0) },
    }),
    [seed, opacity]
  );

  useFrame((state, delta) => {
    if (!materialRef.current) return;
    if (!reducedMotion) {
      materialRef.current.uniforms.uTime.value += delta;
    }
    const targetX = pointerRef.current.x;
    const targetY = pointerRef.current.y;
    materialRef.current.uniforms.uPointer.value.x = THREE.MathUtils.damp(
      materialRef.current.uniforms.uPointer.value.x,
      targetX,
      3.5,
      delta
    );
    materialRef.current.uniforms.uPointer.value.y = THREE.MathUtils.damp(
      materialRef.current.uniforms.uPointer.value.y,
      targetY,
      3.5,
      delta
    );
  });

  return (
    <mesh position={position} scale={scale}>
      <planeGeometry args={[1.8, 3.4, 16, 24]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function SteamParticles({ pointerRef, reducedMotion }) {
  const pointsRef = useRef(null);
  const count = 42;

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i += 1) {
      pos[i * 3] = (Math.random() - 0.5) * 2.8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 3.4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
      spd[i] = 0.16 + Math.random() * 0.22;
    }
    return { positions: pos, speeds: spd };
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current || reducedMotion) return;
    const attr = pointsRef.current.geometry.attributes.position;
    for (let i = 0; i < count; i += 1) {
      let y = attr.getY(i) + speeds[i] * delta;
      let x = attr.getX(i) + Math.sin(state.clock.elapsedTime * 0.7 + i) * 0.0012;
      if (y > 1.9) {
        y = -1.7;
        x = (Math.random() - 0.5) * 2.4;
      }
      attr.setY(i, y);
      attr.setX(i, x);
    }
    attr.needsUpdate = true;

    pointsRef.current.position.x = THREE.MathUtils.damp(
      pointsRef.current.position.x,
      pointerRef.current.x * 0.25,
      3,
      delta
    );
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#E8A857"
        size={0.032}
        transparent
        opacity={0.28}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export function SvgSteamFallback({ reducedMotion = false }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      <svg
        className={`w-full h-full opacity-35 ${
          reducedMotion ? '' : 'animate-steamFloat'
        }`}
        viewBox="0 0 800 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="coffee-steam-noise" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.014 0.028"
              numOctaves="3"
              seed="7"
              result="noise"
            >
              {!reducedMotion && (
                <animate
                  attributeName="baseFrequency"
                  dur="14s"
                  values="0.014 0.028;0.018 0.022;0.014 0.028"
                  repeatCount="indefinite"
                />
              )}
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="56"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <linearGradient id="steam-grad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#F3E9DC" stopOpacity="0" />
            <stop offset="35%" stopColor="#F3E9DC" stopOpacity="0.22" />
            <stop offset="75%" stopColor="#E8A857" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#F3E9DC" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g filter="url(#coffee-steam-noise)">
          <path
            d="M320 740 C260 560, 410 430, 340 220 C310 130, 360 70, 390 20"
            fill="none"
            stroke="url(#steam-grad)"
            strokeWidth="68"
            strokeLinecap="round"
          />
          <path
            d="M470 760 C540 580, 390 420, 465 210 C495 120, 440 60, 420 15"
            fill="none"
            stroke="url(#steam-grad)"
            strokeWidth="52"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}

export default function SteamCanvas({ reducedMotion = false }) {
  const [webglReady, setWebglReady] = useState(true);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) {
        setWebglReady(false);
      }
    } catch {
      setWebglReady(false);
    }
  }, []);

  useEffect(() => {
    if (reducedMotion) return undefined;
    const handlePointerMove = (event) => {
      const nx = (event.clientX / window.innerWidth) * 2 - 1;
      const ny = -(event.clientY / window.innerHeight) * 2 + 1;
      pointerRef.current.x = nx;
      pointerRef.current.y = ny;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [reducedMotion]);

  if (!webglReady) {
    return <SvgSteamFallback reducedMotion={reducedMotion} />;
  }

  return (
    <div
      className="absolute inset-0 pointer-events-none select-none"
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        frameloop={reducedMotion ? 'demand' : 'always'}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <ambientLight intensity={0.35} color="#F3E9DC" />
        <pointLight position={[1.4, 1.8, 2.5]} intensity={2.2} color="#C98B4B" />
        <SteamWisp
          position={[-0.45, -0.1, 0]}
          scale={[1.05, 1.15, 1]}
          seed={1.3}
          opacity={0.22}
          pointerRef={pointerRef}
          reducedMotion={reducedMotion}
        />
        <SteamWisp
          position={[0.35, 0.15, 0.2]}
          scale={[0.95, 1.1, 1]}
          seed={4.7}
          opacity={0.18}
          pointerRef={pointerRef}
          reducedMotion={reducedMotion}
        />
        <SteamWisp
          position={[0.05, -0.2, -0.2]}
          scale={[1.2, 1.25, 1]}
          seed={8.2}
          opacity={0.15}
          pointerRef={pointerRef}
          reducedMotion={reducedMotion}
        />
        <SteamParticles
          pointerRef={pointerRef}
          reducedMotion={reducedMotion}
        />
      </Canvas>
    </div>
  );
}
