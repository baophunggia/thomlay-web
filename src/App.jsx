import { 
  CheckSquare, 
  ShoppingBag, 
  MonitorPlay, 
  Zap, 
  LogOut, 
  ChevronRight, 
  Download,
  Flame
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Routes, Route, useSearchParams, useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';

// --- SHARED NEO-BRUTALISM STYLES (Chỉ dùng Vàng và Be) ---
const theme = {
  bg: "bg-[#FFFBF2]", // Màu nền be sáng giống itkotoba
  card: "bg-white border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000000]",
  button: "bg-[#FFD800] border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000000] font-bold text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2",
  buttonSecondary: "bg-white border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000000] font-bold text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2",
};

// ----------------------------------------------------
// PAGE 1: STOREFRONT 
// ----------------------------------------------------
function StorefrontPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const BACKEND_URL = 'https://thomlaysystem.onrender.com';

  const handleCheckout = async (item) => {
    setIsProcessing(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/Checkout/create-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          armoryItemId: item.id,
          itemName: item.name,
          priceInUsd: item.price
        })
      });

      if (!response.ok) throw new Error("Connection failed");
      const data = await response.json();
      if (data.url) window.location.href = data.url;
    } catch (error) {
      console.error(error);
      alert("Store is currently busy. Please try again later.");
    } finally {
      setIsProcessing(false);
    }
  };

  const digitalProducts = [
    {
      id: "overlay-01",
      name: "Cyberpunk HUD Overlay",
      category: "OBS / Streamlabs",
      price: 15.00,
      imageUrl: "https://placehold.co/600x338/FFD800/000000?text=Cyberpunk+HUD&font=Montserrat"
    },
    {
      id: "alert-01",
      name: "Pop-Art Twitch Alerts",
      category: "Animated Graphics",
      price: 12.50,
      imageUrl: "https://placehold.co/600x338/E5E7EB/000000?text=Pop-Art+Alerts&font=Montserrat"
    },
    {
      id: "template-01",
      name: "TikTok Highlight Frame",
      category: "CapCut Template",
      price: 9.99,
      imageUrl: "https://placehold.co/600x338/000000/FFFFFF?text=TikTok+Frame&font=Montserrat"
    }
  ];

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      
      {/* HEADER SECTION (Khối Hero màu trắng tinh, nổi bật trên nền be) */}
      <div className={`${theme.card} p-8 md:p-12 mb-10`}>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFD800] border-2 border-black rounded-full text-xs font-bold mb-6 shadow-[2px_2px_0_0_#000]">
          <Flame className="w-4 h-4 text-black" />
          Level up your stream
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
          Upgrade your setup <br/>in 3 clicks.
        </h1>
        
        <p className="text-lg font-medium text-gray-700 mb-8 max-w-2xl">
          We craft plug-and-play digital assets for creators. Zero lag, full 1080p60fps optimization.
        </p>

        <button className={`${theme.button} py-4 px-8 inline-flex w-auto text-lg`}>
          Explore Assets
        </button>
      </div>

      {/* PRODUCTS GRID */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black flex items-center gap-2">
          <Zap className="w-6 h-6 text-[#FFD800] drop-shadow-[1px_1px_0_#000]" /> Fresh Drops
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {digitalProducts.map((item) => (
          <div key={item.id} className={`${theme.card} flex flex-col overflow-hidden bg-white hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000000] transition-all`}>
            {/* Image */}
            <div className="border-b-2 border-black">
              <img src={item.imageUrl} alt={item.name} className="w-full aspect-video object-cover" />
            </div>
            
            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">
                {item.category}
              </span>
              <h3 className="text-xl font-black mb-4">{item.name}</h3>
              
              <div className="mt-auto flex items-center justify-between gap-4">
                <span className="text-2xl font-black">${item.price.toFixed(2)}</span>
                <button
                  onClick={() => handleCheckout(item)}
                  disabled={isProcessing}
                  className={`${theme.button} py-3 px-6 flex-1 text-sm`}
                >
                  {isProcessing ? 'Loading...' : 'Get It Now'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// PAGE 2: SUCCESS PAGE
// ----------------------------------------------------
function SuccessPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id') || 'DEMO-SESSION-123';
  const navigate = useNavigate();

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD800', '#FFFFFF', '#000000'], // Chỉ dùng Vàng, Trắng, Đen
      disableForReducedMotion: true
    });
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center min-h-screen">
      <div className={`${theme.card} p-10 max-w-lg w-full flex flex-col items-center bg-white`}>
        <div className="w-20 h-20 bg-[#FFD800] border-2 border-black rounded-full flex items-center justify-center mb-6 shadow-[4px_4px_0_0_#000]">
          <CheckSquare className="w-10 h-10 text-black" />
        </div>

        <h2 className="text-3xl font-black mb-2">Payment Secured!</h2>
        <p className="font-medium text-gray-600 mb-8">
          Thanks for choosing Thomlay. Your high-res files are waiting in your inbox.
        </p>

        <div className="w-full bg-[#FFFBF2] border-2 border-black rounded-lg p-4 mb-8 text-left">
          <p className="text-xs font-bold uppercase text-gray-500 mb-1">Order ID</p>
          <p className="text-sm font-mono font-bold truncate">{sessionId}</p>
        </div>

        <div className="flex flex-col w-full gap-4">
          <button
            onClick={() => window.open('https://mail.google.com', '_blank')}
            className={`${theme.button} py-4`}
          >
            <Download className="w-5 h-5" /> Open Email
          </button>
          <button
            onClick={() => navigate('/')}
            className={`${theme.buttonSecondary} py-4`}
          >
            Back to Store <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// MAIN LAYOUT (Sidebar + Main Content)
// ----------------------------------------------------
function App() {
  // CSS cho hình lưới nhạt dưới nền (Graph paper effect)
  const gridBackground = {
    backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)`,
    backgroundSize: '32px 32px'
  };

  return (
    <div className={`min-h-screen flex text-black font-sans ${theme.bg}`} style={gridBackground}>
      
      {/* SIDEBAR (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 border-r-2 border-black bg-white sticky top-0 h-screen z-10">
        <div className="p-6 border-b-2 border-black flex items-center gap-2">
          {/* Logo góc trái */}
          <div className="bg-black text-[#FFD800] px-2 py-1 font-black text-xl rounded">
            TL
          </div>
          <Link to="/" className="text-2xl font-black tracking-tighter">
            THOMLAY
          </Link>
        </div>
        
        <nav className="flex-1 flex flex-col gap-2 p-6">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Store</p>
          
          {/* Active Menu Item */}
          <Link to="/" className="flex items-center gap-3 px-4 py-3 bg-[#FFD800] border-2 border-black rounded-xl shadow-[2px_2px_0_0_#000] font-bold mb-2 transition-transform hover:translate-x-1">
            <ShoppingBag className="w-5 h-5" /> Overlays
          </Link>
          
          {/* Inactive Menu Item */}
          <button className="flex items-center gap-3 px-4 py-3 font-bold text-gray-600 hover:text-black hover:bg-gray-100 rounded-xl transition-colors w-full text-left">
            <MonitorPlay className="w-5 h-5" /> Templates
          </button>
        </nav>

        <div className="p-6 border-t-2 border-black">
          <button className="flex items-center gap-3 font-bold text-gray-600 hover:text-black transition-colors w-full">
            <LogOut className="w-5 h-5" /> Log out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 w-full relative">
        
        {/* MOBILE HEADER */}
        <header className="md:hidden border-b-2 border-black bg-white p-4 flex justify-between items-center sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <div className="bg-black text-[#FFD800] px-2 py-1 font-black text-sm rounded">
              TL<span className="text-white">/&gt;</span>
            </div>
            <Link to="/" className="text-xl font-black tracking-tighter">
              THOMLAY
            </Link>
          </div>
          <button className="p-2 bg-[#FFD800] border-2 border-black rounded-lg shadow-[2px_2px_0_0_#000]">
            <ShoppingBag className="w-5 h-5" />
          </button>
        </header>

        <Routes>
          <Route path="/" element={<StorefrontPage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </main>

    </div>
  );
}

export default App;