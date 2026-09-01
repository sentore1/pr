import { Header } from "@/components/header"
import { SimpleFooter } from "@/components/simple-footer"

export default function AccessibilityPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Accessibility</h1>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Commitment</h2>
              <p className="text-gray-600 mb-4">
                Pryro is committed to ensuring digital accessibility for people with disabilities. We are
                continually improving the user experience for everyone and applying relevant accessibility
                standards.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Accessibility Features</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Keyboard Navigation</h3>
                  <p className="text-gray-600">Our platform supports full keyboard navigation for users who cannot use a mouse.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Screen Reader Compatible</h3>
                  <p className="text-gray-600">We use semantic HTML and ARIA labels to ensure compatibility with screen readers.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Color Contrast</h3>
                  <p className="text-gray-600">Our design maintains sufficient color contrast ratios for readability.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Responsive Design</h3>
                  <p className="text-gray-600">Our interface adapts to different screen sizes and zoom levels.</p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Standards Conformance</h2>
              <p className="text-gray-600 mb-4">
                We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.
                These guidelines explain how to make web content more accessible for people with disabilities.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Feedback</h2>
              <p className="text-gray-600 mb-4">
                We welcome your feedback on the accessibility of Pryro. If you encounter any accessibility
                barriers, please let us know:
              </p>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <p className="text-gray-700"><strong>Email:</strong> accessibility@pryro.co</p>
                <p className="text-gray-700"><strong>Phone:</strong> +250 788 715 075</p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Continuous Improvement</h2>
              <p className="text-gray-600">
                We regularly review our accessibility practices and work to improve the experience for all
                users. Our development team receives training on accessibility best practices and we conduct
                regular audits of our platform.
              </p>
            </section>
          </div>
        </div>
      </main>
      <SimpleFooter />
    </>
  )
}
