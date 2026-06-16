export default function BackgroundFX() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      
      {/* gradient base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070E19] via-[#0B1220] to-[#070E19]" />

      {/* floating blobs */}
      <div className="blob blob1" />
      <div className="blob blob2" />
      <div className="blob blob3" />
    </div>
  );
}