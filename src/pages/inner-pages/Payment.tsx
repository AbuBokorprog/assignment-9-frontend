import React, { useEffect } from 'react';
import Title from '../../components/helmet/Title';

const PaymentPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="my-10 lg:my-16 container mx-auto px-2">
      <Title title="Payment Policy" content="This is payment policy page." />
      <h2 className="text-center text-xl lg:text-4xl font-medium mb-6">
        Payment Policy
      </h2>
      <div className="text-gray-700 space-y-8">
        <p>
          At <strong>Your Company Name</strong>, we strive to make your payment
          process seamless and secure. This policy outlines the payment terms,
          methods, and related details for transactions made on our platform.
        </p>

        <h3 className="text-lg lg:text-2xl font-semibold">
          Accepted Payment Methods
        </h3>
        <ul className="list-disc list-inside">
          <li>
            **Credit/Debit Cards**: We accept major credit and debit cards
            including Visa, MasterCard, and American Express.
          </li>
          <li>
            **Digital Wallets**: Payments via PayPal, Apple Pay, or Google Pay.
          </li>
          <li>
            **Bank Transfers**: Available for larger transactions where
            applicable.
          </li>
        </ul>

        <h3 className="text-lg lg:text-2xl font-semibold">Payment Terms</h3>
        <ul className="list-disc list-inside">
          <li>
            **Immediate Payment**: All transactions must be completed at the
            time of purchase or booking.
          </li>
          <li>
            **Currency**: All payments are processed in{' '}
            <strong>[Insert Currency]</strong>.
          </li>
          <li>
            **Taxes**: Applicable taxes will be added to the total price where
            required by law.
          </li>
        </ul>

        <h3 className="text-lg lg:text-2xl font-semibold">Security</h3>
        <p>
          We use industry-standard encryption technologies to protect your
          payment information. Your details are processed securely and never
          stored beyond transaction requirements.
        </p>

        <h3 className="text-lg lg:text-2xl font-semibold">
          Refunds and Cancellations
        </h3>
        <p>
          Please refer to our{' '}
          <a href="/refund" className="text-blue-500 underline">
            Refund Policy
          </a>{' '}
          for detailed information on cancellations and refunds. Refunds may
          take 5-10 business days to process, depending on your payment method.
        </p>

        <h3 className="text-lg lg:text-2xl font-semibold">Payment Issues</h3>
        <p>
          If you experience any issues during the payment process, please
          contact our support team at{' '}
          <a
            href="mailto:support@example.com"
            className="text-blue-500 underline"
          >
            support@example.com
          </a>{' '}
          or call us at <strong>[Insert Contact Number]</strong>.
        </p>

        <h3 className="text-lg lg:text-2xl font-semibold">
          Changes to This Policy
        </h3>
        <p>
          We reserve the right to update this payment policy at any time. Any
          changes will be posted on this page with the revised effective date.
        </p>
      </div>
    </section>
  );
};

export default PaymentPolicy;
