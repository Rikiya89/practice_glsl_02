
layout (location = 0) out vec3 posOut;
layout (location = 1) out vec3 velOut;
layout (location = 2) out vec3 colorOut;

uniform float gravity_sign;
uniform float attractor;

float random (vec2 st) {
    return fract(sin(dot(st.xy,
vec2(12.9898,78.233)))*43758.5453123);
}

void main()
{
	vec3 posTex = texture(sTD2DInputs[0], vUV.st).rgb; 
	vec3 velTex = texture(sTD2DInputs[1], vUV.st).rgb; 

	float sphere_red = 0.01;
	vec3 g = vec3(0, -0.6 -0.5*random(vUV.st + 0.1), 0); 

	if (gravity_sign == 1.) { 
		g.y = 0.6 + 0.5*random(vUV.st);
	}

	vec3 velNew = velTex + g * 0.03;
	vec3 posPredict =  posTex + velNew * 0.01;

	if(posPredict.y < sphere_red) {
		velNew.y = -0.7 * velTex.y;
		velNew.xz /= 1.2;
	}

	vec3 attractor_coords = vec3 (0.0,0.3,0.0);
	if(attractor == 1.) {
		velNew += 0.1 * normalize(attractor_coords - posTex);
	}

	vec3 posNew = posTex + velNew * 0.01;

	posOut = posNew;
	velOut = velNew;
	colorOut = vec3(vUV.st,1.0) * (1 + length(velOut)*2);
}
