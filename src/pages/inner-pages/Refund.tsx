import React, { useEffect } from 'react';
import Title from '../../components/helmet/Title';

const Refund: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="my-5 lg:my-10 container mx-auto px-5">
      <Title title="Refund Policy" content="This is refund policy page." />
      <h2 className="text-center text-xl lg:text-4xl font-medium mb-6">
        Refund Policy
      </h2>
      <div className="text-gray-700 space-y-8">
        <p>
          At <strong>Your Company Name</strong>, we value our customers and
          strive to ensure a positive shopping experience. Our refund policy is
          designed to address concerns and provide resolutions in a fair and
          transparent manner.
        </p>

        <h3 className="text-lg lg:text-2xl font-semibold">
          Eligibility for Refunds
        </h3>
        <ul className="list-disc list-inside">
          <li>
            The product must be unused and in the same condition that you
            received it.
          </li>
          <li>
            The request for a refund must be made within 30 days of the purchase
            date.
          </li>
          <li>
            Proof of purchase (receipt or order confirmation) is required to
            process the refund.
          </li>
        </ul>

        <h3 className="text-lg lg:text-2xl font-semibold">
          Non-Refundable Items
        </h3>
        <p>
          Certain items are not eligible for refunds, including but not limited
          to:
        </p>
        <ul className="list-disc list-inside">
          <li>Gift cards</li>
          <li>Downloadable software or digital products</li>
          <li>Perishable goods such as food, flowers, or magazines</li>
        </ul>

        <h3 className="text-lg lg:text-2xl font-semibold">
          How to Request a Refund
        </h3>
        <p>To initiate a refund request, please follow these steps:</p>
        <ol className="list-decimal list-inside">
          <li>
            Contact our support team at{' '}
            <a
              href="mailto:support@example.com"
              className="text-blue-500 underline"
            >
              support@example.com
            </a>
            .
          </li>
          <li>
            Provide details about your order, including the order number and
            reason for the refund.
          </li>
          <li>
            If applicable, ship the item to the provided return address. Ensure
            it is securely packaged to avoid damage during transit.
          </li>
        </ol>

        <h3 className="text-lg lg:text-2xl font-semibold">
          Processing Refunds
        </h3>
        <p>
          Once we receive and inspect the returned item, we will notify you of
          the approval or rejection of your refund. Approved refunds will be
          processed within 5–10 business days. The refund will be applied to
          your original payment method.
        </p>

        <h3 className="text-lg lg:text-2xl font-semibold">
          Late or Missing Refunds
        </h3>
        <p>
          If you haven’t received your refund after the stated processing time:
        </p>
        <ul className="list-disc list-inside">
          <li>Check your bank account or credit card statement.</li>
          <li>
            Contact your bank or payment provider, as processing times may vary.
          </li>
          <li>
            If you still have not received your refund, contact us at{' '}
            <a
              href="mailto:support@example.com"
              className="text-blue-500 underline"
            >
              support@example.com
            </a>
            .
          </li>
        </ul>

        <h3 className="text-lg lg:text-2xl font-semibold">Contact Us</h3>
        <p>
          If you have any questions regarding our refund policy, please do not
          hesitate to contact us at{' '}
          <a
            href="mailto:support@example.com"
            className="text-blue-500 underline"
          >
            support@example.com
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default Refund;
