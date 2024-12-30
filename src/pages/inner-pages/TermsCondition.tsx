import React, { useEffect } from 'react';
import Title from '../../components/helmet/Title';

const TermsCondition: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="container mx-auto my-10 lg:my-16 px-2">
      <Title
        title="Terms & Condition"
        content="This is terms & condition page."
      />
      <h2 className="text-center text-2xl lg:text-4xl font-semibold mb-6">
        Terms & Conditions
      </h2>
      <div className="space-y-6">
        <section>
          <h3 className="text-lg lg:text-2xl font-medium mb-2">
            1. Introduction
          </h3>
          <p>
            Welcome to our website. By accessing or using our services, you
            agree to comply with and be bound by the following terms and
            conditions. Please read them carefully.
          </p>
        </section>

        <section>
          <h3 className="text-lg lg:text-2xl font-medium mb-2">
            2. Intellectual Property Rights
          </h3>
          <p>
            All content on this website, including text, images, and trademarks,
            is the property of the company. Unauthorized use of this material is
            prohibited.
          </p>
        </section>

        <section>
          <h3 className="text-lg lg:text-2xl font-medium mb-2">
            3. User Responsibilities
          </h3>
          <p>
            As a user, you agree not to misuse our platform, violate any laws,
            or infringe on others' rights. Any violation may result in
            termination of your access.
          </p>
        </section>

        <section>
          <h3 className="text-lg lg:text-2xl font-medium mb-2">
            4. Limitation of Liability
          </h3>
          <p>
            We are not responsible for any direct, indirect, or consequential
            damages arising from the use of our services or website content.
          </p>
        </section>

        <section>
          <h3 className="text-lg lg:text-2xl font-medium mb-2">
            5. Changes to Terms
          </h3>
          <p>
            We reserve the right to modify these terms at any time. Changes will
            be effective immediately upon posting. Continued use of the site
            signifies acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h3 className="text-lg lg:text-2xl font-medium mb-2">
            6. Contact Us
          </h3>
          <p>
            If you have any questions or concerns about these terms, feel free
            to reach out to us at{' '}
            <a
              href="mailto:bazaarbridge@gmail.com"
              className="text-blue-500 underline"
            >
              bazaarbridge@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </section>
  );
};

export default TermsCondition;
