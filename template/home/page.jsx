"use client"
import Link from "next/link"
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
} from "@/components/ui/icons"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-100 p-2 rounded-full">
                <Stethoscope className="h-6 w-6 text-emerald-600" />
              </div>
              <span className="text-xl font-bold text-gray-900">E-Konsulta</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
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
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Start Consultation</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Your AI Medical Assistant is <span className="text-emerald-600">Always Available</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Get instant medical guidance, symptom analysis, and health advice from our advanced AI assistant.
                Available 24/7 to help you understand your health concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/chat">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Start Free Consultation
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-8 py-4 text-lg"
                >
                  Learn More
                </Button>
              </div>
              <div className="mt-8 flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                  Free to use
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                  24/7 Available
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                  Instant responses
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md mx-auto">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-emerald-100 p-2 rounded-full">
                    <Stethoscope className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">AI Medical Assistant</h3>
                    <p className="text-sm text-gray-600">Online now</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-700">
                      Hello! I'm here to help with your health concerns. What symptoms are you experiencing?
                    </p>
                  </div>
                  <div className="bg-emerald-600 text-white rounded-lg p-3 ml-8">
                    <p className="text-sm">I've been having headaches for the past few days...</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-700">
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
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose E-Konsulta?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI medical assistant combines advanced technology with medical expertise to provide you with reliable
              health guidance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">24/7 Availability</h3>
                <p className="text-gray-600">
                  Get medical guidance anytime, anywhere. Our AI assistant is always ready to help with your health
                  concerns.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">AI-Powered Analysis</h3>
                <p className="text-gray-600">
                  Advanced AI technology analyzes your symptoms and provides personalized medical guidance and
                  recommendations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Safe & Secure</h3>
                <p className="text-gray-600">
                  Your health information is protected with enterprise-grade security. We prioritize your privacy and
                  confidentiality.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">For Everyone</h3>
                <p className="text-gray-600">
                  Designed for all users - from healthcare professionals to elderly patients. Simple, accessible
                  interface for everyone.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Comprehensive Care</h3>
                <p className="text-gray-600">
                  From symptom analysis to treatment suggestions, get comprehensive medical guidance for various health
                  conditions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Activity className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Instant Responses</h3>
                <p className="text-gray-600">
                  No waiting rooms or appointments. Get immediate responses to your health questions and concerns.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How E-Konsulta Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting medical guidance is simple and straightforward with our AI assistant.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-emerald-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Describe Your Symptoms</h3>
              <p className="text-gray-600">
                Start a conversation by describing your symptoms, health concerns, or medical questions in detail.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Analysis</h3>
              <p className="text-gray-600">
                Our AI assistant analyzes your symptoms and asks relevant follow-up questions to better understand your
                condition.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Get Guidance</h3>
              <p className="text-gray-600">
                Receive personalized medical guidance, potential causes, and recommendations for your next steps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Medical Guidance?</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Start your free consultation now and get instant access to AI-powered medical assistance.
          </p>
          <Link href="/chat">
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              Start Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-emerald-100 p-2 rounded-full">
                  <Stethoscope className="h-6 w-6 text-emerald-600" />
                </div>
                <span className="text-xl font-bold">E-Konsulta</span>
              </div>
              <p className="text-gray-400">
                Your trusted AI medical assistant providing 24/7 health guidance and support.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
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

            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
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

            <div>
              <h3 className="text-lg font-semibold mb-4">Important Notice</h3>
              <p className="text-gray-400 text-sm">
                This AI assistant provides general medical information only. Always consult qualified healthcare
                professionals for medical advice, diagnosis, or treatment.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 E-Konsulta. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
