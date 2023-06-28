import React, {useState, useEffect} from 'react';
import {Modal, Button} from 'antd';

const TermsAndConditionsModal = ({termsModalVisible, setTermsModalVisible}) => {
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    useEffect(() => {
        const agreed = localStorage.getItem('agreedToTerms');
        if (agreed === 'true') {
            setAgreedToTerms(true);
        } else {
            setTermsModalVisible(true);
        }
    }, []);

    const handleAgree = () => {
        setTermsModalVisible(false);
        setAgreedToTerms(true);
        localStorage.setItem('agreedToTerms', 'true');
    };

    const handleDisagree = () => {
        localStorage.setItem('agreedToTerms', 'false');
        window.location.href = 'https://www.google.com'
    }

    return (
        <Modal
            title="Terms and Conditions"
            visible={termsModalVisible}
            onCancel={handleDisagree}
            footer={[
                <Button key="disagree" onClick={handleDisagree}>
                    Disagree
                </Button>,
                <Button key="agree" type="primary" onClick={handleAgree}>
                    Agree
                </Button>,
            ]}
            width={700}
        >
            {/* Add your terms and conditions content here */}
            <p>
                The purpose of this website is to assist users in visualizing Oracle Digital Assistant YAML-based skills
                in a directed graph format.
                In this visualization, each node of the tree represents a state, and the transitions between nodes are
                represented by associated transition actions.
                By using this website, users agree to abide by the following terms and conditions.
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>
                By accessing or using this website, you acknowledge and agree to be bound by the following terms and
                conditions.
                If you do not agree with these terms, please refrain from using the website.
                Your continued use of the website constitutes acceptance of these terms and conditions.
            </p>

            <h2>2. Intellectual Property Rights</h2>
            <p>
                All intellectual property rights related to the content on this website, including but not limited to
                copyrights,
                trademarks, and any other proprietary rights, are owned by Occamonics Ltd, the company behind this
                website.
                You acknowledge and agree that you shall not use, reproduce, modify, or distribute any of the website's
                content without obtaining explicit
                permission from Occamonics Ltd.
            </p>

            <h2>3. User Responsibilities and Conduct</h2>
            <p>
                3.1 Users are solely responsible for the content they upload or submit to the Occamonics website.
            </p>
            <p>
                3.2 Users are prohibited from uploading or sharing any content that is illegal, infringing, offensive,
                or violates the rights of others.
            </p>
            <p>
                3.3 Users must respect the privacy and rights of other individuals when using the Occamonics website.
            </p>

            <h2>4. Limitation of Liability</h2>
            <p>
                4.1 Occamonics and its affiliates shall not be liable for any damages, losses, or liabilities arising
                from the use or inability to use the Occamonics website.
            </p>
            <p>
                4.2 The Occamonics website is provided "as is" without any warranties of any kind, whether expressed or
                implied.
            </p>

            <h2>5. Modifications and Termination</h2>
            <p>
                5.1 Occamonics reserves the right to modify, suspend, or terminate the Occamonics website or any part
                thereof at any time without prior notice.
            </p>
            <p>
                5.2 Occamonics may update these terms and conditions from time to time, and it is the users'
                responsibility to review the terms periodically for any changes.
            </p>

        </Modal>
    );
};

export default TermsAndConditionsModal;
