# Optional grand piano model

Place a licensed, self-contained GLB at `public/models/grand-piano.glb`.
The desktop hero detects and loads it with Three.js GLTFLoader, centers/scales it,
and adds stage lighting. Add the model's required license/attribution here.

No model is bundled. The existing piano SVG remains visible when the file is
missing, loading fails, WebGL is unavailable, or the viewport is mobile.
Use a compact GLB with embedded textures; uncompressed glTF is supported by the
current loader (Draco/KTX2 decoders are not configured).
