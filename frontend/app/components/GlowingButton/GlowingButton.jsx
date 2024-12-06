
const GlowingButton = ({ children, onClick, className, type = "button" }) => {
  return (
    <div className="darksoul-glowing-button1 relative group cursor-pointer">
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-cyan-500 rounded-full blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-500"></div>
      <button
        onClick={onClick}
        className={`relative darksoul-button1 text-xl tracking-wide bg-black font-bold leading-5 rounded-full border border-white font-primary box-border px-6 py-3 ${className}`}
        type={type}
      >
        {children}
      </button>
    </div>
  );
};

export default GlowingButton;




