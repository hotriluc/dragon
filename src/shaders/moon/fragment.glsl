uniform vec3 uBaseColor;
uniform vec3 uMixColor;
uniform float uTime;

varying vec2 vUv;

#define PI 3.14159265359

float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}



// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

  void main() {
    vec2 st = vUv;

    // scale coordinate system to see texture
    vec2 pos = st * 3.;

    // animate move it
    pos.x += uTime * .7;

    // calcuclate noise
    float n = noise(pos );

    // combine noise with color
    vec3 color = vec3(0. );
  

    color =  n * mix(uBaseColor, uMixColor, vec3(.85 - st.y) );


   gl_FragColor = vec4(color, 1.0);
  }