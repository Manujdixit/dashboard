interface NavbarProps {
  onToggleSidebar: () => void;
}

const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  return (
    <div className="navbar bg-blue-600 text-white p-4 flex items-center z-50">
      <button
        onClick={onToggleSidebar}
        className="text-lg mr-4 block"
        aria-label="Toggle Sidebar"
      >
        ☰
      </button>
      <h1 className="text-lg">Dashboard</h1>
    </div>
  );
};

export default Navbar;
