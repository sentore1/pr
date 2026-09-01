import { Header } from "@/components/header"
import { SimpleFooter } from "@/components/simple-footer"

export default function LegalPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Legal</h1>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Company Information</h2>
              <p className="text-gray-600 mb-4">
                Pryro is a registered business entity providing ERP and business automation solutions.
              </p>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <p className="text-gray-700"><strong>Company Name:</strong> Pryro</p>
                <p className="text-gray-700"><strong>Contact:</strong> +250 788 715 075</p>
                <p className="text-gray-700"><strong>Email:</strong> legal@pryro.co</p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Legal Documents</h2>
              <div className="space-y-4">
                <a href="/privacy" className="block p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 transition-colors">
                  <h3 className="text-lg font-medium text-gray-900">Privacy Notice</h3>
                  <p className="text-gray-600 text-sm">Learn how we collect, use, and protect your data</p>
                </a>
                <a href="/terms" className="block p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 transition-colors">
                  <h3 className="text-lg font-medium text-gray-900">Terms of Service</h3>
                  <p className="text-gray-600 text-sm">Our terms and conditions for using Pryro services</p>
                </a>
                <a href="/cookies" className="block p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 transition-colors">
                  <h3 className="text-lg font-medium text-gray-900">Cookie Policy</h3>
                  <p className="text-gray-600 text-sm">Information about cookies and tracking technologies</p>
                </a>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Compliance</h2>
              <p className="text-gray-600 mb-4">
                Pryro is committed to maintaining the highest standards of legal and regulatory compliance.
                We adhere to data protection laws and industry best practices to ensure your information
                is handled responsibly and securely.
              </p>
            </section>
          </div>
        </div>
      </main>
      <SimpleFooter />
    </>
  )
}
