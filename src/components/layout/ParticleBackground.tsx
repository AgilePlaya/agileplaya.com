"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  IcosahedronGeometry,
  BufferAttribute,
  ShaderMaterial,
  Points,
  Vector2,
  Color,
} from "three";

/* ─── Color Palette ──────────────────────────────────────────────── */
const PALETTE = [
  "#003049", // deep navy
  "#d62828", // crimson
  "#f77f00", // amber
  "#fcbf49", // gold
  "#eae2b7", // warm cream
  "#1a4d6e", // muted navy
  "#e04545", // soft red
  "#ff9922", // bright amber
];

/* ─── GLSL: 3D Simplex Noise ─────────────────────────────────────── */
const SIMPLEX_NOISE_GLSL = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

/* ─── Vertex Shader ──────────────────────────────────────────────── */
const vertexShader = /* glsl */ `
${SIMPLEX_NOISE_GLSL}

uniform float uTime;
uniform float uNoiseScale;
uniform float uDisplacement;
uniform vec2  uMouse;
uniform vec2  uResolution;
uniform float uPointScale;

attribute float aRotationSeed;
attribute float aSpinSpeed;
attribute vec3  aColor;

varying float vAlpha;
varying float vAngle;
varying vec3  vColor;

void main() {
  // 1. Noise-based displacement on sphere surface
  float n = snoise(position * uNoiseScale + vec3(0.0, uTime * 0.15, 0.0));
  vec3 displaced = position + normal * (n * uDisplacement);

  // 2. Project to clip space → screen pixels
  vec4 mvPos = modelViewMatrix * vec4(displaced, 1.0);
  vec4 clipPos = projectionMatrix * mvPos;
  vec2 ndcPos = clipPos.xy / clipPos.w;
  vec2 screenPos = (ndcPos * 0.5 + 0.5) * uResolution;

  // 3. Cursor distance visibility (75–125px band)
  float dist = distance(screenPos, uMouse);
  vAlpha = 1.0 - smoothstep(75.0, 125.0, dist);

  // 4. Per-particle rotation
  vAngle = aRotationSeed + uTime * aSpinSpeed;

  // 5. Pass color to fragment shader
  vColor = aColor;

  gl_Position = clipPos;
  // Scale point size by perspective depth
  gl_PointSize = uPointScale * (1.0 / -mvPos.z);
}
`;

/* ─── Fragment Shader ────────────────────────────────────────────── */
const fragmentShader = /* glsl */ `
uniform float uIsDark;

varying float vAlpha;
varying float vAngle;
varying vec3  vColor;

void main() {
  // Early discard invisible particles
  if (vAlpha <= 0.005) discard;

  // Rotate point coord to create spinning line
  vec2 st = gl_PointCoord - vec2(0.5);
  float c = cos(vAngle);
  float s = sin(vAngle);
  st = mat2(c, -s, s, c) * st;

  // Draw a thin line shape (narrow on x, longer on y)
  float lineX = step(abs(st.x), 0.07);
  float lineY = step(abs(st.y), 0.42);
  float line = lineX * lineY;

  if (line <= 0.0) discard;

  // In dark mode, boost brightness slightly
  vec3 color = vColor;
  float alpha = vAlpha * 0.85;

  if (uIsDark > 0.5) {
    color = mix(color, vec3(1.0), 0.1); // slight brighten
    alpha *= 1.1;
  }

  gl_FragColor = vec4(color, alpha);
}
`;

/* ─── React Component ────────────────────────────────────────────── */
export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    /* ── Scene setup ──────────────────────────────────────── */
    const scene = new Scene();
    const camera = new PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 3.5;

    const renderer = new WebGLRenderer({ antialias: false, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // transparent
    container.appendChild(renderer.domElement);

    /* ── Geometry: icosahedron sphere → particles ──────── */
    // Detail level 48 gives ~14,000 vertices — good density
    const geometry = new IcosahedronGeometry(2.0, 48);
    const particleCount = geometry.attributes.position.count;

    // Per-particle attributes
    const rotationSeeds = new Float32Array(particleCount);
    const spinSpeeds = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);

    const paletteColors = PALETTE.map((hex) => new Color(hex));

    for (let i = 0; i < particleCount; i++) {
      rotationSeeds[i] = Math.random() * Math.PI * 2;
      spinSpeeds[i] = (Math.random() - 0.5) * 3.0; // faster spinning

      const col = paletteColors[Math.floor(Math.random() * paletteColors.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute("aRotationSeed", new BufferAttribute(rotationSeeds, 1));
    geometry.setAttribute("aSpinSpeed", new BufferAttribute(spinSpeeds, 1));
    geometry.setAttribute("aColor", new BufferAttribute(colors, 3));

    /* ── Material: custom shaders ─────────────────────── */
    const isDark = resolvedTheme === "dark";

    const uniforms = {
      uTime: { value: 0 },
      uNoiseScale: { value: 1.0 },
      uDisplacement: { value: 0.4 },
      uMouse: { value: new Vector2(-9999, -9999) },
      uResolution: { value: new Vector2(width, height) },
      uPointScale: { value: 14.0 * Math.min(window.devicePixelRatio, 2) },
      uIsDark: { value: isDark ? 1.0 : 0.0 },
    };

    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    });

    const points = new Points(geometry, material);
    scene.add(points);

    /* ── Mouse tracking ───────────────────────────────── */
    const mouse = { x: -9999, y: -9999 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      // Flip Y: canvas origin is bottom-left in GL, but CSS is top-left
      mouse.y = window.innerHeight - e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    // Touch support: reveal particles on touch
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = window.innerHeight - e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    /* ── Resize ───────────────────────────────────────── */
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w, h);
      uniforms.uPointScale.value = 14.0 * Math.min(window.devicePixelRatio, 2);
    };

    /* ── Event listeners ──────────────────────────────── */
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("resize", handleResize);

    /* ── Animation loop ───────────────────────────────── */
    let animationFrameId: number;

    const animate = (time: number) => {
      uniforms.uTime.value = time * 0.001;
      uniforms.uMouse.value.set(mouse.x, mouse.y);

      // Slow sphere rotation for organic feel
      points.rotation.y = time * 0.00008;
      points.rotation.x = Math.sin(time * 0.00005) * 0.1;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    /* ── Cleanup ──────────────────────────────────────── */
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      geometry.dispose();
      material.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [resolvedTheme]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none -z-50"
      aria-hidden="true"
    />
  );
}
