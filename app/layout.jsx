import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata = {
  title: 'SHAWO SUEDE',
  description: 'Sessiz lüks — sınırlı üretim süet parçalar',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({ children }){
  return (
    <html lang="tr">
      <body className="bg-cream text-gray-900 antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
