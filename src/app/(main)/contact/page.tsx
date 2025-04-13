import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function ContactSection() {
  return (
    <section className="bg-black py-16 px-4 sm:px-6 lg:px-8 border-t-4 border-red-600">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl relative inline-block">
            <span className="relative z-10">HUBUNGI RIDERS</span>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-red-600 transform translate-y-1"></div>
          </h2>
          <p className="mt-6 text-lg text-gray-300">
            Jangan rapan-rapan, gas langsung kontak!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4 bg-gray-900 p-6 rounded-lg border-2 border-gray-800 hover:border-red-600 transition-all">
              <EnvelopeIcon className="h-10 w-10 text-red-600 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-red-600">EMAIL</h3>
                <p className="mt-1 text-gray-300 font-mono">crew@Ridersmotorclub.id</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-gray-900 p-6 rounded-lg border-2 border-gray-800 hover:border-red-600 transition-all">
              <PhoneIcon className="h-10 w-10 text-red-600 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-red-600">HOTLINE</h3>
                <p className="mt-1 text-gray-300 font-mono">+62 811 2233 4455</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-gray-900 p-6 rounded-lg border-2 border-gray-800 hover:border-red-600 transition-all">
              <MapPinIcon className="h-10 w-10 text-red-600 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-red-600">MARKAS BESAR</h3>
                <p className="mt-1 text-gray-300">
                  Jl. Raya Speedster No. 66<br/>
                  Kawasan Bikers Nest<br/>
                  Jawa Barat, Indonesia
                </p>
              </div>
            </div>
          </div>

          {/* Location Map */}
          <div className="bg-gray-900 rounded-lg shadow-2xl p-1 h-96 border-2 border-gray-800 relative">
            <div className="h-full w-full bg-gradient-to-br from-gray-800 to-black rounded-lg flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-pulse">
                    <MapPinIcon className="h-16 w-16 text-red-600 mx-auto mb-4" />
                  </div>
                  <p className="text-gray-400 font-bold uppercase text-sm tracking-wider">
                    Peta Markas Riders
                  </p>
                  <p className="text-gray-600 text-xs mt-2">
                    (Embed map disini)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Club Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center bg-red-600 px-6 py-3 rounded-full">
            <span className="text-black font-bold text-sm uppercase tracking-wider">
              🏍 Est. 1984 • Ride Hard, Die Legend 🏍
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}