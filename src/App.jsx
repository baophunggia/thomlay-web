import { Shield, Crosshair, User, CheckCircle2, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Routes, Route, useSearchParams, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

// ----------------------------------------------------
// TRANG 1: KHO VŨ KHÍ (Armory)
// ----------------------------------------------------
function ArmoryPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const BACKEND_URL = 'https://thomlaysystem.onrender.com';

  const handleEquipItem = async (item) => {
    setIsProcessing(true);
    try {
      // Nhớ đổi cổng 5085 thành cổng .NET thực tế của bạn
      const response = await fetch(`${BACKEND_URL}/api/Checkout/create-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          armoryItemId: item.id,
          itemName: item.name,
          priceInUsd: item.price
        })
      });

      if (!response.ok) throw new Error("Không thể kết nối đến kho vũ khí");
      const data = await response.json();
      if (data.url) window.location.href = data.url;
    } catch (error) {
      console.error(error);
      alert("Hệ thống gián đoạn, vui lòng thử lại sau.");
    } finally {
      setIsProcessing(false);
    }
  };

  const armoryItems = [
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      name: "Tinh dầu Lạc Thần",
      aura: "Aura Focus +50",
      price: 25.50
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6 pb-24">
      {/* Banner */}
      <div className="w-full h-32 rounded-xl bg-gradient-to-r from-thomlay-accent to-gray-800 border border-thomlay-gold/30 mb-6 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-cover bg-center"></div>
        <h2 className="text-xl font-bold tracking-widest text-thomlay-gold z-10 uppercase">
          Kho Trang Bị
        </h2>
      </div>

      {/* Danh sách Item */}
      <div className="grid grid-cols-1 gap-4">
        {armoryItems.map((item, index) => (
          <div key={index} className="bg-thomlay-accent/30 border border-gray-800 p-4 rounded-xl flex gap-4 items-center">
            <div className="w-16 h-16 bg-gray-800 rounded-lg flex-shrink-0 border border-thomlay-neon/30"></div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm">{item.name}</h3>
              <p className="text-xs text-gray-400 mt-1">{item.aura}</p>
              <div className="mt-2 text-thomlay-neon text-sm font-bold">${item.price.toFixed(2)}</div>
            </div>
            <button
              onClick={() => handleEquipItem(item)}
              disabled={isProcessing}
              className={`px-4 py-2 font-bold text-xs rounded-lg uppercase tracking-wider transition ${isProcessing ? 'bg-gray-500 text-gray-300' : 'bg-thomlay-gold text-thomlay-dark hover:bg-yellow-600'
                }`}
            >
              {isProcessing ? 'Đang tải...' : 'Trang bị'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// TRANG 2: MÀN HÌNH NHẬN VẬT PHẨM (Success)
// ----------------------------------------------------
function SuccessPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const navigate = useNavigate();

  // Kích hoạt hiệu ứng ngay khi trang được load thành công
  useEffect(() => {
    confetti({
      particleCount: 100,      // Số lượng mảnh vỡ vừa đủ, không làm nặng máy
      spread: 70,              // Độ văng
      origin: { y: 0.6 },      // Bắn từ giữa màn hình lên
      colors: ['#C5A880', '#45A29E', '#FFFFFF'], // Ép dùng tông màu Vàng Đồng, Xanh Neon và Trắng của Thomlay
      disableForReducedMotion: true // Tự động tắt nếu điện thoại user đang bật chế độ tiết kiệm pin/giảm hiệu ứng
    });
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 bg-thomlay-neon/20 rounded-full flex items-center justify-center mb-6 border border-thomlay-neon shadow-[0_0_30px_rgba(69,162,158,0.5)]">
        <CheckCircle2 className="w-12 h-12 text-thomlay-neon" />
      </div>

      <h2 className="text-2xl font-bold text-thomlay-gold tracking-widest uppercase mb-2">
        Trang Bị Thành Công
      </h2>
      <p className="text-gray-400 text-sm mb-8">
        Vật phẩm đang được chế tác tại cội nguồn và sẽ sớm được chuyển đến căn cứ của bạn.
      </p>

      <div className="bg-thomlay-accent/50 border border-gray-800 rounded-lg p-4 w-full mb-8">
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Mã Phiên Giao Dịch</p>
        <p className="text-xs text-thomlay-neon truncate font-mono">{sessionId}</p>
      </div>

      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 px-8 py-3 border border-thomlay-gold text-thomlay-gold rounded-full font-bold uppercase tracking-widest hover:bg-thomlay-gold hover:text-thomlay-dark transition"
      >
        Trở Về Kho Vũ Khí
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

// ----------------------------------------------------
// LAYOUT CHÍNH QUẢN LÝ ĐIỀU HƯỚNG
// ----------------------------------------------------
function App() {
  return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-thomlay-dark relative shadow-2xl overflow-hidden border-x border-thomlay-accent">

      {/* Header dùng chung */}
      <header className="px-6 py-4 border-b border-thomlay-accent/50 flex justify-between items-center bg-thomlay-dark/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-thomlay-gold/20 flex items-center justify-center border border-thomlay-gold/50">
            <User className="text-thomlay-gold w-6 h-6" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-wider">THOMLAY BASE</h1>
            <p className="text-xs text-thomlay-neon">Cấp độ: Khởi nguyên</p>
          </div>
        </div>
      </header>

      {/* Quản lý các Route */}
      <Routes>
        <Route path="/" element={<ArmoryPage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>

      {/* Bottom Nav dùng chung */}
      <nav className="absolute bottom-0 w-full bg-thomlay-dark border-t border-thomlay-accent px-6 py-4 flex justify-between items-center z-10">
        <button className="flex flex-col items-center gap-1 text-thomlay-gold">
          <Shield className="w-6 h-6" />
          <span className="text-[10px] uppercase font-bold tracking-widest">Armory</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-white transition">
          <Crosshair className="w-6 h-6" />
          <span className="text-[10px] uppercase tracking-widest">Missions</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-white transition">
          <User className="w-6 h-6" />
          <span className="text-[10px] uppercase tracking-widest">Profile</span>
        </button>
      </nav>

    </div>
  );
}

export default App;