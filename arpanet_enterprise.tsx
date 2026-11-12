import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, Monitor, Video, Printer, Cpu, Server, Phone, MapPin, Home, 
  Plus, Minus, Trash2, Wrench, ChevronRight, ShieldAlert, Package, 
  Edit, Save, X, Check, Search, Upload, Info, FileText
} from 'lucide-react';

const downloadPDF = (elementId, filename, showNotification) => {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const scrollableDivs = element.querySelectorAll('.overflow-y-auto');
  scrollableDivs.forEach(div => {
    div.style.maxHeight = 'none';
    div.style.overflow = 'visible';
  });

  showNotification("Generating PDF... Please wait.", "success");
  
  const generate = () => {
    window.html2pdf().set({
      margin: 10,
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }).from(element).save().then(() => {
      scrollableDivs.forEach(div => {
        div.style.maxHeight = '';
        div.style.overflow = '';
      });
    });
  };

  if (!window.html2pdf) {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    script.onload = generate;
    document.head.appendChild(script);
  } else {
    generate();
  }
};

const SEED_DATA = [
  { id: '1', name: 'Dell Vostro 3510 (Core i3 11th Gen)', sku: 'DL-V3510-01', category: 'Computers', brand: 'Dell', description: 'Office laptop with 8GB RAM, 512GB SSD', price: 38500, purchasePrice: 35000, stock: 12, stockUnit: 'piece', minStock: 3, active: true, image: 'https://placehold.co/400x400/f1f5f9/0f172a?text=Laptop' },
  { id: '2', name: 'Lenovo IdeaCentre Desktop', sku: 'LN-IC3-02', category: 'Computers', brand: 'Lenovo', description: 'Core i5, 8GB RAM, 1TB HDD + 256GB SSD', price: 42000, purchasePrice: 38000, stock: 5, stockUnit: 'piece', minStock: 2, active: true, image: 'https://placehold.co/400x400/f1f5f9/0f172a?text=Desktop' },
  { id: '101', name: 'Intel Core i5-12400F', sku: 'CPU-INT-12400F', category: 'Processors', brand: 'Intel', description: '6 Cores, 12 Threads, 18MB Cache', price: 12500, purchasePrice: 11000, stock: 15, stockUnit: 'piece', minStock: 5, active: true, socket: 'LGA1700', image: 'https://placehold.co/400x400/f1f5f9/0f172a?text=CPU' },
  { id: '102', name: 'AMD Ryzen 5 5600G', sku: 'CPU-AMD-5600G', category: 'Processors', brand: 'AMD', description: '6 Cores, 12 Threads with Radeon Graphics', price: 13500, purchasePrice: 12000, stock: 10, stockUnit: 'piece', minStock: 5, active: true, socket: 'AM4', image: 'https://placehold.co/400x400/f1f5f9/0f172a?text=CPU' },
  { id: '103', name: 'MSI PRO H610M-E', sku: 'MB-MSI-H610', category: 'Motherboards', brand: 'MSI', description: 'DDR4, LGA1700 Socket', price: 6500, purchasePrice: 5800, stock: 8, stockUnit: 'piece', minStock: 3, active: true, socket: 'LGA1700', ramType: 'DDR4', image: 'https://placehold.co/400x400/f1f5f9/0f172a?text=Motherboard' },
  { id: '104', name: 'Gigabyte B450M DS3H', sku: 'MB-GIG-B450', category: 'Motherboards', brand: 'Gigabyte', description: 'DDR4, AM4 Socket', price: 6200, purchasePrice: 5500, stock: 10, stockUnit: 'piece', minStock: 3, active: true, socket: 'AM4', ramType: 'DDR4', image: 'https://placehold.co/400x400/f1f5f9/0f172a?text=Motherboard' },
  { id: '105', name: 'Crucial 8GB DDR4 3200MHz', sku: 'RAM-CR-8G', category: 'RAM', brand: 'Crucial', description: 'Desktop Memory', price: 1450, purchasePrice: 1200, stock: 30, stockUnit: 'piece', minStock: 10, active: true, ramType: 'DDR4', image: 'https://placehold.co/400x400/f1f5f9/0f172a?text=RAM' },
  { id: '107', name: 'WD Green 240GB SATA SSD', sku: 'SSD-WD-240G', category: 'SSD', brand: 'WD', description: '2.5 inch SATA III', price: 1550, purchasePrice: 1300, stock: 25, stockUnit: 'piece', minStock: 10, active: true, image: 'https://placehold.co/400x400/f1f5f9/0f172a?text=SSD' },
  { id: '110', name: 'Zotac GTX 1650 4GB', sku: 'GPU-ZT-1650', category: 'GPU', brand: 'Zotac', description: 'GDDR6 Graphics Card', price: 11500, purchasePrice: 10500, stock: 5, stockUnit: 'piece', minStock: 2, active: true, image: 'https://placehold.co/400x400/f1f5f9/0f172a?text=GPU' },
  { id: '111', name: 'Ant Esports VS500L 500W', sku: 'SMPS', category: 'SMPS', brand: 'Ant Esports', description: 'Non-Modular Power Supply', price: 1800, purchasePrice: 1500, stock: 12, stockUnit: 'piece', minStock: 4, active: true, image: 'https://placehold.co/400x400/f1f5f9/0f172a?text=PSU' },
  { id: '112', name: 'Ant Esports ICE-112 Mid Tower', sku: 'CAB-ANT-112', category: 'Cabinet', brand: 'Ant Esports', description: 'Gaming Cabinet with RGB Fan', price: 2500, purchasePrice: 2100, stock: 8, stockUnit: 'piece', minStock: 3, active: true, image: 'https://placehold.co/400x400/f1f5f9/0f172a?text=Cabinet' },
  { id: '113', name: 'Acer 21.5" Full HD Monitor', sku: 'MON-AC-22', category: 'Monitor', brand: 'Acer', description: 'VA Panel, 75Hz, HDMI', price: 5800, purchasePrice: 5200, stock: 10, stockUnit: 'piece', minStock: 3, active: true, image: 'https://placehold.co/400x400/f1f5f9/0f172a?text=Monitor' },
  { id: '3', name: 'CP Plus 2MP IP Bullet Camera', sku: 'CP-IP-2MP-B', category: 'IP Camera', brand: 'CP Plus', description: '1080p, IR 30m, PoE', price: 1800, purchasePrice: 1400, stock: 45, stockUnit: 'piece', minStock: 10, active: true, image: 'https://placehold.co/400x400/f1f5f9/0f172a?text=Camera' },
  { id: '5', name: 'Hikvision 8-Channel NVR', sku: 'HK-NVR-8CH', category: 'NVR', brand: 'Hikvision', description: 'Supports up to 8 MP cameras', price: 4500, purchasePrice: 3800, stock: 8, stockUnit: 'piece', minStock: 2, active: true, image: 'https://placehold.co/400x400/f1f5f9/0f172a?text=NVR' },
  { id: '7', name: 'WD Purple 1TB Surveillance HDD', sku: 'WD-PUR-1TB', category: 'Surveillance HDD', brand: 'WD', description: 'Designed for 24/7 recording', price: 4200, purchasePrice: 3800, stock: 25, stockUnit: 'piece', minStock: 5, active: true, image: 'https://placehold.co/400x400/f1f5f9/0f172a?text=HDD' },
  { id: '9', name: 'D-Link 4-Port PoE Switch', sku: 'DL-POE-4P', category: 'PoE Switch', brand: 'D-Link', description: '4 PoE Ports + 2 Uplink, 60W', price: 2200, purchasePrice: 1800, stock: 15, stockUnit: 'piece', minStock: 5, active: true, image: 'https://placehold.co/400x400/f1f5f9/0f172a?text=Switch' },
  { id: '12', name: 'D-Link Cat6 Cable', sku: 'DL-CAT6-CU', category: 'Cable', brand: 'D-Link', description: 'High-speed networking', price: 30, purchasePrice: 22, stock: 1500, stockUnit: 'metre', minStock: 305, active: true, image: 'https://placehold.co/400x400/f1f5f9/0f172a?text=Cable' },
  { id: '13', name: '2U Server Rack', sku: 'RACK-2U', category: 'Rack', brand: 'Generic', description: 'Wall Mount 2U Rack', price: 1500, purchasePrice: 1200, stock: 10, stockUnit: 'piece', minStock: 2, active: true, image: 'https://placehold.co/400x400/f1f5f9/0f172a?text=2U+Rack' },
  { id: '14', name: '4U Server Rack', sku: 'RACK-4U', category: 'Rack', brand: 'Generic', description: 'Wall Mount 4U Rack', price: 2200, purchasePrice: 1800, stock: 8, stockUnit: 'piece', minStock: 2, active: true, image: 'https://placehold.co/400x400/f1f5f9/0f172a?text=4U+Rack' },
  { id: '15', name: '6U Server Rack', sku: 'RACK-6U', category: 'Rack', brand: 'Generic', description: 'Wall Mount 6U Rack', price: 3000, purchasePrice: 2500, stock: 5, stockUnit: 'piece', minStock: 2, active: true, image: 'https://placehold.co/400x400/f1f5f9/0f172a?text=6U+Rack' }
];

