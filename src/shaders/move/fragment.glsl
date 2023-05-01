uniform float uTime;
varying vec2 vUv;

varying float vOffsetX; 


  float circle(in vec2 _st, in float _radius){
    vec2 l = _st-vec2(0.5);



    return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(l,l )*5.0);
  }

  float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
  }

  void main() {
    vec2 st = vUv;
    

    vec3 color = vec3(0.0);
    st *= 10.0;      // Scale up the space by 3

    st.x += vOffsetX ;
   

    st = fract(st ) ; // Wrap around 1.0

    color = vec3(circle(st,0.3));


   gl_FragColor = vec4(color, 1.0);
  }