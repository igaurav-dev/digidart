'use client';

import { useState } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';
import Card from './ui/Card';
import {
    validateBrandName,
    validateWebsite,
    validateEmail,
} from '../utils/validation';
import { submitBrand } from '../utils/api';
import { SubmitRequest } from '../types';
import styles from './BrandForm.module.css';
import { useRouter } from 'next/navigation';

export default function BrandForm() {
    const router = useRouter();
    const [formData, setFormData] = useState<SubmitRequest>({
        brandName: '',
        brandWebsite: '',
        email: '',
    });

    const [errors, setErrors] = useState<Record<string, string | null>>({
        brandName: null,
        brandWebsite: null,
        email: null,
    });

    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error for this field when user types
        setErrors(prev => ({ ...prev, [name]: null }));
        setSubmitError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate all fields
        const brandNameError = validateBrandName(formData.brandName);
        const websiteError = validateWebsite(formData.brandWebsite);
        const emailError = validateEmail(formData.email);

        if (brandNameError || websiteError || emailError) {
            setErrors({
                brandName: brandNameError,
                brandWebsite: websiteError,
                email: emailError,
            });
            return;
        }

        // Submit to API
        setLoading(true);
        setSubmitError(null);

        try {
            const response = await submitBrand(formData);
            // Redirect to results page
            router.push(`/results/${response.id}`);
        } catch (error) {
            setSubmitError(
                error instanceof Error ? error.message : 'Failed to submit form'
            );
            setLoading(false);
        }
    };

    return (
        <Card>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.title}>Analyze Your Brand Visibility</h2>
                <p className={styles.subtitle}>
                    Enter your brand details to receive comprehensive visibility insights
                </p>

                <Input
                    label="Brand Name"
                    name="brandName"
                    type="text"
                    placeholder="Enter your brand name"
                    value={formData.brandName}
                    onChange={handleChange}
                    error={errors.brandName}
                    required
                />

                <Input
                    label="Brand Website"
                    name="brandWebsite"
                    type="url"
                    placeholder="https://yourbrand.com"
                    value={formData.brandWebsite}
                    onChange={handleChange}
                    error={errors.brandWebsite}
                    required
                />

                <Input
                    label="Contact Email"
                    name="email"
                    type="email"
                    placeholder="contact@yourbrand.com"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                />

                {submitError && (
                    <div className={styles.submitError}>{submitError}</div>
                )}

                <Button type="submit" loading={loading} className={styles.submitButton}>
                    Analyze Brand
                </Button>
            </form>
        </Card>
    );
}
