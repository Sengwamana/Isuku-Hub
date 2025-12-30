import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Terms and Conditions</h1>
        <p className="text-slate-500 mb-12">Last updated: January 1, 2024</p>

        <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-headings:font-bold prose-p:text-slate-600 prose-a:text-brand-600">
          
          <h3>1. Agreement to Terms</h3>
          <p>
            These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and IsukuHub ("Company", "we", "us", or "our"), concerning your access to and use of the IsukuHub application and website.
          </p>

          <h3>2. User Representations</h3>
          <p>By using the Application, you represent and warrant that:</p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600 mb-6">
            <li>All registration information you submit will be true, accurate, current, and complete.</li>
            <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
            <li>You have the legal capacity and you agree to comply with these Terms of Use.</li>
            <li>You will not use the Application for any illegal or unauthorized purpose.</li>
          </ul>

          <h3>3. Fees and Payment</h3>
          <p>
            We accept the following forms of payment: Visa, Mastercard, MTN Mobile Money, Airtel Money. You may be required to purchase or pay a fee to access some of our services. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Application.
          </p>

          <h3>4. Prohibited Activities</h3>
          <p>You may not access or use the Application for any purpose other than that for which we make the Application available. The Application may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>

          <h3>5. Intellectual Property Rights</h3>
          <p>
            Unless otherwise indicated, the Application is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Application (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us.
          </p>

          <h3>6. Modifications and Interruptions</h3>
          <p>
            We reserve the right to change, modify, or remove the contents of the Application at any time or for any reason at our sole discretion without notice. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Application.
          </p>

          <h3>7. Governing Law</h3>
          <p>
            These Terms shall be governed by and defined following the laws of Rwanda. IsukuHub and yourself irrevocably consent that the courts of Rwanda shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
          </p>

           <h3>8. Contact Us</h3>
          <p>
            In order to resolve a complaint regarding the Application or to receive further information regarding use of the Application, please contact us at: support@isukuhub.rw
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;