const MainHeader = ({ activeTab, setActiveTab, cart, user, setUser, searchQuery, setSearchQuery }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginRole, setLoginRole] = useState('ADMIN');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');

    if (loginRole === 'ADMIN' && passwordInput === 'admin123') {
      setUser({ uid: 'mock-admin', role: 'ADMIN' });
      setShowLoginModal(false);
      setPasswordInput('');
    } else if (loginRole === 'STAFF' && passwordInput === 'staff123') {
      setUser({ uid: 'mock-staff', role: 'STAFF' });
      setShowLoginModal(false);
      setPasswordInput('');
    } else {
      setLoginError('Incorrect password. Try admin123 or staff123.');
    }
  };

  return (
    <header className="bg-[#123B72] text-white sticky top-0 z-50 print:hidden shadow-md">
      <div className="bg-[#0b2447] text-xs py-1.5 px-4 flex justify-between items-center text-slate-300">
        <span>+91 8839936661, +91 8085311106</span>
        <span className="hidden md:inline">Ground Floor, Balaji Plaza, Shankar Nagar, Bilaspur, CG</span>
        <div className="flex gap-4 font-semibold">
          {!user ? (
            <>
              <button onClick={() => { setLoginRole('ADMIN'); setPasswordInput(''); setLoginError(''); setShowLoginModal(true); }} className="hover:text-white transition-colors text-blue-200">Admin Login</button>
              <button onClick={() => { setLoginRole('STAFF'); setPasswordInput(''); setLoginError(''); setShowLoginModal(true); }} className="hover:text-white transition-colors text-blue-200">Staff Login</button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-emerald-400 font-bold bg-emerald-900/50 px-2 py-0.5 rounded uppercase text-[10px] tracking-wider">{user.role}</span>
              <button onClick={() => { setUser(null); setActiveTab('catalog'); }} className="hover:text-white transition-colors text-slate-300">Log Out</button>
            </div>
          )}
        </div>
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 text-slate-800 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-black text-[#123B72]">{loginRole} Secure Login</h3>
              <button onClick={() => setShowLoginModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-xl">×</button>
            </div>
            <p className="text-sm text-slate-500 mb-6">Please enter the security password to access the {loginRole.toLowerCase()} dashboard.</p>
            
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Password</label>
                <input 
                  type="password"
                  autoFocus
                  placeholder={`Enter ${loginRole.toLowerCase()} password...`}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-[#1677E8] outline-none"
                  required
                />
              </div>

              {loginError && (
                <div className="p-3 bg-red-50 text-red-700 text-xs font-bold rounded border border-red-200">
                  {loginError}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowLoginModal(false)} className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-bold hover:bg-slate-100">Cancel</button>
                <button type="submit" className="px-6 py-2.5 rounded-lg bg-[#1677E8] text-white font-bold hover:bg-blue-600 shadow-md">Login</button>
              </div>
            </form>
          </div>
        </div>
      )}
    
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('catalog')}>
            <div className="bg-white flex items-center justify-center rounded-lg shadow-md overflow-hidden w-12 h-12 p-1.5 transition-transform group-hover:scale-105">
              <img src="Computer Repair Workstation with Tools_2.png" alt="Arpanet Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="font-black text-xl leading-none tracking-tight">ARPANET</h1>
              <span className="text-[10px] tracking-[0.2em] font-medium text-blue-200">ENTERPRISE</span>
            </div>
          </div>
          
          <div className="flex-1 w-full md:max-w-xl relative">
            <input 
              type="text" 
              placeholder="Search computers, CCTV, RAM..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.trim() !== '') setActiveTab('catalog');
              }}
              className="w-full pl-4 pr-10 py-2.5 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1677E8] shadow-sm"
            />
            <Search className="absolute right-3 top-2.5 text-slate-400 w-5 h-5" />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button onClick={() => setActiveTab('cart')} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white text-[#123B72] hover:bg-slate-50 px-4 py-2.5 rounded-lg font-bold transition-colors shadow-sm">
              <ShoppingCart size={18} />
              Cart <span className="bg-[#123B72] text-white text-xs px-2 py-0.5 rounded-full">{cart.reduce((s,i)=>s+i.quantity,0)}</span>
            </button>
            <button onClick={() => setActiveTab('services')} className="flex-1 md:flex-none bg-[#1677E8] hover:bg-blue-500 text-white px-4 py-2.5 rounded-lg font-bold transition-colors shadow-sm whitespace-nowrap">
              Book Service
            </button>
          </div>
        </div>

        <nav className="flex items-center gap-6 mt-5 overflow-x-auto text-sm font-medium text-blue-100 pb-1 custom-scrollbar">
          {['catalog', 'pc-builder', 'cctv-builder', 'services', 'track', 'admin'].map((tab) => {
            if (tab === 'admin' && !user) return null;
            return (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap pb-1 border-b-2 transition-colors ${activeTab === tab ? 'border-white text-white font-bold' : 'border-transparent hover:text-white hover:border-blue-300'}`}
              >
                {tab === 'catalog' && 'Shop'}
                {tab === 'pc-builder' && 'PC Builder'}
                {tab === 'cctv-builder' && 'CCTV Estimator'}
                {tab === 'services' && 'Repairs & Services'}
                {tab === 'track' && 'Track Order & Services'}
                {tab === 'admin' && (user?.role === 'ADMIN' ? 'Admin Dashboard' : 'Staff Dashboard')}
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  );
};

const Footer = () => (
  <footer className="bg-[#0b2447] text-slate-300 py-12 mt-12 border-t-4 border-[#1677E8] print:hidden">
    <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white flex items-center justify-center rounded overflow-hidden w-10 h-10 p-1">
            <img src="Computer Repair Workstation with Tools_2.png" alt="Arpanet Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h2 className="font-bold text-white text-lg leading-tight">ARPANET ENTERPRISE</h2>
            <p className="text-[10px] text-blue-300">Computer • CCTV • IT Solutions</p>
          </div>
        </div>
        <div className="space-y-2 text-sm mt-6">
          <p className="flex items-center gap-2"><Phone size={14} className="text-[#1677E8]"/> +91 8839936661</p>
          <p className="flex items-center gap-2"><Phone size={14} className="text-[#1677E8]"/> +91 8085311106</p>
        </div>
      </div>
      <div>
        <h3 className="font-bold text-white mb-4">Showroom</h3>
        <p className="text-sm leading-relaxed mb-4 flex items-start gap-2">
          <MapPin size={16} className="shrink-0 mt-1 text-[#1677E8]"/>
          Ground Floor, Balaji Plaza, Shankar Nagar, Bilaspur, Chhattisgarh 495004
        </p>
      </div>
      <div>
        <h3 className="font-bold text-white mb-4">Business Details</h3>
        <div className="bg-[#123B72]/50 p-4 rounded-lg border border-blue-900/50 space-y-3 text-sm">
          <p><span className="text-blue-300 block text-xs">GSTIN</span> <span className="font-mono text-white">22FXEPD1770G1ZV</span></p>
          <p><span className="text-blue-300 block text-xs">MSME</span> <span className="font-mono text-white">UDYAM-CG-02-0011407</span></p>
          <p><span className="text-blue-300 block text-xs">UPI ID</span> <span className="font-mono text-white">arpanet41@sbi</span></p>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState(SEED_DATA);
  const [orders, setOrders] = useState([]);
  const [serviceRequests, setServiceRequests] = useState([]);
  
  const [notification, setNotification] = useState(null);
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
    showNotification(`Added ${product.name} to cart.`);
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] font-sans text-slate-800 flex flex-col relative">
      <MainHeader activeTab={activeTab} setActiveTab={setActiveTab} cart={cart} user={user} setUser={setUser} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      {notification ? (
        <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-4 ${notification.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
          {notification.type === 'success' ? <Check size={18} /> : <Info size={18} />}
          {notification.message}
        </div>
      ) : null}

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'catalog' && <Catalog products={products} addToCart={addToCart} setActiveTab={setActiveTab} searchQuery={searchQuery} />}
        {activeTab === 'pc-builder' && <PCBuilder products={products} addToCart={addToCart} showNotification={showNotification} />}
        {activeTab === 'cctv-builder' && <CCTVBuilder products={products} addToCart={addToCart} showNotification={showNotification} />}
        {activeTab === 'services' && <ServiceBooking onSubmitRequest={(req) => setServiceRequests(prev => [req, ...prev])} showNotification={showNotification} />}
        {activeTab === 'track' && <TrackOrder orders={orders} serviceRequests={serviceRequests} showNotification={showNotification} />}
        {activeTab === 'cart' && <Cart cart={cart} setCart={setCart} setActiveTab={setActiveTab} user={user} setOrders={setOrders} setProducts={setProducts} showNotification={showNotification} />}
        {activeTab === 'admin' && <AdminDashboard products={products} setProducts={setProducts} orders={orders} setOrders={setOrders} serviceRequests={serviceRequests} setServiceRequests={setServiceRequests} user={user} showNotification={showNotification} />}
      </main>

      <Footer />
    </div>
  );
}

function Catalog({ products, addToCart, setActiveTab, searchQuery }) {
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { name: 'Computers & Laptops', icon: Monitor, color: 'text-blue-500' },
    { name: 'Custom PC Builder', icon: Cpu, color: 'text-slate-600', action: () => setActiveTab('pc-builder') },
    { name: 'CCTV & IP Cameras', icon: Video, color: 'text-emerald-500' },
    { name: 'Printers & Inks', icon: Printer, color: 'text-orange-500' },
    { name: 'Networking & Racks', icon: Server, color: 'text-cyan-500' },
    { name: 'Keyboard and Mouse', icon: Wrench, color: 'text-indigo-500' },
    { name: 'UPS & Power Backup', icon: ShieldAlert, color: 'text-amber-500' },
    { name: 'Accessories & Parts', icon: Wrench, color: 'text-purple-500' }
  ];

  let filteredProducts = products.filter(p => p.active);

  if (searchQuery && searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name?.toLowerCase().includes(q) || 
      p.category?.toLowerCase().includes(q) || 
      p.brand?.toLowerCase().includes(q) || 
      p.sku?.toLowerCase().includes(q)
    );
  } else if (selectedCategory) {
    const cat = selectedCategory;
    filteredProducts = filteredProducts.filter(p => {
      if (cat === 'Computers & Laptops') return ['Computers', 'Monitor'].includes(p.category);
      if (cat === 'CCTV & IP Cameras') return ['IP Camera', 'HD Camera', 'NVR', 'DVR', 'Surveillance HDD', 'PoE Switch', 'Cable', 'Rack'].includes(p.category);
      if (cat === 'Printers & Inks') return p.category?.includes('Printer');
      if (cat === 'Networking & Racks') return ['Networking', 'Cable', 'Connectors', 'Rack'].includes(p.category);
      if (cat === 'Keyboard and Mouse') return p.category === 'Keyboard and Mouse' || p.category === 'KeyboardMouse';
      if (cat === 'UPS & Power Backup') return p.category === 'UPS';
      if (cat === 'Accessories & Parts') return ['RAM', 'SSD', 'HDD', 'GPU', 'SMPS', 'Cabinet', 'KeyboardMouse', 'Keyboard and Mouse', 'Processors', 'Motherboards'].includes(p.category);
      return true;
    });
  } else if (!showAllProducts) {
    filteredProducts = filteredProducts.slice(0, 8);
  }

  let sectionTitle = 'Featured Products';
  if (searchQuery && searchQuery.trim() !== '') sectionTitle = `Search Results for "${searchQuery}"`;
  else if (selectedCategory) sectionTitle = `${selectedCategory}`;
  else if (showAllProducts) sectionTitle = 'All Products';

  const handleCategoryClick = (c) => {
    if (c.action) {
      c.action();
    } else {
      setSelectedCategory(c.name);
      setShowAllProducts(true);
    }
  };

  return (
    <div className="animate-in fade-in">
      {!searchQuery && !selectedCategory && (
        <div className="bg-[#123B72] rounded-2xl p-8 md:p-12 text-white mb-10 overflow-hidden relative shadow-lg">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#1677E8] rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="relative z-10 max-w-2xl">
            <p className="text-blue-300 font-bold tracking-wider text-sm mb-4">YOUR COMPLETE IT SOLUTION PARTNER</p>
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Technology.<br/>Built for You.</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl leading-relaxed">
              From custom high-performance computers to enterprise-grade CCTV and networking. We provide hardware and professional IT services.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => setActiveTab('pc-builder')} className="bg-white text-[#123B72] hover:bg-slate-50 px-6 py-3 rounded-lg font-bold transition-colors shadow-md">
                Build Your PC →
              </button>
              <button onClick={() => setActiveTab('cctv-builder')} className="bg-transparent border-2 border-blue-400/30 hover:border-blue-300 text-white px-6 py-3 rounded-lg font-bold transition-colors">
                Configure CCTV
              </button>
            </div>
          </div>
        </div>
      )}

      {!searchQuery ? (
        <div className="mb-10">
          <div className="flex justify-between items-end mb-6">
            <h3 className="text-2xl font-bold text-slate-900">Shop by Category</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((c, i) => {
              const Icon = c.icon;
              return (
                <div 
                  key={i} 
                  onClick={() => handleCategoryClick(c)}
                  className={`bg-white p-6 rounded-xl border ${selectedCategory === c.name ? 'border-[#1677E8] shadow-md ring-1 ring-[#1677E8]' : 'border-slate-200'} hover:border-blue-300 hover:shadow-md transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-3 group`}
                >
                  <div className={`p-3 rounded-full bg-slate-50 group-hover:bg-blue-50 transition-colors ${c.color}`}>
                    <Icon size={28} />
                  </div>
                  <span className="font-bold text-sm text-slate-700 group-hover:text-blue-700">{c.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      <div>
        <div className="flex justify-between items-end mb-6">
          <h3 className="text-2xl font-bold text-slate-900">{sectionTitle}</h3>
          {(!searchQuery || searchQuery.trim() === '') && !selectedCategory ? (
            <button onClick={() => setShowAllProducts(!showAllProducts)} className="text-[#1677E8] font-semibold text-sm hover:underline">
              {showAllProducts ? 'Show Less ←' : 'View all →'}
            </button>
          ) : null}
          {selectedCategory ? (
            <button onClick={() => { setSelectedCategory(null); setShowAllProducts(false); }} className="text-[#1677E8] font-semibold text-sm hover:underline">
              ← Clear Filter
            </button>
          ) : null}
        </div>
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200 border-dashed">
            <p className="text-slate-500">No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(p => (
              <div key={p.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all group flex flex-col p-4">
                <div className="h-48 bg-slate-50 flex items-center justify-center overflow-hidden rounded-lg mb-4 border border-slate-100 p-2">
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { e.target.src = 'https://placehold.co/400x400/e2e8f0/1e293b?text=No+Image'; }}
                  />
                </div>
                <div className="mb-4 flex-grow">
                  <h4 className="font-bold text-slate-900 text-lg mb-1 leading-tight">{p.name}</h4>
                  <p className="text-xs text-slate-500 mb-2">{p.category} &bull; {p.brand}</p>
                  <p className="font-black text-2xl text-[#123B72]">₹{p.price.toLocaleString()}</p>
                  <div className="mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-bold border ${p.stock > p.minStock ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : p.stock > 0 ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                      {p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => addToCart(p)}
                  disabled={p.stock <= 0}
                  className="w-full bg-[#1677E8] hover:bg-blue-600 disabled:bg-slate-300 text-white font-bold py-2.5 rounded-lg transition-colors mt-auto flex justify-center items-center gap-2"
                >
                  <ShoppingCart size={16} /> Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PCBuilder({ products, addToCart, showNotification }) {
  const [build, setBuild] = useState({});
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { key: 'Processors', title: 'Processor (CPU)' },
    { key: 'Motherboards', title: 'Motherboard' },
    { key: 'RAM', title: 'Memory (RAM)' },
    { key: 'SSD', title: 'Primary Storage (SSD)' },
    { key: 'HDD', title: 'Secondary Storage (HDD)', optional: true },
    { key: 'GPU', title: 'Graphics Card (GPU)', optional: true },
    { key: 'SMPS', title: 'Power Supply (SMPS)' },
    { key: 'Cabinet', title: 'Cabinet / Case' },
    { key: 'Monitor', title: 'Monitor', optional: true },
    { key: 'KeyboardMouse', title: 'Keyboard & Mouse', optional: true },
    { key: 'UPS', title: 'UPS', optional: true }
  ];

  const handleSelect = (category, product) => {
    setBuild(prev => {
      const newBuild = { ...prev, [category]: product };
      if (category === 'Processors' && prev.Motherboards && prev.Motherboards.socket !== product.socket) {
        delete newBuild.Motherboards;
      }
      if (category === 'Motherboards' && prev.RAM && prev.RAM.ramType !== product.ramType) {
        delete newBuild.RAM;
      }
      return newBuild;
    });
    if (currentStep < steps.length - 1) setCurrentStep(curr => curr + 1);
  };

  const calculateTotal = () => Object.values(build).reduce((sum, item) => sum + (item?.price || 0), 0);
  const handlePrint = () => downloadPDF('pc-quotation-pdf', 'PC_Quotation.pdf', showNotification);
  
  const handleAddBuildToCart = () => {
    Object.values(build).forEach(item => { if (item) addToCart(item); });
    setBuild({});
    setCurrentStep(0);
    showNotification('Entire PC Build added to cart!');
  };

  const currentStepData = steps[currentStep];
  let stepProducts = products.filter(p => p.category === currentStepData.key && p.active);
  if (currentStepData.key === 'Motherboards' && build.Processors) {
    stepProducts = stepProducts.filter(p => p.socket === build.Processors.socket);
  }
  if (currentStepData.key === 'RAM' && build.Motherboards) {
    stepProducts = stepProducts.filter(p => p.ramType === build.Motherboards.ramType);
  }

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in">
      <div className="bg-[#123B72] text-white p-8 rounded-xl mb-8 shadow-md print:hidden">
        <h2 className="text-3xl font-black mb-2">Custom PC Builder</h2>
        <p className="text-blue-200">Select compatible components to build your perfect workstation or gaming rig.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 print:hidden">
          <div className="flex flex-wrap gap-2 mb-6">
            {steps.map((step, idx) => (
              <button
                key={step.key}
                onClick={() => setCurrentStep(idx)}
                className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all border
                  ${currentStep === idx 
                    ? 'bg-[#1677E8] text-white border-[#1677E8] shadow-md' 
                    : build[step.key] 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' 
                      : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
              >
                {step.title} {build[step.key] ? '✓' : ''}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900">Select {currentStepData.title}</h3>
              {currentStepData.optional ? (
                <button 
                  onClick={() => {
                    const newBuild = {...build}; delete newBuild[currentStepData.key]; setBuild(newBuild);
                    if (currentStep < steps.length - 1) setCurrentStep(c => c + 1);
                  }}
                  className="text-sm font-medium text-slate-500 hover:text-slate-800 bg-slate-100 px-3 py-1 rounded"
                >
                  Skip this step
                </button>
              ) : null}
            </div>

            {stepProducts.length === 0 ? (
              <div className="text-center py-10 bg-slate-50 rounded-lg border border-slate-200 border-dashed">
                <p className="text-slate-500">No compatible products found based on your current selection.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {stepProducts.map(p => {
                  const isSelected = build[currentStepData.key]?.id === p.id;
                  return (
                    <div key={p.id} onClick={() => handleSelect(currentStepData.key, p)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all flex items-center gap-4
                        ${isSelected ? 'border-[#1677E8] bg-blue-50/50 shadow-sm' : 'border-slate-200 hover:border-blue-300 bg-white'}`}
                    >
                      <div className="w-16 h-16 bg-white flex items-center justify-center rounded border border-slate-100 p-1">
                        <img src={p.image} alt={p.name} className="w-full h-full object-contain" onError={(e) => { e.target.src = 'https://placehold.co/400x400/e2e8f0/1e293b?text=No+Image'; }}/>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm text-slate-900 truncate">{p.name}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="font-bold text-[#123B72]">₹{p.price.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1 print:col-span-3">
          <div id="pc-quotation-pdf" className="bg-white rounded-xl shadow-sm border border-slate-200 sticky top-24 print:border-0 print:shadow-none">
            <div className="bg-[#0b2447] text-white p-6 rounded-t-xl">
               <h1 className="text-2xl font-black tracking-tight mb-1">ARPANET ENTERPRISE</h1>
               <p className="text-blue-200 text-sm mb-4">Ground Floor, Balaji Plaza, Shankar Nagar, Bilaspur</p>
               <p className="text-blue-200 text-sm mb-4">GSTIN: 22FXEPD1770G1ZV • Date: {new Date().toLocaleDateString()}</p>
               <h3 className="font-bold text-lg border-t border-blue-800/50 pt-3">Custom PC Quotation</h3>
            </div>
            <div className="p-4 space-y-3 max-h-[50vh] overflow-y-auto custom-scrollbar print:max-h-none print:overflow-visible">
              {steps.map(step => {
                const item = build[step.key];
                if (!item) return null;
                return (
                  <div key={step.key} className="flex justify-between items-start gap-2 border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">{step.title}</p>
                      <p className="text-sm font-semibold text-slate-800 truncate">{item.name}</p>
                    </div>
                    <span className="text-sm font-bold text-[#123B72] shrink-0">₹{item.price.toLocaleString()}</span>
                  </div>
                );
              })}
            </div>
            <div className="p-4 border-t border-slate-200 bg-slate-50 rounded-b-xl print:bg-white print:border-t-2 print:border-slate-800">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-slate-700">Total Build Cost</span>
                <span className="text-2xl font-black text-[#1677E8]">₹{calculateTotal().toLocaleString()}</span>
              </div>
              <div className="flex flex-col gap-3 print:hidden" data-html2canvas-ignore="true">
                <button onClick={handleAddBuildToCart} disabled={Object.keys(build).length === 0} className="w-full bg-[#123B72] hover:bg-[#0b2447] disabled:bg-slate-300 text-white font-bold py-3 rounded-lg transition-colors flex justify-center items-center gap-2">
                  <ShoppingCart size={18} /> Add Entire Build to Cart
                </button>
                <button onClick={handlePrint} disabled={Object.keys(build).length === 0} className="w-full bg-white hover:bg-slate-50 text-[#123B72] border-2 border-[#123B72] disabled:border-slate-300 disabled:text-slate-400 font-bold py-3 rounded-lg transition-colors flex justify-center items-center gap-2">
                  <FileText size={18} /> 📄 Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CCTVBuilder({ products, addToCart, showNotification }) {
  const [cameras, setCameras] = useState([]);
  const [cable, setCable] = useState(null);
  const [recorder, setRecorder] = useState(null);
  const [storage, setStorage] = useState(null);
  const [power, setPower] = useState(null);
  const [rack, setRack] = useState(null);
  const [extraCable, setExtraCable] = useState(0);

  const availableCameras = products.filter(p => p.category?.includes('Camera') && p.active);
  const availableCable = products.filter(p => p.category === 'Cable' && p.active);
  const availableRecorders = products.filter(p => p.category === 'NVR' || p.category === 'DVR');
  const availableStorage = products.filter(p => p.category === 'Surveillance HDD');
  const availablePower = products.filter(p => p.category === 'PoE Switch' || p.category === 'SMPS');
  const availableRacks = products.filter(p => p.category === 'Rack' && p.active);

  const addCamera = (cam) => {
    setCameras(prev => {
      const ex = prev.find(c => c.id === cam.id);
      if (ex) return prev.map(c => c.id === cam.id ? {...c, qty: c.qty + 1} : c);
      return [...prev, {...cam, qty: 1}];
    });
  };
  const removeCamera = (id) => setCameras(prev => prev.filter(c => c.id !== id));

  const totalCameras = cameras.reduce((sum, c) => sum + c.qty, 0);
  const minCable = totalCameras * 25;
  const totalCable = minCable + Number(extraCable);
  
  const calculateTotal = () => {
    let total = cameras.reduce((sum, c) => sum + (c.price * c.qty), 0);
    if (cable) total += (cable.price * totalCable);
    if (recorder) total += recorder.price;
    if (storage) total += storage.price;
    if (power) total += power.price;
    if (rack) total += rack.price;
    return total;
  };

  const handlePrint = () => downloadPDF('cctv-quotation-pdf', 'CCTV_Quotation.pdf', showNotification);
  
  const handleAddAllToCart = () => {
    cameras.forEach(c => addToCart(c, c.qty));
    if (cable && totalCable > 0) addToCart(cable, totalCable);
    if (recorder) addToCart(recorder, 1);
    if (storage) addToCart(storage, 1);
    if (power) addToCart(power, 1);
    if (rack) addToCart(rack, 1);
    showNotification('CCTV System components added to cart!');
  };

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in">
       <div className="bg-[#123B72] text-white p-8 rounded-xl mb-8 shadow-md print:hidden">
        <h2 className="text-3xl font-black mb-2">Smart CCTV Estimator</h2>
        <p className="text-blue-200">Design your surveillance system. Cable length is auto-calculated at 25m minimum per camera.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6 print:hidden">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-slate-900 border-b pb-2">1. Select Cameras</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {availableCameras.map(p => (
                <div key={p.id} className="border border-slate-200 p-4 rounded-lg flex justify-between items-center bg-slate-50">
                  <div>
                    <div className="font-bold text-sm text-slate-900">{p.name}</div>
                    <div className="text-[#1677E8] font-bold mt-1">₹{p.price.toLocaleString()}</div>
                  </div>
                  <button onClick={() => addCamera(p)} className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 p-2 rounded-lg shadow-sm"><Plus size={16} /></button>
                </div>
              ))}
            </div>
            {cameras.length > 0 ? (
              <div className="mt-4 bg-slate-100 p-4 rounded-lg">
                <h4 className="font-bold text-sm mb-2 text-slate-700">Selected Cameras</h4>
                {cameras.map(c => (
                  <div key={c.id} className="flex justify-between items-center mb-2 bg-white px-3 py-2 rounded border border-slate-200">
                    <span className="text-sm font-medium">{c.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-[#123B72]">Qty: {c.qty}</span>
                      <button onClick={() => removeCamera(c.id)} className="text-red-500 hover:text-red-700 bg-red-50 p-1 rounded"><Trash2 size={14}/></button>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-slate-900 border-b pb-2">2. Select Cable & Length</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              {availableCable.map(p => (
                <div key={p.id} onClick={() => setCable(p)} className={`p-4 border-2 rounded-lg cursor-pointer ${cable?.id === p.id ? 'border-[#1677E8] bg-blue-50' : 'border-slate-200 bg-slate-50'}`}>
                  <div className="font-bold text-sm">{p.name}</div>
                  <div className="text-[#1677E8] font-bold mt-1">₹{p.price}/metre</div>
                </div>
              ))}
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Additional Cable Length (Metres above minimum {minCable}m):</label>
              <input type="number" min="0" value={extraCable} onChange={(e) => setExtraCable(e.target.value)} className="w-full border p-2.5 rounded-lg" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-slate-900 border-b pb-2">3. Core System Components</h3>
            <div className="space-y-6">
              {[
                { title: 'Recorder (NVR/DVR)', data: availableRecorders, state: recorder, setter: setRecorder },
                { title: 'Storage (Surveillance HDD)', data: availableStorage, state: storage, setter: setStorage },
                { title: 'Power & Networking', data: availablePower, state: power, setter: setPower },
                { title: 'Server / Network Rack', data: availableRacks, state: rack, setter: setRack }
              ].map((section, idx) => (
                <div key={idx}>
                  <h4 className="font-semibold text-sm mb-3 text-slate-600 uppercase tracking-wider">{section.title}</h4>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {section.data.map(p => (
                      <div key={p.id} onClick={() => section.setter(p)} className={`p-3 border-2 rounded-lg cursor-pointer ${section.state?.id === p.id ? 'border-[#1677E8] bg-blue-50' : 'border-slate-200 bg-slate-50'}`}>
                        <div className="font-bold text-sm">{p.name}</div>
                        <div className="text-[#1677E8] font-bold mt-1">₹{p.price.toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 print:col-span-3">
           <div id="cctv-quotation-pdf" className="bg-white rounded-xl shadow-sm border border-slate-200 sticky top-24 print:border-0 print:shadow-none">
            <div className="bg-[#0b2447] text-white p-6 rounded-t-xl">
               <h1 className="text-2xl font-black tracking-tight mb-1">ARPANET ENTERPRISE</h1>
               <p className="text-blue-200 text-sm mb-4">Ground Floor, Balaji Plaza, Shankar Nagar, Bilaspur</p>
               <p className="text-blue-200 text-sm mb-4">GSTIN: 22FXEPD1770G1ZV • Date: {new Date().toLocaleDateString()}</p>
               <h3 className="font-bold text-lg border-t border-blue-800/50 pt-3">CCTV System Quotation</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase mb-1">Cameras ({totalCameras})</div>
                {cameras.map(c => (
                  <div key={c.id} className="flex justify-between text-sm mb-1">
                    <span className="truncate pr-2 font-medium">{c.qty}x {c.name}</span>
                    <span className="font-bold">₹{(c.qty * c.price).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 pt-3">
                <div className="text-xs font-bold text-slate-400 uppercase mb-1">Cable ({totalCable}m)</div>
                <div className="flex justify-between text-sm">
                  <span className="truncate pr-2 font-medium">{cable ? cable.name : 'No cable selected'}</span>
                  <span className="font-bold">₹{cable ? (cable.price * totalCable).toLocaleString() : 0}</span>
                </div>
              </div>
              <div className="border-t border-slate-100 pt-3">
                <div className="text-xs font-bold text-slate-400 uppercase mb-1">Core Components</div>
                {[recorder, storage, power, rack].map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm mb-1">
                    <span className="truncate pr-2 font-medium">{item ? item.name : 'Not selected'}</span>
                    <span className="font-bold">₹{item ? item.price.toLocaleString() : 0}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 border-t border-slate-200 bg-slate-50 rounded-b-xl print:bg-white print:border-t-2 print:border-slate-800">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-slate-700">Estimated Hardware Cost</span>
                <span className="text-2xl font-black text-[#1677E8]">₹{calculateTotal().toLocaleString()}</span>
              </div>
              <div className="flex flex-col gap-3 print:hidden" data-html2canvas-ignore="true">
                <button onClick={handleAddAllToCart} disabled={totalCameras === 0} className="w-full bg-[#123B72] hover:bg-[#0b2447] disabled:bg-slate-300 text-white font-bold py-3 rounded-lg transition-colors flex justify-center items-center gap-2">
                  <ShoppingCart size={18} /> Add System to Cart
                </button>
                <button onClick={handlePrint} disabled={totalCameras === 0} className="w-full bg-white hover:bg-slate-50 text-[#123B72] border-2 border-[#123B72] disabled:border-slate-300 disabled:text-slate-400 font-bold py-3 rounded-lg transition-colors flex justify-center items-center gap-2">
                  <FileText size={18} /> 📄 Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceBooking({ onSubmitRequest, showNotification }) {
  const [formData, setFormData] = useState({ category: 'PC & Laptop Repair', description: '', name: '', phone: '', address: '' });
  const categories = ['PC & Laptop Repair', 'Printer Repair & Maintenance', 'CCTV Installation & Repair', 'Network Setup & Configuration', 'UPS Servicing'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReq = { id: `SRV-${Math.floor(Math.random()*10000)}`, ...formData, status: 'Pending', createdAt: { seconds: Date.now() / 1000 } };
    if (onSubmitRequest) onSubmitRequest(newReq);
    showNotification(`Service request submitted! We will contact you at ${formData.phone}.`);
    setFormData({ category: 'PC & Laptop Repair', description: '', name: '', phone: '', address: '' });
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in">
      <div className="bg-[#123B72] text-white p-8 rounded-xl mb-8 shadow-md">
        <h2 className="text-3xl font-black mb-2">Book a Service</h2>
        <p className="text-blue-200">Expert repair and maintenance for your IT infrastructure and electronics.</p>
      </div>
      <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Service Category</label>
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-3 rounded-lg border border-slate-300 focus:border-[#1677E8] outline-none bg-slate-50">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
              <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 rounded-lg border border-slate-300 focus:border-[#1677E8] outline-none" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
              <input required type="tel" maxLength="10" pattern="[0-9]{10}" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10)})} className="w-full p-3 rounded-lg border border-slate-300 focus:border-[#1677E8] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Complete Address</label>
              <input required type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full p-3 rounded-lg border border-slate-300 focus:border-[#1677E8] outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Issue Description</label>
            <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-3 rounded-lg border border-slate-300 focus:border-[#1677E8] outline-none min-h-[120px]"></textarea>
          </div>
          <button type="submit" className="bg-[#1677E8] hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg transition-colors w-full md:w-auto shadow-md">
            Submit Service Request
          </button>
        </form>
      </div>
    </div>
  );
}

function Cart({ cart, setCart, setActiveTab, user, setOrders, setProducts, showNotification }) {
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '' });
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0) { showNotification('Cart is empty', 'error'); return; }
    
    const orderId = `ORD-${Math.floor(Math.random()*100000)}`;
    const newOrder = { id: orderId, items: [...cart], total, customer, paymentMethod, status: 'Pending', createdAt: { seconds: Date.now() / 1000 } };
    
    setOrders(prev => [newOrder, ...prev]);
    setProducts(prevProducts => prevProducts.map(p => {
        const cartItem = cart.find(c => c.id === p.id);
        return cartItem ? { ...p, stock: p.stock - cartItem.quantity } : p;
    }));

    showNotification(`Order ${orderId} placed successfully via ${paymentMethod}!`);
    setCart([]);
    setCustomer({ name: '', phone: '', address: '' });
    setActiveTab('track');
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const updateQty = (id, newQty) => { if (newQty > 0) setCart(prev => prev.map(i => i.id === id ? {...i, quantity: newQty} : i)); };

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
        <ShoppingCart className="w-16 h-16 mx-auto text-slate-300 mb-4" />
        <h2 className="text-2xl font-bold text-slate-700 mb-2">Your cart is empty</h2>
        <button onClick={() => setActiveTab('catalog')} className="bg-[#123B72] hover:bg-[#0b2447] text-white px-6 py-3 rounded-lg font-bold mt-4">Start Shopping</button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in">
      <h2 className="text-3xl font-black mb-6 text-slate-900">Shopping Cart</h2>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4">
              <div className="w-20 h-20 bg-slate-50 flex items-center justify-center shrink-0 p-2"><img src={item.image} alt={item.name} className="w-full h-full object-contain" /></div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-900 truncate">{item.name}</h4>
                <div className="font-bold text-[#1677E8] mt-1">₹{item.price.toLocaleString()}</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-slate-300 rounded bg-white">
                  <button onClick={() => updateQty(item.id, item.quantity - 1)} className="px-2 py-1 hover:bg-slate-100">-</button>
                  <span className="px-2 py-1 text-sm font-bold w-8 text-center">{item.quantity}</span>
                  <button onClick={() => updateQty(item.id, item.quantity + 1)} className="px-2 py-1 hover:bg-slate-100">+</button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 p-6 sticky top-24 shadow-sm">
            <h3 className="text-xl font-bold mb-4 border-b pb-2">Checkout Summary</h3>
            <div className="flex justify-between items-center mb-6">
              <span className="text-slate-600">Total Amount</span>
              <span className="text-2xl font-black text-[#123B72]">₹{total.toLocaleString()}</span>
            </div>

            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input required type="text" value={customer.name} onChange={e=>setCustomer({...customer, name:e.target.value})} className="w-full p-2.5 rounded border border-slate-300 text-sm focus:border-[#1677E8] outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                <input required type="tel" maxLength="10" pattern="[0-9]{10}" value={customer.phone} onChange={e=>setCustomer({...customer, phone:e.target.value.replace(/\D/g, '').slice(0, 10)})} className="w-full p-2.5 rounded border border-slate-300 text-sm focus:border-[#1677E8] outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Delivery Address</label>
                <textarea required value={customer.address} onChange={e=>setCustomer({...customer, address:e.target.value})} className="w-full p-2.5 rounded border border-slate-300 text-sm focus:border-[#1677E8] outline-none" rows="2"></textarea>
              </div>
              
              <div className="border-t pt-4">
                <label className="block text-sm font-bold text-slate-700 mb-2">Payment Method</label>
                <div className="space-y-2">
                  {['UPI', 'Credit/Debit Card', 'Cash on Delivery'].map(method => (
                    <label key={method} className="flex items-center gap-2 cursor-pointer p-2 border rounded hover:bg-slate-50">
                      <input type="radio" name="paymentMethod" value={method} checked={paymentMethod === method} onChange={(e) => setPaymentMethod(e.target.value)} className="accent-[#1677E8]" />
                      <span className="text-sm font-medium">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              {paymentMethod === 'UPI' ? (
                <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-center mt-2">
                  <p className="text-xs text-slate-600 mb-1">Pay to Arpanet Enterprise UPI ID:</p>
                  <p className="font-bold text-[#123B72] text-lg tracking-wide">arpanet41@sbi</p>
                </div>
              ) : null}

              <button type="submit" className="w-full bg-[#1677E8] hover:bg-blue-600 text-white font-bold py-3.5 rounded-lg transition-colors mt-4 shadow-md">
                Complete Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard({ products, setProducts, orders, setOrders, serviceRequests, setServiceRequests, user, showNotification }) {
  const [adminTab, setAdminTab] = useState(user?.role === 'ADMIN' ? 'products' : 'orders');
  const [editingId, setEditingId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({ name: '', sku: '', category: 'Computers', brand: '', description: '', price: 0, purchasePrice: 0, stock: 0, minStock: 2, stockUnit: 'piece', active: true, image: '' });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setFormData({...formData, image: URL.createObjectURL(file)});
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (editingId) setProducts(prev => prev.map(p => p.id === editingId ? { ...p, ...formData } : p));
    else setProducts(prev => [{ ...formData, id: Date.now().toString(), active: true }, ...prev]);
    showNotification('Product saved successfully!');
    setEditingId(null);
    setFormData({ name: '', sku: '', category: 'Computers', brand: '', description: '', price: 0, purchasePrice: 0, stock: 0, minStock: 2, stockUnit: 'piece', active: true, image: '' });
  };

  const advanceOrder = (orderId, currentStatus) => {
    const statusMap = { 'Pending': 'Processing', 'Processing': 'Shipped', 'Shipped': 'Delivered' };
    const nextStatus = statusMap[currentStatus];
    if (nextStatus) {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: nextStatus } : o));
      if (selectedOrder?.id === orderId) setSelectedOrder(prev => ({...prev, status: nextStatus}));
      showNotification(`Order moved to ${nextStatus}`);
    }
  };

  const advanceService = (serviceId, currentStatus, updates = {}) => {
    const statusMap = { 'Pending': 'Diagnosing', 'Diagnosing': 'Repairing', 'Repairing': 'Completed' };
    const nextStatus = statusMap[currentStatus];
    if (nextStatus) {
      setServiceRequests(prev => prev.map(s => s.id === serviceId ? { ...s, status: nextStatus, ...updates } : s));
      if (selectedService?.id === serviceId) setSelectedService(prev => ({...prev, status: nextStatus, ...updates}));
      showNotification(`Service moved to ${nextStatus}`);
    }
  };

  const sendWhatsAppMessage = (phone, text) => {
    const cleanPhone = phone.replace(/\D/g, '');
    const encodedText = encodeURIComponent(text);
    window.open(`https://api.whatsapp.com/send?phone=91${cleanPhone}&text=${encodedText}`, '_blank');
  };

  const handlePrintOrder = () => downloadPDF('order-summary-pdf', `Order_${selectedOrder.id}.pdf`, showNotification);
  const handlePrintService = () => downloadPDF('service-report-pdf', `Service_${selectedService.id}.pdf`, showNotification);

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 print:hidden">
        <div>
          <h2 className="text-3xl font-black text-[#123B72]">{user?.role === 'ADMIN' ? 'Admin Dashboard' : 'Staff Dashboard'}</h2>
        </div>
        <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
          {user?.role === 'ADMIN' && <button onClick={() => setAdminTab('products')} className={`px-4 py-2 rounded-md font-bold text-sm ${adminTab === 'products' ? 'bg-[#123B72] text-white' : 'text-slate-600'}`}>Products</button>}
          <button onClick={() => setAdminTab('orders')} className={`px-4 py-2 rounded-md font-bold text-sm ${adminTab === 'orders' ? 'bg-[#123B72] text-white' : 'text-slate-600'}`}>Orders</button>
          <button onClick={() => setAdminTab('services')} className={`px-4 py-2 rounded-md font-bold text-sm ${adminTab === 'services' ? 'bg-[#123B72] text-white' : 'text-slate-600'}`}>Services</button>
        </div>
      </div>

      {adminTab === 'products' && user?.role === 'ADMIN' && (
        <div className="space-y-8 mb-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200">
             <form onSubmit={handleSaveProduct} className="grid md:grid-cols-4 gap-4">
                <input required type="text" placeholder="Product Name" value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} className="border p-2 rounded" />
                <input required type="text" placeholder="SKU" value={formData.sku} onChange={e=>setFormData({...formData, sku:e.target.value})} className="border p-2 rounded" />
              <select value={formData.category} onChange={e=>setFormData({...formData, category:e.target.value})} className="border p-2 rounded bg-white">
                <option value="Computers">Computers & Laptops</option>
                <option value="Processors">Processors</option>
                <option value="Motherboards">Motherboards</option>
                <option value="RAM">RAM</option>
                <option value="SSD">SSD</option>
                <option value="HDD">HDD</option>
                <option value="GPU">GPU</option>
                <option value="SMPS">SMPS</option>
                <option value="Cabinet">Cabinet</option>
                <option value="Monitor">Monitor</option>
                <option value="IP Camera">IP Camera</option>
                <option value="NVR">NVR</option>
                <option value="DVR">DVR</option>
                <option value="Surveillance HDD">Surveillance HDD</option>
                <option value="PoE Switch">PoE Switch</option>
                <option value="Cable">Cable</option>
                <option value="Rack">Server / Network Rack</option>
                <option value="Printers & Inks">Printers & Inks</option>
                <option value="Networking">Networking</option>
                <option value="Keyboard and Mouse">Keyboard and Mouse</option>
                <option value="UPS">UPS</option>
                <option value="Electronics">Electronics</option>
              </select>
              
              <input required type="text" placeholder="Brand" value={formData.brand || ''} onChange={e=>setFormData({...formData, brand:e.target.value})} className="border p-2 rounded" />
              <input required type="number" placeholder="Selling Price (₹)" value={formData.price || ''} onChange={e=>setFormData({...formData, price:Number(e.target.value)})} className="border p-2 rounded" />
              <input required type="number" placeholder="Purchase Price (₹)" value={formData.purchasePrice || ''} onChange={e=>setFormData({...formData, purchasePrice:Number(e.target.value)})} className="border p-2 rounded" />
              <input required type="number" placeholder="Stock Quantity" value={formData.stock || ''} onChange={e=>setFormData({...formData, stock:Number(e.target.value)})} className="border p-2 rounded" />
              <input required type="number" placeholder="Min Stock Level" value={formData.minStock || ''} onChange={e=>setFormData({...formData, minStock:Number(e.target.value)})} className="border p-2 rounded" />
              <input required type="text" placeholder="Stock Unit (e.g., piece, metre)" value={formData.stockUnit || ''} onChange={e=>setFormData({...formData, stockUnit:e.target.value})} className="border p-2 rounded" />
              
              <div className="md:col-span-4">
                <textarea required placeholder="Product Description" value={formData.description || ''} onChange={e=>setFormData({...formData, description:e.target.value})} className="border p-2 rounded w-full" rows="2"></textarea>
              </div>

              <div className="md:col-span-3">
                 <input type="file" accept="image/*" onChange={handleImageUpload} className="border p-1 w-full rounded text-sm bg-slate-50" />
              </div>
              <div className="md:col-span-1 flex gap-2">
                <button type="submit" className="flex-1 bg-[#123B72] hover:bg-[#0b2447] text-white font-bold p-2 rounded transition-colors shadow-sm">
                  {editingId ? 'Update' : 'Save'} Product
                </button>
                {editingId && (
                  <button type="button" onClick={() => { setEditingId(null); setFormData({ name: '', sku: '', category: 'Computers', brand: '', description: '', price: 0, purchasePrice: 0, stock: 0, minStock: 2, stockUnit: 'piece', active: true, image: '' }); }} className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold p-2 rounded transition-colors shadow-sm">
                    Cancel
                  </button>
                )}
              </div>
             </form>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b">
                  <tr>
                    <th className="p-4 font-bold text-slate-700">Product</th>
                    <th className="p-4 font-bold text-slate-700">Category</th>
                    <th className="p-4 font-bold text-slate-700">Price</th>
                    <th className="p-4 font-bold text-slate-700">Stock</th>
                    <th className="p-4 font-bold text-slate-700 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} className="border-b last:border-0 hover:bg-slate-50">
                      <td className="p-4">
                        <div className="font-bold text-slate-900">{p.name}</div>
                        <div className="text-xs text-slate-500">SKU: {p.sku} | Brand: {p.brand}</div>
                      </td>
                      <td className="p-4 text-slate-600">{p.category}</td>
                      <td className="p-4 font-bold text-[#123B72]">₹{p.price.toLocaleString()}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold border ${p.stock > p.minStock ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : p.stock > 0 ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                          {p.stock} {p.stockUnit}
                        </span>
                      </td>
                      <td className="p-4 flex justify-center gap-2">
                        <button onClick={() => { setEditingId(p.id); setFormData(p); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="p-2 text-[#1677E8] hover:bg-blue-50 rounded transition-colors" title="Edit Product">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => { setProducts(products.filter(x => x.id !== p.id)); showNotification('Product deleted', 'success'); }} className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors" title="Delete Product">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {adminTab === 'orders' && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {selectedOrder ? (
            <div className="p-6 md:p-8" id="order-summary-pdf">
              <div className="flex justify-between items-center mb-6 print:hidden" data-html2canvas-ignore="true">
                <button onClick={() => setSelectedOrder(null)} className="font-bold text-[#1677E8]">← Back</button>
                <div className="flex gap-3">
                  <button 
                    onClick={() => sendWhatsAppMessage(selectedOrder.customer.phone, `Hello ${selectedOrder.customer.name}, your Arpanet Enterprise order ID is ${selectedOrder.id}. Total amount: ₹${selectedOrder.total.toLocaleString()}. Status: ${selectedOrder.status}. Thank you for shopping with us!`)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-sm shadow-sm"
                  >
                    💬 WhatsApp ID & Details
                  </button>
                  <button onClick={handlePrintOrder} className="bg-slate-100 px-4 py-2 rounded-lg font-bold border border-slate-200 flex items-center gap-2"><FileText size={16}/> 📄 Download PDF</button>
                </div>
              </div>
              <div className="bg-[#0b2447] text-white p-6 rounded-xl mb-6">
                 <h1 className="text-2xl font-black mb-1">ARPANET ENTERPRISE</h1>
                 <p className="text-blue-200 text-sm mb-4">Ground Floor, Balaji Plaza, Shankar Nagar, Bilaspur • GSTIN: 22FXEPD1770G1ZV</p>
                 <h3 className="font-bold text-lg border-t border-blue-800/50 pt-3">Order Value / Summary - #{selectedOrder.id}</h3>
              </div>
              <div className="mb-6 bg-slate-50 p-4 rounded border">
                <p><strong>Customer:</strong> {selectedOrder.customer?.name} ({selectedOrder.customer?.phone})</p>
                <p><strong>Address:</strong> {selectedOrder.customer?.address}</p>
              </div>
              <div className="space-y-2">
                {selectedOrder.items.map((i, idx) => (
                  <div key={idx} className="flex justify-between p-2 border-b">
                    <span>{i.name} (x{i.quantity})</span>
                    <span className="font-bold">₹{(i.price * i.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between p-2 text-xl font-black">
                  <span>Total</span><span>₹{selectedOrder.total.toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-8 print:hidden" data-html2canvas-ignore="true">
                {selectedOrder.status !== 'Delivered' && (
                  <button onClick={() => advanceOrder(selectedOrder.id, selectedOrder.status)} className="w-full bg-[#1677E8] text-white font-bold py-3 rounded-lg">Advance Status from {selectedOrder.status}</button>
                )}
              </div>
            </div>
          ) : (
             <div className="p-6">
                {orders.map(o => (
                  <div key={o.id} onClick={() => setSelectedOrder(o)} className="border p-4 rounded mb-4 cursor-pointer hover:bg-slate-50 flex justify-between items-center">
                    <div>
                      <div className="font-bold">{o.customer?.name} - {o.id}</div>
                      <div className="text-sm text-slate-500">Status: {o.status}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="font-bold text-[#123B72]">₹{o.total.toLocaleString()}</div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); sendWhatsAppMessage(o.customer.phone, `Hello ${o.customer.name}, your Arpanet Enterprise order ID is ${o.id}. Status: ${o.status}. Track it on our website anytime!`); }}
                        className="bg-emerald-50 text-emerald-700 p-2 rounded hover:bg-emerald-100 print:hidden"
                        title="Send WhatsApp"
                      >
                        💬
                      </button>
                    </div>
                  </div>
                ))}
             </div>
          )}
        </div>
      )}

      {adminTab === 'services' && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {selectedService ? (
            <div className="p-6 md:p-8" id="service-report-pdf">
              <div className="flex justify-between items-center mb-6 print:hidden" data-html2canvas-ignore="true">
                <button onClick={() => setSelectedService(null)} className="font-bold text-[#1677E8]">← Back</button>
                <div className="flex gap-3">
                  <button 
                    onClick={() => sendWhatsAppMessage(selectedService.phone, `Hello ${selectedService.name}, your Arpanet Enterprise Service Request ID is ${selectedService.id} (${selectedService.category}). Current Status: ${selectedService.status}.`)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-sm shadow-sm"
                  >
                    💬 WhatsApp Service ID
                  </button>
                  <button onClick={handlePrintService} className="bg-slate-100 px-4 py-2 rounded-lg font-bold border border-slate-200 flex items-center gap-2"><FileText size={16}/> 📄 Download PDF</button>
                </div>
              </div>
              <div className="bg-[#0b2447] text-white p-6 rounded-xl mb-6">
                 <h1 className="text-2xl font-black mb-1">ARPANET ENTERPRISE</h1>
                 <p className="text-blue-200 text-sm mb-4">Ground Floor, Balaji Plaza, Shankar Nagar, Bilaspur • GSTIN: 22FXEPD1770G1ZV</p>
                 <h3 className="font-bold text-lg border-t border-blue-800/50 pt-3">Service Report - #{selectedService.id}</h3>
              </div>
              <div className="mb-6 bg-slate-50 p-4 rounded border">
                <p><strong>Customer:</strong> {selectedService.name} ({selectedService.phone})</p>
                <p><strong>Issue:</strong> {selectedService.category} - {selectedService.description}</p>
              </div>

              {selectedService.status === 'Diagnosing' && (
                <div className="mt-6 print:hidden">
                  <label className="font-bold block mb-2">Diagnostic Report</label>
                  <textarea className="w-full border p-3 rounded" rows="3" value={selectedService.diagnosticReport || ''} onChange={(e) => setSelectedService({...selectedService, diagnosticReport: e.target.value})}></textarea>
                </div>
              )}
              {selectedService.status === 'Repairing' && (
                <div className="mt-6 print:hidden space-y-4">
                  <div><label className="font-bold block mb-2">Repair Report</label><textarea className="w-full border p-3 rounded" rows="3" value={selectedService.repairReport || ''} onChange={(e) => setSelectedService({...selectedService, repairReport: e.target.value})}></textarea></div>
                  <div><label className="font-bold block mb-2">Parts Used</label><textarea className="w-full border p-3 rounded" rows="2" value={selectedService.partsUsed || ''} onChange={(e) => setSelectedService({...selectedService, partsUsed: e.target.value})}></textarea></div>
                </div>
              )}

              {selectedService.diagnosticReport && <div className="mt-4"><h4 className="font-bold">Diagnostic Report</h4><p>{selectedService.diagnosticReport}</p></div>}
              {selectedService.repairReport && <div className="mt-4"><h4 className="font-bold">Repair Report</h4><p>{selectedService.repairReport}</p></div>}
              {selectedService.partsUsed && <div className="mt-4"><h4 className="font-bold">Parts Used</h4><p>{selectedService.partsUsed}</p></div>}

              <div className="mt-8 print:hidden" data-html2canvas-ignore="true">
                {selectedService.status !== 'Completed' && (
                  <button onClick={() => advanceService(selectedService.id, selectedService.status, { diagnosticReport: selectedService.diagnosticReport, repairReport: selectedService.repairReport, partsUsed: selectedService.partsUsed })} className="w-full bg-[#1677E8] text-white font-bold py-3 rounded-lg">Advance Status from {selectedService.status}</button>
                )}
              </div>
            </div>
          ) : (
             <div className="p-6">
                {serviceRequests.map(s => (
                  <div key={s.id} onClick={() => setSelectedService(s)} className="border p-4 rounded mb-4 cursor-pointer hover:bg-slate-50 flex justify-between items-center">
                    <div>
                      <div className="font-bold">{s.name} - {s.id}</div>
                      <div className="text-sm text-slate-500">{s.category} &bull; Status: {s.status}</div>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); sendWhatsAppMessage(s.phone, `Hello ${s.name}, your Arpanet Enterprise Service Request ID is ${s.id}. Status: ${s.status}.`); }}
                      className="bg-emerald-50 text-emerald-700 p-2 rounded hover:bg-emerald-100 print:hidden"
                      title="Send WhatsApp"
                    >
                      💬
                    </button>
                  </div>
                ))}
              </div>
          )}
        </div>
      )}
    </div>
  );
}

function TrackOrder({ orders, serviceRequests, showNotification }) {
  const [trackQuery, setTrackQuery] = useState('');
  const [trackedOrders, setTrackedOrders] = useState([]);
  const [trackedServices, setTrackedServices] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = trackQuery.trim();
    if (!query) return;

    const foundOrders = orders.filter(o => o.id === query || o.customer?.phone === query);
    const foundServices = serviceRequests.filter(s => s.id === query || s.phone === query);

    setTrackedOrders(foundOrders);
    setTrackedServices(foundServices);
    setHasSearched(true);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in">
      <div className="bg-[#123B72] text-white p-8 rounded-xl mb-8 shadow-md print:hidden">
        <h2 className="text-3xl font-black mb-2">Track Order & Services</h2>
        <p className="text-blue-200">Enter your Order ID, Service ID, or 10-digit Phone Number to check the real-time status.</p>
      </div>

      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-8 print:hidden">
        <input
          type="text"
          placeholder="Enter Order ID, Service ID, or Phone Number..."
          value={trackQuery}
          onChange={(e) => setTrackQuery(e.target.value)}
          className="flex-1 border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#1677E8] outline-none"
          required
        />
        <button type="submit" className="bg-[#1677E8] text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors shadow-md">
          Track
        </button>
      </form>

      {hasSearched && trackedOrders.length === 0 && trackedServices.length === 0 && (
        <div className="p-6 bg-red-50 text-red-700 rounded-lg border border-red-200 text-center font-bold">
          No orders or service requests found for "{trackQuery}". Please double-check the details.
        </div>
      )}

      {hasSearched && (trackedOrders.length > 0 || trackedServices.length > 0) && (
        <div className="space-y-8">
          {trackedOrders.map(order => (
            <div key={order.id} id={`customer-order-${order.id}`} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative">
              <div className="flex justify-between items-start mb-6 print:hidden">
                <div>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Product Order</p>
                  <p className="text-xl font-black text-[#123B72]">{order.id}</p>
                  <p className="text-sm text-slate-600">Total: ₹{order.total.toLocaleString()} • {order.items.length} items</p>
                </div>
                <button
                  onClick={() => downloadPDF(`customer-order-${order.id}`, `Invoice_${order.id}.pdf`, showNotification)}
                  className="text-[#1677E8] hover:text-blue-800 text-sm font-bold flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100 transition-colors shadow-sm"
                >
                  <Printer size={16} /> Download Invoice
                </button>
              </div>
              
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-200 z-10 my-8">
                {['Pending', 'Processing', 'Shipped', 'Delivered'].map((step, idx, arr) => {
                  const isActive = order.status === step;
                  const isPast = arr.indexOf(order.status) > idx;
                  const isComplete = order.status === 'Delivered';
                  return (
                    <div key={step} className="relative flex items-center justify-between">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 shrink-0 z-10 transition-all duration-300
                        ${isPast || (isComplete && step === 'Delivered') ? 'bg-emerald-500 border-emerald-100 text-white' : isActive ? 'bg-[#1677E8] border-blue-100 text-white scale-110' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
                        {isPast || (isComplete && step === 'Delivered') ? <Check size={18} strokeWidth={3} /> : idx + 1}
                      </div>
                      <div className={`w-[calc(100%-4rem)] p-4 rounded-xl border transition-all duration-300 ${isActive ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200'}`}>
                        <h4 className={`font-bold ${isActive ? 'text-[#1677E8]' : isPast ? 'text-emerald-600' : 'text-slate-500'}`}>{step}</h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {trackedServices.map(service => (
            <div key={service.id} id={`customer-service-${service.id}`} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative">
              <div className="flex justify-between items-start mb-6 print:hidden">
                <div>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Service & Repair</p>
                  <p className="text-xl font-black text-[#123B72]">{service.id}</p>
                  <p className="text-sm text-slate-600">{service.category}</p>
                </div>
                <button
                  onClick={() => downloadPDF(`customer-service-${service.id}`, `Report_${service.id}.pdf`, showNotification)}
                  className="text-[#1677E8] hover:text-blue-800 text-sm font-bold flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100 transition-colors shadow-sm"
                >
                  <Printer size={16} /> Download Report
                </button>
              </div>
              
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-200 z-10 my-8">
                {['Pending', 'Diagnosing', 'Repairing', 'Completed'].map((step, idx, arr) => {
                  const isActive = service.status === step;
                  const isPast = arr.indexOf(service.status) > idx;
                  const isComplete = service.status === 'Completed';
                  return (
                    <div key={step} className="relative flex items-center justify-between">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 shrink-0 z-10 transition-all duration-300
                        ${isPast || (isComplete && step === 'Completed') ? 'bg-emerald-500 border-emerald-100 text-white' : isActive ? 'bg-[#1677E8] border-blue-100 text-white scale-110' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
                        {isPast || (isComplete && step === 'Completed') ? <Check size={18} strokeWidth={3} /> : idx + 1}
                      </div>
                      <div className={`w-[calc(100%-4rem)] p-4 rounded-xl border transition-all duration-300 ${isActive ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200'}`}>
                        <h4 className={`font-bold ${isActive ? 'text-[#1677E8]' : isPast ? 'text-emerald-600' : 'text-slate-500'}`}>{step}</h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}