export default function CountryCards() {
  return (
    <div className="grid grid-cols-2 gap-6 p-6">
      {/* Greece Card */}
      <div className="rounded-2xl shadow-md overflow-hidden border">
        <img
          src="https://images.unsplash.com/photo-1500315331616-db7e0f9e1b5e?auto=format&fit=crop&w=1200&q=80" // Athens image replacing Santorini
          alt="Athens, Greece"
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold">Greece</h2>
          <p className="text-gray-600">Athens</p>
        </div>
      </div>

      {/* Spain Card (renamed from Tarifa) */}
      <div className="rounded-2xl shadow-md overflow-hidden border">
        <img
          src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80"
          alt="Spain"
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold">Spain</h2>
          <p className="text-gray-600">Spain</p>
        </div>
      </div>
    </div>
  );
}
