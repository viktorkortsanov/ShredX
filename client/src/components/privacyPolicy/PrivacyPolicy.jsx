import './legaldoc.css';

export default function PrivacyPolicy() {
    return (
        <div className="legal-doc-container">
            <h2 className="legal-doc-title">Privacy Policy</h2>
            <p className="legal-doc-text">
                Your privacy is important to us. This privacy policy outlines how we collect, use, and protect your personal information.
            </p>
            
            <h3 className="legal-doc-subtitle">1. Information We Collect</h3>
            <p className="legal-doc-text">
                We collect personal data when you register on our platform, interact with our services, and participate in certain activities.
            </p>
            <ul className="legal-doc-list">
                <li>Personal identification information (e.g., name, email address)</li>
                <li>Usage data (e.g., IP address, browser type, device information)</li>
                <li>Location data (if enabled by you)</li>
            </ul>

            <h3 className="legal-doc-subtitle">2. How We Use Your Information</h3>
            <p className="legal-doc-text">
                We use the information we collect for the following purposes:
            </p>
            <ul className="legal-doc-list">
                <li>To provide and improve our services</li>
                <li>To communicate with you (e.g., customer support, updates)</li>
                <li>To personalize your experience on our platform</li>
            </ul>

            <h3 className="legal-doc-subtitle">3. Data Security</h3>
            <p className="legal-doc-text">
                We take your data security seriously and implement industry-standard measures to protect your personal information.
            </p>
            <ul className="legal-doc-list">
                <li>Encryption of sensitive data</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Regular security audits</li>
            </ul>

            <h3 className="legal-doc-subtitle">4. Your Rights</h3>
            <p className="legal-doc-text">
                You have the right to:
            </p>
            <ul className="legal-doc-list">
                <li>Request access to your personal data</li>
                <li>Request corrections to your data</li>
                <li>Delete your account and data</li>
            </ul>

            <h3 className="legal-doc-subtitle">5. Changes to This Policy</h3>
            <p className="legal-doc-text">
                We may update this privacy policy from time to time. Any changes will be posted on this page.
            </p>
        </div>
    );
}