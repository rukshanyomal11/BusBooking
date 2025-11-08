import React, { useState } from "react";
import emailjs from '@emailjs/browser';
import Sidebar from "../../components/user/Sidebar";
import { emailjsConfig } from "../../config/emailjs";

const HelpPage = () => {
  const [activeTab, setActiveTab] = useState("faq");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const faqs = [
    {
      id: 1,
      category: "booking",
      question: "How do I book a bus ticket?",
      answer: "To book a bus ticket, go to the Booking page from your dashboard, select your departure and destination cities, choose your preferred date and time, select available seats, and complete the payment process."
    },
    {
      id: 2,
      category: "booking",
      question: "Can I cancel my booking?",
      answer: "Yes, you can cancel your booking up to 2 hours before departure. Go to the Response page to view your bookings and click the cancel button. Refund will be processed within 3-5 business days."
    },
    {
      id: 3,
      category: "payment",
      question: "What payment methods are accepted?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, and digital wallets like PayPal and Apple Pay."
    },
    {
      id: 4,
      category: "account",
      question: "How do I update my profile information?",
      answer: "Go to the Accounts page from your dashboard, click on 'Edit Profile', update your information, and save the changes. You can update your name, email, phone number, and password."
    },
    {
      id: 5,
      category: "booking",
      question: "What happens if my bus is delayed?",
      answer: "In case of delays, you will be notified via SMS and email. For delays over 2 hours, you're eligible for a full refund or free rebooking to another available service."
    },
    {
      id: 6,
      category: "payment",
      question: "How do I get a refund?",
      answer: "Refunds are automatically processed when you cancel a booking. The amount will be credited back to your original payment method within 3-5 business days."
    },
    {
      id: 7,
      category: "account",
      question: "I forgot my password. How do I reset it?",
      answer: "Click on 'Forgot Password' on the login page, enter your email address, and follow the instructions sent to your email to reset your password."
    },
    {
      id: 8,
      category: "booking",
      question: "Can I change my seat after booking?",
      answer: "Yes, you can change your seat up to 4 hours before departure, subject to availability. Additional charges may apply for premium seats."
    }
  ];

  const quickGuides = [
    {
      title: "How to Book a Bus",
      steps: [
        "Navigate to the Booking page",
        "Select departure and destination cities",
        "Choose your travel date",
        "Select available seats",
        "Fill in passenger details",
        "Complete payment",
        "Receive confirmation email"
      ]
    },
    {
      title: "How to Cancel a Booking",
      steps: [
        "Go to Response page",
        "Find your booking",
        "Click 'Cancel' button",
        "Confirm cancellation",
        "Receive refund confirmation"
      ]
    },
    {
      title: "How to Update Account Info",
      steps: [
        "Visit Accounts page",
        "Click 'Edit Profile'",
        "Update your information",
        "Save changes",
        "Verify via email if needed"
      ]
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Initialize EmailJS (you only need to do this once in your app)
      emailjs.init(emailjsConfig.publicKey);

      // Prepare the template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: "Bus Booking Support Team",
        reply_to: formData.email
      };

      // Send the email
      const result = await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        templateParams
      );

      console.log('Email sent successfully:', result);
      setSubmitStatus('success');
      setFormData({ name: "", email: "", message: "" });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);

    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-indigo-700 mb-2">Help Center</h1>
          <p className="text-gray-600">Find answers to your questions or contact our support team</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search for help..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <div className="absolute left-3 top-3.5">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-white rounded-lg p-1 shadow-sm max-w-2xl">
          {[
            { key: "faq", label: "📋 FAQ", icon: "📋" },
            { key: "guides", label: "📖 Quick Guides", icon: "📖" },
            { key: "contact", label: "📞 Contact", icon: "📞" },
            { key: "resources", label: "📚 Resources", icon: "📚" }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab.key
                  ? "bg-indigo-500 text-white shadow-md"
                  : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* FAQ Tab */}
        {activeTab === "faq" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No FAQs found matching your search.</p>
              </div>
            ) : (
              filteredFaqs.map((faq) => (
                <div key={faq.id} className="bg-white rounded-lg shadow-sm border">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left p-4 hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center"
                  >
                    <span className="font-medium text-gray-800 pr-4">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                        expandedFaq === faq.id ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="px-4 pb-4 text-gray-600 border-t bg-gray-50">
                      <p className="pt-4">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Quick Guides Tab */}
        {activeTab === "guides" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Help Guides</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickGuides.map((guide, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-indigo-700 mb-4">{guide.title}</h3>
                  <ol className="space-y-2">
                    {guide.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start">
                        <span className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                          {stepIndex + 1}
                        </span>
                        <span className="text-sm text-gray-600">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === "contact" && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-indigo-100 p-2 rounded-full mr-4">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Phone Support</p>
                    <p className="text-indigo-600">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500">Available 24/7</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-indigo-100 p-2 rounded-full mr-4">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Email Support</p>
                    <p className="text-indigo-600">support@busbooking.com</p>
                    <p className="text-sm text-gray-500">Response within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-indigo-100 p-2 rounded-full mr-4">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Office Hours</p>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Saturday - Sunday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send us a Message</h2>
              
              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-green-700 font-medium">Message sent successfully!</p>
                  </div>
                  <p className="text-green-600 text-sm mt-1">We'll get back to you within 24 hours.</p>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <p className="text-red-700 font-medium">Failed to send message</p>
                  </div>
                  <p className="text-red-600 text-sm mt-1">Please try again or contact us directly at support@busbooking.com</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Your Message</label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    placeholder="Type your message here..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium disabled:bg-indigo-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === "resources" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Helpful Resources</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="font-semibold text-indigo-700 mb-4">📄 Important Documents</h3>
                <div className="space-y-3">
                  <a href="#" className="block p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
                    <div className="font-medium text-gray-800">Terms of Service</div>
                    <div className="text-sm text-gray-600">Read our terms and conditions</div>
                  </a>
                  <a href="#" className="block p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
                    <div className="font-medium text-gray-800">Privacy Policy</div>
                    <div className="text-sm text-gray-600">How we protect your data</div>
                  </a>
                  <a href="#" className="block p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
                    <div className="font-medium text-gray-800">Refund Policy</div>
                    <div className="text-sm text-gray-600">Understanding refunds and cancellations</div>
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="font-semibold text-indigo-700 mb-4">🛠️ Technical Support</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-gray-800">System Requirements</div>
                    <div className="text-sm text-gray-600">Modern web browser with JavaScript enabled</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-gray-800">Supported Browsers</div>
                    <div className="text-sm text-gray-600">Chrome, Firefox, Safari, Edge (latest versions)</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-gray-800">Mobile App</div>
                    <div className="text-sm text-gray-600">Coming soon for iOS and Android</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Live Chat Button */}
        <button
          onClick={() => setShowLiveChat(true)}
          className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-200 hover:scale-105"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>

        {/* Live Chat Modal */}
        {showLiveChat && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Live Chat Support</h3>
                <button
                  onClick={() => setShowLiveChat(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-600 mb-2">Hi! 👋 How can we help you today?</p>
                <p className="text-xs text-gray-500">Our support team is available 24/7 to assist you.</p>
              </div>
              <div className="space-y-2">
                <button className="w-full text-left p-3 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-sm transition-colors">
                  💳 I have a payment issue
                </button>
                <button className="w-full text-left p-3 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-sm transition-colors">
                  🎫 I need help with my booking
                </button>
                <button className="w-full text-left p-3 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-sm transition-colors">
                  👤 Account related question
                </button>
                <button className="w-full text-left p-3 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-sm transition-colors">
                  ❓ Other questions
                </button>
              </div>
              <p className="text-xs text-gray-500 text-center mt-4">
                Click any option above to start chatting with our support team
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpPage;
