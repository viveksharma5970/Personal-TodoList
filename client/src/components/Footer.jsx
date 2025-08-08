import TaskMind from "../assets/TaskMind.png";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={TaskMind} alt="TaskMind Logo" className="h-30 rounded" />
        </div>

        {/* Contact Info */}
        <div className="text-sm text-gray-400 space-y-1 text-center md:text-right">
          <p>Email: <a href="mailto:viveksharma5970@gmail.com" className="hover:text-green-500">contact@taskmind.com</a></p>
          <p>Phone: <a href="tel:+917498937871" className="hover:text-green-500">xxxxxxxx71</a></p>
          <p>Address: Nagpur, Maharashtra</p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-800 mt-6 pt-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} TaskMind. All rights reserved.
      </div>
    </footer>
  );
}
