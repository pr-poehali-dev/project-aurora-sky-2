import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] bg-black/95 backdrop-blur-md border-b border-blue-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center gap-3">
            <img
              src="https://cdn.poehali.dev/projects/30cfddc5-5f5b-471d-ac78-f3b4cdcb7dd8/bucket/6521f578-3ede-42a9-9b75-5359b2546230.jpg"
              alt="Panda Vape"
              className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-500/40"
            />
            <h1 className="font-orbitron text-xl font-bold text-white">
              PANDA<span className="text-blue-500">VAPE</span>
            </h1>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#flavors" className="font-geist text-white hover:text-blue-500 transition-colors duration-200">
                Вкусы
              </a>
              <a href="#safety" className="font-geist text-white hover:text-blue-500 transition-colors duration-200">
                Состав
              </a>
              <a href="#faq" className="font-geist text-white hover:text-blue-500 transition-colors duration-200">
                Вопросы
              </a>
            </div>
          </div>

          <div className="hidden md:block">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white font-geist border-0">Купить сейчас</Button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-blue-500 transition-colors duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/98 border-t border-blue-500/20">
              <a
                href="#flavors"
                className="block px-3 py-2 font-geist text-white hover:text-blue-500 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Вкусы
              </a>
              <a
                href="#safety"
                className="block px-3 py-2 font-geist text-white hover:text-blue-500 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Состав
              </a>
              <a
                href="#faq"
                className="block px-3 py-2 font-geist text-white hover:text-blue-500 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Вопросы
              </a>
              <div className="px-3 py-2">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-geist border-0">
                  Купить сейчас
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
