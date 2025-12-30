import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
        <p className="text-slate-500 mb-12">Last updated: January 1, 2024</p>

        <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-headings:font-bold prose-p:text-slate-600 prose-a:text-brand-600">
          
          <h3>1. Introduction</h3>
          <p>
            Welcome to IsukuHub ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and website.
          </p>

          <h3>2. Information We Collect</h3>
          <p>We collect personal information that you voluntarily provide to us when you register on the application, express an interest in obtaining information about us or our products and services, or otherwise when you contact us.</p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600 mb-6">
            <li><strong>Personal Data:</strong> Name, shipping address, email address, and telephone number.</li>
            <li><strong>Geolocation Data:</strong> We may request access or permission to and track location-based information from your mobile device to provide location-based services (like pickup routing and illegal dumping reporting).</li>
            <li><strong>Payment Data:</strong> Data necessary to process your payment if you make purchases, such as your payment instrument number (such as a credit card number or Mobile Money number).</li>
          </ul>

          <h3>3. How We Use Your Information</h3>
          <p>We use personal information collected via our app for a variety of business purposes described below:</p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600 mb-6">
            <li>To facilitate account creation and logon process.</li>
            <li>To send you administrative information, such as pickup reminders or changes to our terms.</li>
            <li>To fulfill and manage your orders and subscriptions.</li>
            <li>To request feedback and contact you about your use of our application.</li>
            <li>To enforce our terms, conditions, and policies.</li>
          </ul>

          <h3>4. Sharing Your Information</h3>
          <p>We may process or share your data that we hold based on the following legal basis:</p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600 mb-6">
             <li><strong>Consent:</strong> We may process your data if you have given us specific consent to use your personal information for a specific purpose.</li>
             <li><strong>Legitimate Interests:</strong> We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
             <li><strong>Legal Obligations:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, or a judicial proceeding.</li>
          </ul>

          <h3>5. Data Retention</h3>
          <p>
            We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law.
          </p>

          <h3>6. Contact Us</h3>
          <p>
            If you have questions or comments about this policy, you may email us at privacy@isukuhub.rw or by post to:
          </p>
          <address className="not-italic text-slate-600 mt-4 border-l-4 border-brand-200 pl-4">
            IsukuHub Ltd.<br />
            742 KG Avenue<br />
            Kigali, Rwanda
          </address>
        </div>
      </div>
    </div>
  );
};

export default Privacy;