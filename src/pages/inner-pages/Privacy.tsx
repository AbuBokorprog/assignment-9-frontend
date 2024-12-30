import React, { useEffect } from 'react';
import Title from '../../components/helmet/Title';

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="my-10 lg:my-16 container mx-auto px-2">
      <Title title="Privacy Policy" content="This is privacy policy page." />
      <h2 className="text-center text-xl lg:text-4xl font-medium mb-6">
        Privacy Policy
      </h2>
      <div className="text-gray-700 space-y-8">
        <p>
          At <strong>Your Company Name</strong>, we are committed to protecting
          your personal information and respecting your privacy. This Privacy
          Policy explains how we collect, use, and safeguard your data.
        </p>

        <h3 className="text-lg lg:text-2xl font-semibold">
          Information We Collect
        </h3>
        <ul className="list-disc list-inside">
          <li>
            **Personal Information**: Includes your name, email address, phone
            number, and payment details when you register, make a purchase, or
            contact us.
          </li>
          <li>
            **Usage Data**: Includes information about your interactions with
            our website, such as pages visited, time spent, and browser
            information.
          </li>
          <li>
            **Cookies and Tracking**: We use cookies and similar technologies to
            enhance your browsing experience and analyze website traffic.
          </li>
        </ul>

        <h3 className="text-lg lg:text-2xl font-semibold">
          How We Use Your Information
        </h3>
        <ul className="list-disc list-inside">
          <li>To process transactions and fulfill your orders.</li>
          <li>To personalize your experience on our website.</li>
          <li>To improve our website, products, and services.</li>
          <li>
            To send promotional emails, updates, and customer service
            communications.
          </li>
        </ul>

        <h3 className="text-lg lg:text-2xl font-semibold">
          Sharing Your Information
        </h3>
        <p>
          We do not sell or rent your personal information to third parties.
          However, we may share your data with:
        </p>
        <ul className="list-disc list-inside">
          <li>
            **Service Providers**: Third-party vendors who assist in operating
            our website, conducting business, or servicing you.
          </li>
          <li>
            **Legal Obligations**: If required by law, to comply with legal
            processes, or to protect our rights.
          </li>
        </ul>

        <h3 className="text-lg lg:text-2xl font-semibold">Your Rights</h3>
        <ul className="list-disc list-inside">
          <li>
            **Access and Update**: You can request access to your personal
            information and update it as needed.
          </li>
          <li>
            **Data Deletion**: You may request the deletion of your data,
            subject to applicable legal or contractual obligations.
          </li>
          <li>
            **Opt-Out**: You can opt out of receiving promotional emails by
            following the unsubscribe link in our emails.
          </li>
        </ul>

        <h3 className="text-lg lg:text-2xl font-semibold">Security</h3>
        <p>
          We implement a variety of security measures to maintain the safety of
          your personal information. However, no method of transmission over the
          Internet or electronic storage is 100% secure.
        </p>

        <h3 className="text-lg lg:text-2xl font-semibold">Third-Party Links</h3>
        <p>
          Our website may contain links to third-party websites. We are not
          responsible for the privacy practices or content of these sites. We
          encourage you to review their privacy policies before providing any
          personal information.
        </p>

        <h3 className="text-lg lg:text-2xl font-semibold">
          Changes to This Policy
        </h3>
        <p>
          We may update this Privacy Policy from time to time. Changes will be
          posted on this page, and we encourage you to review it periodically.
        </p>

        <h3 className="text-lg lg:text-2xl font-semibold">Contact Us</h3>
        <p>
          If you have any questions about this Privacy Policy or how your
          information is handled, please contact us at{' '}
          <a
            href="mailto:bazaarbridge@gmail.com"
            className="text-blue-500 underline"
          >
            bazaarbridge@gmail.com
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
