varying vec2 vUv;
varying float vOffsetX;

void main() {

    vec4 modelPosition = modelMatrix * vec4(position, 1.);

     vOffsetX = modelPosition.x / 2.;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vUv = uv;
}