"use client"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Stethoscope,
  MessageCircle,
  Clock,
  Shield,
  Users,
  CheckCircle,
  ArrowRight,
  Heart,
  Brain,
  Activity,
  Menu,
  X,
} from "@/components/ui/icons"

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="bg-emerald-100 p-1.5 sm:p-2 rounded-full flex items-center justify-center">
                <Stethoscope className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-gray-900">E-Konsulta</span>
            </div>
            <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
              <a href="#features" className="text-gray-600 hover:text-emerald-600 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-emerald-600 transition-colors">
                How It Works
              </a>
              <a href="#about" className="text-gray-600 hover:text-emerald-600 transition-colors">
                About
              </a>
              <Link href="/chat">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white whitespace-nowrap">Start Consultation</Button>
              </Link>
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 hover:text-emerald-600 focus:outline-none p-1 touch-target"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg absolute w-full z-50 max-h-[90vh] overflow-y-auto">
            <div className="px-2 pt-2 pb-4 space-y-1">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
              >
                How It Works
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
              >
                About
              </a>
              <Link 
                href="/chat"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full"
              >
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full">Start Consultation</Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-10 sm:py-12 md:py-16 lg:py-20 flex-grow-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            <div className="px-0 sm:px-2 md:px-4">
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6">
                Your AI Medical Assistant is <span className="text-emerald-600">Always Available</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Get instant medical guidance, symptom analysis, and health advice from our advanced AI assistant.
                Available 24/7 to help you understand your health concerns.
              </p>
              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
                <Link href="/chat" className="w-full xs:w-auto">
                  <Button 
                    size="lg" 
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg shadow-md w-full xs:w-auto"
                  >
                    <MessageCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                    <span className="whitespace-nowrap">Start Free Consultation</span>
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg w-full xs:w-auto"
                >
                  Learn More
                </Button>
              </div>
              <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-y-2 gap-x-4 sm:gap-x-6 text-xs sm:text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-500 mr-1.5 sm:mr-2 flex-shrink-0" />
                  Free to use
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-500 mr-1.5 sm:mr-2 flex-shrink-0" />
                  24/7 Available
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-500 mr-1.5 sm:mr-2 flex-shrink-0" />
                  Instant responses
                </div>
              </div>
            </div>
            <div className="relative mt-6 sm:mt-8 lg:mt-0 px-2 sm:px-6 md:px-10 lg:px-4 xl:px-10">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl md:shadow-2xl p-4 sm:p-5 md:p-6 max-w-sm xs:max-w-md mx-auto">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                  <div className="bg-emerald-100 p-1.5 sm:p-2 rounded-full flex items-center justify-center">
                    <Stethoscope className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">AI Medical Assistant</h3>
                    <p className="text-xs sm:text-sm text-gray-600">Online now</p>
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <div className="bg-gray-50 rounded-lg p-2.5 sm:p-3">
                    <p className="text-xs sm:text-sm text-gray-700">
                      Hello! I'm here to help with your health concerns. What symptoms are you experiencing?
                    </p>
                  </div>
                  <div className="bg-emerald-600 text-white rounded-lg p-2.5 sm:p-3 ml-6 sm:ml-8">
                    <p className="text-xs sm:text-sm">I've been having headaches for the past few days...</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2.5 sm:p-3">
                    <p className="text-xs sm:text-sm text-gray-700">
                      I'd like to ask a few questions to better understand your condition...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-14 md:py-16 lg:py-20 bg-white flex-grow-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <h2 className="text-2xl xs:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Why Choose E-Konsulta?</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI medical assistant combines advanced technology with medical expertise to provide you with reliable
              health guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            <Card className="border-0 shadow-md hover:shadow-lg sm:shadow-lg sm:hover:shadow-xl transition-shadow">
              <CardContent className="p-4 sm:p-5 md:p-6 lg:p-8 text-center h-full flex flex-col">
                <div className="bg-emerald-100 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6 flex-shrink-0">
                  <Clock className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-emerald-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 md:mb-4">24/7 Availability</h3>
                <p className="text-sm sm:text-base text-gray-600 flex-grow">
                  Get medical guidance anytime, anywhere. Our AI assistant is always ready to help with your health
                  concerns.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg sm:shadow-lg sm:hover:shadow-xl transition-shadow">
              <CardContent className="p-4 sm:p-5 md:p-6 lg:p-8 text-center h-full flex flex-col">
                <div className="bg-emerald-100 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6 flex-shrink-0">
                  <Brain className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-emerald-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 md:mb-4">AI-Powered Analysis</h3>
                <p className="text-sm sm:text-base text-gray-600 flex-grow">
                  Advanced AI technology analyzes your symptoms and provides personalized medical guidance and
                  recommendations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg sm:shadow-lg sm:hover:shadow-xl transition-shadow">
              <CardContent className="p-4 sm:p-5 md:p-6 lg:p-8 text-center h-full flex flex-col">
                <div className="bg-emerald-100 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6 flex-shrink-0">
                  <Shield className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-emerald-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 md:mb-4">Safe & Secure</h3>
                <p className="text-sm sm:text-base text-gray-600 flex-grow">
                  Your health information is protected with enterprise-grade security. We prioritize your privacy and
                  confidentiality.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg sm:shadow-lg sm:hover:shadow-xl transition-shadow">
              <CardContent className="p-4 sm:p-5 md:p-6 lg:p-8 text-center h-full flex flex-col">
                <div className="bg-emerald-100 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6 flex-shrink-0">
                  <Users className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-emerald-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 md:mb-4">For Everyone</h3>
                <p className="text-sm sm:text-base text-gray-600 flex-grow">
                  Designed for all users - from healthcare professionals to elderly patients. Simple, accessible
                  interface for everyone.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg sm:shadow-lg sm:hover:shadow-xl transition-shadow">
              <CardContent className="p-4 sm:p-5 md:p-6 lg:p-8 text-center h-full flex flex-col">
                <div className="bg-emerald-100 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6 flex-shrink-0">
                  <Heart className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-emerald-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 md:mb-4">Comprehensive Care</h3>
                <p className="text-sm sm:text-base text-gray-600 flex-grow">
                  From symptom analysis to treatment suggestions, get comprehensive medical guidance for various health
                  conditions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg sm:shadow-lg sm:hover:shadow-xl transition-shadow">
              <CardContent className="p-4 sm:p-5 md:p-6 lg:p-8 text-center h-full flex flex-col">
                <div className="bg-emerald-100 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6 flex-shrink-0">
                  <Activity className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-emerald-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 md:mb-4">Instant Responses</h3>
                <p className="text-sm sm:text-base text-gray-600 flex-grow">
                  No waiting rooms or appointments. Get immediate responses to your health questions and concerns.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-12 sm:py-14 md:py-16 lg:py-20 bg-gradient-to-br from-emerald-50 to-teal-50 flex-grow-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <h2 className="text-2xl xs:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">How E-Konsulta Works</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Getting medical guidance is simple and straightforward with our AI assistant.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-md h-full flex flex-col">
              <div className="bg-emerald-600 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-lg sm:text-xl font-bold flex-shrink-0">
                1
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-4">Describe Your Symptoms</h3>
              <p className="text-sm sm:text-base text-gray-600 flex-grow">
                Start a conversation by describing your symptoms, health concerns, or medical questions in detail.
              </p>
            </div>

            <div className="text-center bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-md h-full flex flex-col">
              <div className="bg-emerald-600 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-lg sm:text-xl font-bold flex-shrink-0">
                2
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-4">AI Analysis</h3>
              <p className="text-sm sm:text-base text-gray-600 flex-grow">
                Our AI assistant analyzes your symptoms and asks relevant follow-up questions to better understand your
                condition.
              </p>
            </div>

            <div className="text-center bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-md sm:col-span-2 md:col-span-1 sm:max-w-md md:max-w-none mx-auto sm:mx-auto md:mx-0 h-full flex flex-col">
              <div className="bg-emerald-600 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-lg sm:text-xl font-bold flex-shrink-0">
                3
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-4">Get Guidance</h3>
              <p className="text-sm sm:text-base text-gray-600 flex-grow">
                Receive personalized medical guidance, potential causes, and recommendations for your next steps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="about" className="py-12 sm:py-14 md:py-16 lg:py-20 bg-emerald-600 flex-grow-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Ready to Get Medical Guidance?</h2>
          <p className="text-base sm:text-lg md:text-xl text-emerald-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Start your free consultation now and get instant access to AI-powered medical assistance.
          </p>
          <Link href="/chat" className="inline-block w-full xs:w-auto">
            <Button 
              size="lg" 
              className="bg-white hover:bg-gray-50 text-emerald-800 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold shadow-md sm:shadow-lg hover:shadow-xl transition-all transform hover:scale-105 rounded-lg sm:rounded-xl border-2 sm:border-4 border-emerald-500 w-full xs:w-auto"
            >
              Start Free Consultation
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-10 md:py-12 flex-grow-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <div className="bg-emerald-100 p-1.5 sm:p-2 rounded-full flex items-center justify-center">
                  <Stethoscope className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
                </div>
                <span className="text-lg sm:text-xl font-bold">E-Konsulta</span>
              </div>
              <p className="text-gray-400 text-sm sm:text-base">
                Your trusted AI medical assistant providing 24/7 health guidance and support.
              </p>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">Quick Links</h3>
              <ul className="space-y-1 sm:space-y-2 text-gray-400 text-sm sm:text-base">
                <li>
                  <a href="#features" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-white transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <Link href="/chat" className="hover:text-white transition-colors">
                    Start Consultation
                  </Link>
                </li>
              </ul>
            </div>

            <div className="xs:col-span-2 md:col-span-1">
              <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">Support</h3>
              <ul className="space-y-1 sm:space-y-2 text-gray-400 text-sm sm:text-base">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            <div className="xs:col-span-2 md:col-span-1">
              <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">Important Notice</h3>
              <p className="text-gray-400 text-xs sm:text-sm">
                This AI assistant provides general medical information only. Always consult qualified healthcare
                professionals for medical advice, diagnosis, or treatment.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400 text-xs sm:text-sm">
            <p>&copy; 2024 E-Konsulta. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 